import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { ApiService } from './../api/api.service';
import { TranslateService } from '@ngx-translate/core';
/**
 * Modulo para subir imágenes al servidor.
 */
var TransferImgFileService = /** @class */ (function () {
    function TransferImgFileService(platform, camera, file, filePath, actionSheetCtrl, translate, api) {
        this.platform = platform;
        this.camera = camera;
        this.file = file;
        this.filePath = filePath;
        this.actionSheetCtrl = actionSheetCtrl;
        this.translate = translate;
        this.api = api;
    }
    /**
     * Obtiene la imagen de cualquier fuente según la plataforma.
     * @param {string} img Opcional en caso de estar utilizando un input file.
     * @return {Promise<string>} Regresa la dirección de la imagen correspondiente
     * según el dispositivo.
     */
    TransferImgFileService.prototype.getImg = function (img) {
        var _this = this;
        return new Promise(function (imgUrl, reject) {
            if (_this.platform.is('android') || _this.platform.is('ios')) {
                _this.mobileSelectPicture().then(function (imgUri) {
                    imgUrl(imgUri);
                }, function (fail) {
                    console.log('[transfer-img-file-41]', JSON.stringify(fail));
                    reject(fail);
                });
            }
            else {
                _this.getBased64Image(img).then(function (base64_img) {
                    imgUrl(base64_img);
                }, function (fail) {
                    console.log('[transfer-img-file-48]', JSON.stringify(fail));
                    reject(fail);
                });
            }
        });
    };
    TransferImgFileService.prototype.getMultipleBase64Imgs = function (files) {
        var _this = this;
        return new Observable(function (result) {
            var re = /\.png$|.jpg$|.jpeg$|.gif$/i;
            if (files.items) {
                var _loop_1 = function (i) {
                    if (files.items[i].kind === 'file') {
                        var file_1 = files.items[i].getAsFile();
                        if (re.test(file_1.name)) {
                            _this.getBase64(file_1).then(function (imgBase64) {
                                result.next({ url: imgBase64, alt: file_1.name });
                            }).catch(function (error) {
                                console.log('[transfer-img-file-66]', error);
                            });
                        }
                    }
                };
                for (var i = 0; i < files.items.length; i++) {
                    _loop_1(i);
                }
            }
            else {
                var _loop_2 = function (i) {
                    if (re.test(files[i].name)) {
                        _this.getBase64(files[i]).then(function (imgBase64) {
                            result.next({ url: imgBase64, alt: files[i].name });
                        }).catch(function (error) {
                            console.log('[transfer-img-file-77]', error);
                        });
                    }
                };
                for (var i = 0; i < files.length; i++) {
                    _loop_2(i);
                }
            }
        });
    };
    TransferImgFileService.prototype.getBase64 = function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    /**
     * Proporciona al usuario la opción para subir una imagen que visualizara en su cuenta
     * y almacenara en el servidor.
     * @return {Promise<string>}
     */
    TransferImgFileService.prototype.mobileSelectPicture = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetCtrl.create({
                            header: this.translate.instant('IMG.SHEET.TITLE'),
                            buttons: [
                                {
                                    text: this.translate.instant('IMG.SHEET.USE_LIBRARY'),
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.PHOTOLIBRARY).then(function (success) {
                                            resolve(success);
                                        }, function (fail) {
                                            reject(fail);
                                        });
                                    }
                                },
                                {
                                    text: this.translate.instant('IMG.SHEET.USE_CAMERA'),
                                    handler: function () {
                                        _this.takePicture(_this.camera.PictureSourceType.CAMERA).then(function (success) {
                                            resolve(success);
                                        }, function (fail) {
                                            reject(fail);
                                        });
                                    }
                                },
                                {
                                    text: this.translate.instant('CANCEL'),
                                    role: 'cancel'
                                }
                            ]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    /**
     * Proporciona al usuario la interfaz para seleccionar o capturar una imagen y subirla al servidor.
     * @param sourceType Define de donde se extraerá la imagen.
     * @return {Promise<string>}
     */
    TransferImgFileService.prototype.takePicture = function (sourceType) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // Crear las opciones para la pantalla de la cámara
            var options = {
                quality: 80,
                sourceType: sourceType,
                saveToPhotoAlbum: false,
                correctOrientation: false
            };
            // Obtener los datos de la imagen
            _this.camera.getPicture(options).then(function (imagePath) {
                var correctPath;
                var currentName;
                // Manejo especial para la biblioteca de Android
                if (_this.platform.is('android') && sourceType === _this.camera.PictureSourceType.PHOTOLIBRARY) {
                    // filePath solo funciona en android
                    _this.filePath.resolveNativePath(imagePath).then(function (filePath) {
                        correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        currentName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
                        _this.file.readAsDataURL(correctPath, currentName).then(function (imageBase64) {
                            resolve(imageBase64);
                        });
                    });
                }
                else {
                    currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                    correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    _this.file.readAsDataURL(correctPath, currentName).then(function (imageBase64) {
                        resolve(imageBase64);
                    });
                }
            }, function (error) {
                console.log('[transfer-img-file-171]', JSON.stringify(error));
                reject(_this.translate.instant('ERRORS.CAMERA_ERROR'));
            });
        });
    };
    /**
     * Genera una cadena aleatoria.
     * @param {number} length Numero de caracteres que se desean.
     * @return {string} Cadena aleatoria.
     */
    TransferImgFileService.prototype.makeRandomString = function (length) {
        var text = '';
        var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    /**
     * Si se agregó una imagen la sube.
     * @param {string} serverUrl
     * @param {string} imgUrl
     * @param {FileImgTransferOptions} options
     */
    TransferImgFileService.prototype.uploadImg = function (serverUrl, imgUrl, options) {
        var _this = this;
        return new Promise(function (response) {
            _this.uploadBased64Image(serverUrl, imgUrl, options).then(function (resolve) {
                response(resolve);
            }, function (fail) {
                response(fail);
            });
        });
    };
    /**
     * Obtiene la extensión del archivo.
     * @param {string} base64Data
     * @return Regresa la extensión del archivo.
     */
    TransferImgFileService.prototype.getFileExtension = function (filename) {
        return filename.split('.').pop();
    };
    /**
     * Método para cargar imágenes en formato base64 desde un input file de un navegador.
     * @param event
     * @return {Promise<string>}
     */
    TransferImgFileService.prototype.getBased64Image = function (event) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var file = event.srcElement.files[0];
            if (!(/\.(jpg|jpeg|png|gif)$/i).test(file.name)) {
                reject(_this.translate.instant('ERRORS.FILE_NO_IMAGE'));
            }
            else {
                if (file.size > 4194304) {
                    reject(_this.translate.instant('ERRORS.FILE_MAX_4MG'));
                }
                else {
                    var reader_1 = new FileReader();
                    reader_1.readAsDataURL(file);
                    reader_1.onload = function () {
                        resolve(reader_1.result);
                    };
                }
            }
        });
    };
    /**
     * Envía un put con la información de una imagen codificada en base64 al servidor.
     * @param {string} serverUrl
     * @param {string} base64Img
     * @param {string} fileName
     * @return {Promise<string>}
     */
    TransferImgFileService.prototype.uploadBased64Image = function (serverUrl, base64Img, options) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileName = '';
            var params = null;
            if (!options || !options.fileName) {
                var date = new Date().getTime();
                fileName = _this.makeRandomString(20) + "_" + date + "." + _this.getFileExtensionBase64(base64Img);
            }
            else {
                fileName = options.fileName;
            }
            if (options && options.params) {
                params = options.params;
            }
            var query = {
                name_64: fileName,
                imagen_64: base64Img,
                type: 'base64',
                params: params
            };
            try {
                _this.api.post(serverUrl, query).then(function (response) {
                    resolve(response);
                }, function (fail) {
                    console.log('[transfer-img-file-269]', JSON.stringify(fail));
                    reject(fail);
                });
            }
            catch (error) {
                console.log('[transfer-img-file-273]', JSON.stringify(error));
                reject(error);
            }
        });
    };
    /**
     * Obtiene la extensión del archivo para archivos con codificación base64.
     * @param {string} base64Data
     * @return Regresa la extensión del archivo.
     */
    TransferImgFileService.prototype.getFileExtensionBase64 = function (base64Data) {
        return base64Data.split(';')[0].split('/')[1];
    };
    TransferImgFileService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Platform,
            Camera,
            File,
            FilePath,
            ActionSheetController,
            TranslateService,
            ApiService])
    ], TransferImgFileService);
    return TransferImgFileService;
}());
export { TransferImgFileService };
//# sourceMappingURL=transfer-img-file.service.js.map