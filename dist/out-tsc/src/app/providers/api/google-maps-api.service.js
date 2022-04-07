import { __decorate, __metadata } from "tslib";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapStyle } from '../models/map-style';
import { environment } from './../../../environments/environment';
var GoogleMapsApiService = /** @class */ (function () {
    function GoogleMapsApiService(http) {
        this.http = http;
    }
    /**
     * Establece los parámetros del mapa.
     * @param {GoogleSetMap} options
     */
    GoogleMapsApiService.prototype.setMap = function (options) {
        return new Promise(function (newMap) {
            if (typeof google !== 'undefined') {
                var styledMapType = new google.maps.StyledMapType(MapStyle);
                options.map = new google.maps.Map(options.mapElement, {
                    center: options.latLng,
                    zoom: 14,
                    mapTypeControlOptions: {
                        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                            'styled_map']
                    },
                    backgroundColor: '#fafafa',
                    fullscreenControl: false,
                    mapTypeControl: false
                });
                options.map.mapTypes.set('styled_map', styledMapType);
                options.map.setMapTypeId('styled_map');
                google.maps.event.addListenerOnce(options.map, 'idle', function () {
                    options.mapElement.classList.add('show-map');
                });
                newMap(options.map);
            }
        });
    };
    /**
     * Agrega un circulo al mapa.
     * @param {GoogleMapsCircle} options
     */
    GoogleMapsApiService.prototype.addCircle = function (options) {
        return new google.maps.Circle({
            strokeColor: options.strokeColor || '#FF0000',
            strokeOpacity: options.strokeOpacity || 0.8,
            strokeWeight: options.strokeWeight || 2,
            fillColor: options.fillColor || '#FF0000',
            fillOpacity: options.fillOpacity || 0.35,
            radius: options.radius || 1,
            map: options.map,
            center: options.center
        });
    };
    /**
     * Agrega un evento a un mapa.
     * @param localMap
     * @param event
     * @param callback
     */
    GoogleMapsApiService.prototype.addListenerOnce = function (localMap, event, callback) {
        google.maps.event.addListenerOnce(localMap, event, callback);
    };
    /**
     * Agrega un evento a un marcador.
     * @param marker
     * @param event
     * @param callback
     */
    GoogleMapsApiService.prototype.markerAddListener = function (marker, event, callback) {
        marker.addListener(event, callback);
    };
    /**
     * Establece el marcador en el mapa.
     * @param {GoogleSetMarker} options
     */
    GoogleMapsApiService.prototype.setMarker = function (options) {
        return new Promise(function (newMarker) {
            var infoWindow = new google.maps.InfoWindow({
                content: options.content
            });
            var marker = new google.maps.Marker({
                position: options.latLng,
                map: options.map,
                title: options.title,
                draggable: (typeof options.draggable !== 'undefined') ? options.draggable : true
            });
            marker.addListener('click', function () {
                infoWindow.open(options.map, marker);
            });
            newMarker({ marker: marker, infoWindow: infoWindow });
        });
    };
    /**
     * Establece el marcador de la dirección escrita en los campos anteriores.
     * @param direction
     */
    GoogleMapsApiService.prototype.getCoords = function (direction) {
        var _this = this;
        return new Promise(function (coords) {
            var serach = (direction.street_number + " " + direction.route + ", " + direction.administrative_area_level_1 + ", " + direction.administrative_area_level_2 + ", " + direction.country).trim().replace(' ', '+');
            _this.http.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + serach + "&key=" + environment.GOOGLE_MAPS_API_KEY)
                .subscribe(function (response) {
                if (typeof google !== 'undefined') {
                    if (response.results.length > 0) {
                        coords(response.results[0].geometry.location);
                    }
                    else {
                        coords({});
                    }
                }
            });
        });
    };
    /**
     * Consulta la información de la ubicación selecionada, en español y la agrega a su campo
     * correspondiente en el formulario.
     */
    GoogleMapsApiService.prototype.getDirectionData = function (latLng) {
        var _this = this;
        return new Promise(function (result, error) {
            _this.http.post("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng.lat() + "," + latLng.lng() + "&key=" + environment.GOOGLE_MAPS_API_KEY, '')
                .subscribe(function (data) {
                if (data.status == 'OK') {
                    result(data['results'][0]['address_components']);
                }
                else {
                    error('Esta haciendo clic en el mar');
                }
            }, function (fail) {
                error(fail);
            });
        });
    };
    GoogleMapsApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], GoogleMapsApiService);
    return GoogleMapsApiService;
}());
export { GoogleMapsApiService };
//# sourceMappingURL=google-maps-api.service.js.map