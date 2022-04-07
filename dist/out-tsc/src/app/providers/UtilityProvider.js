import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { environment } from './../../environments/environment';
var UtilityProvider = /** @class */ (function () {
    function UtilityProvider(alertCtrl, api) {
        this.alertCtrl = alertCtrl;
        this.api = api;
        this.id_especie = window.localStorage['id_especie'];
        this.url = environment.SERVER_URL;
    }
    UtilityProvider.prototype.GetCombo = function () {
        var url = this.url + "phonecodes/es";
        var params = 'es';
        return this.api.get(url);
    };
    UtilityProvider.prototype.GetEspecie = function () {
        var url = this.url + "specie/es";
        var params = 'es';
        return this.api.get(url);
    };
    UtilityProvider.prototype.GetRaza = function (id) {
        var url = this.url + "razas/" + id;
        var params = { lang: "es", idE: 0 };
        return this.api.get(url);
    };
    UtilityProvider.prototype.GetGender = function () {
        var url = this.url + "petgender/es";
        var params = 'es';
        return this.api.get(url);
    };
    UtilityProvider.prototype.GetSituacion = function () {
        var url = this.url + "petstates/es";
        var params = 'es';
        return this.api.get(url);
    };
    UtilityProvider.prototype.LlenarCombo = function (Data) {
        var combo = [];
        JSON.parse(Data).forEach(function (element) {
            //console.log(element);
            combo.push({
                Id: element.Id,
                Texto: element.Nombre
            });
        });
        return combo;
    };
    UtilityProvider.prototype.LlenarArreglo = function (Data) {
        var combo;
        JSON.parse(Data).forEach(function (element) {
            combo.push({
                Id: element.Id,
                Texto: element.Texto
            });
        });
        return combo;
    };
    /* AlertpopUp(title: string, msg: string){
       const alert: Alert = this.alertCtrl.create({
         title: title,
         message: msg,
         buttons:  ['Ok']
       });
       alert.present();
     }*/
    UtilityProvider.prototype.ObtenerEncabezados = function (data) {
        var json = data.length > 0 ? data[0] : [];
        var array = [];
        for (var key in json) {
            array.push(key);
        }
        return array;
    };
    UtilityProvider.prototype.ValidaString = function (value) {
        if (value && value.trim().length > 0) {
            return true;
        }
        else {
            return false;
        }
    };
    UtilityProvider.prototype.ValidaNumero = function (value) {
        if (value && !isNaN(value)) {
            return true;
        }
        else {
            return false;
        }
    };
    UtilityProvider.prototype.ValidaCorreo = function (value) {
        if (this.ValidaString(value)) {
            var regex1 = /^[a-zA-Z0-9@\*._-]*$/;
            var regex3 = /^[a-zA-Z]*$/;
            if (regex1.test(value)) {
                var pos = value.indexOf("@");
                if (pos > 0) {
                    var value2 = value.substring(pos + 1, value.length);
                    var pos2 = value2.indexOf(".");
                    if (pos2 > 0) {
                        var dominio = value.substring((pos + pos2) + 2, value.length);
                        return dominio.length > 0 && regex3.test(dominio);
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    UtilityProvider.prototype.CampoAlfaNumerico = function (elm) {
        var regex = /^[a-zA-Z0-9 ]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoNumerico = function (elm) {
        var regex = /^[0-9]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoAlfaNumericoCont = function (elm) {
        var regex = /^[a-zA-Z0-9]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoLetras = function (elm) {
        var regex = /^[a-zA-Z ]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoUsuario = function (elm) {
        var regex = /^[a-zA-Z0-9\*._-]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoPassword = function (elm) {
        var regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoCorreo = function (elm) {
        var regex = /^[a-zA-Z0-9@\*._-]*$/;
        var value = elm.value;
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.FormatoDecimal = function (num, dec) {
        if (dec == "," && num.toString().indexOf(",") >= 0) {
            num = num.toString().replace(/\./g, "");
            num = num.toString().replace(",", ".");
        }
        var res = parseFloat(num).toFixed(2);
        return res;
    };
    UtilityProvider.prototype.FormatoNumerico = function (num, dec) {
        num = this.FormatoDecimal(num, dec);
        if (dec == ",") {
            var res = num.toString().replace('.', ',');
            num = res.replace(/\d(?=(\d{3})+\,)/g, '$&\.');
        }
        else {
            num = num.replace(/\d(?=(\d{3})+\.)/g, '$&\,');
        }
        return num;
    };
    UtilityProvider.prototype.CampoDecimal = function (elm, dec) {
        console.log(elm);
        var regex = /^[0-9.]*$/;
        var value = elm.value.trim();
        var array = value.split(".");
        if (!regex.test(value)) {
            value = value.substring(0, value.length - 1);
        }
        else if (value.trim().length == 0) {
            elm.value = value;
        }
        else if (value.indexOf(".") == 0) {
            value = value.substring(0, value.length - 1);
        }
        else if (array.length > 2) {
            value = value.substring(0, value.length - 1);
        }
        elm.value = value;
    };
    UtilityProvider.prototype.CampoTelefono = function (elm) {
        console.log(elm);
        var regex = /^[0-9]*$/;
        var value = elm.target.value.trim();
        var last = elm.data;
        if (value.length < 4 && last != null && last.trim().length > 0) {
            value = regex.test(value) ? value : value.substring(0, value.length - 1);
        }
        else if (value.length == 4 && last != null && last.trim().length > 0) {
            value = value.indexOf("-") >= 0 ? value : value.substring(0, 3) + "-" + last;
        }
        else if (value.length > 4 && last != null && last.trim().length > 0) {
            var value2 = value.substring(4, value.length);
            value = regex.test(value2) ? value : value.substring(0, value.length - 1);
        }
        elm.target.value = value;
    };
    UtilityProvider.prototype.extractData = function (res) {
        //convert the response to JSON format
        var body = res.json();
        console.log(body);
        //Return the data (or nothing);
        return body || {};
    };
    UtilityProvider = __decorate([
        Injectable({ providedIn: 'root' }),
        __metadata("design:paramtypes", [AlertController,
            HttpClient])
    ], UtilityProvider);
    return UtilityProvider;
}());
export { UtilityProvider };
//# sourceMappingURL=UtilityProvider.js.map