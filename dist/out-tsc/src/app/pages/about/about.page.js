import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MapStyle } from '../../providers/providers';
var AboutPage = /** @class */ (function () {
    function AboutPage() {
        this.ubications = [
            {
                name: 'Dosis de amor',
                direction: {
                    route: 'Temixco',
                    street_number: '35',
                    postal_code: 3001,
                    administrative_area_level_1: 'Mexíco',
                    administrative_area_level_2: 'Mexíco',
                    country: 'Mexíco',
                },
                latLng: { lat: 18.85, lng: -99.2333 }
            }
        ];
    }
    AboutPage.prototype.ngAfterViewInit = function () {
        if (typeof google !== 'undefined') {
            this.setMapa();
        }
    };
    /**
     * Establece los parámetros del mapa.
     */
    AboutPage.prototype.setMapa = function () {
        var _this = this;
        var mapEle = this.mapElement.nativeElement;
        var styledMapType = new google.maps.StyledMapType(MapStyle);
        this.map = new google.maps.Map(mapEle, {
            center: this.ubications[0].latLng,
            zoom: 14,
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                    'styled_map']
            },
            backgroundColor: '#fafafa',
            fullscreenControl: false,
            mapTypeControl: false
        });
        this.map.mapTypes.set('styled_map', styledMapType);
        this.map.setMapTypeId('styled_map');
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            mapEle.classList.add('show-map');
        });
        this.ubications.forEach(function (ubication) {
            var infoWindow = new google.maps.InfoWindow({
                content: "<div style=\"color: #27272f;\">\n        <h6>" + ubication.name + "</h6>\n        <p>" + ubication.direction.route + " " + ubication.direction.street_number + "</p>\n        <p>" + ubication.direction.postal_code + " " + ubication.direction.administrative_area_level_1 + ", " + ubication.direction.administrative_area_level_2 + "</p>\n        <p>" + ubication.direction.country + "</p></div>"
            });
            var marker = new google.maps.Marker({
                position: ubication.latLng,
                map: _this.map,
                title: ubication.name,
                draggable: false
            });
            marker.addListener('click', function () {
                infoWindow.open(_this.map, marker);
            });
        });
    };
    __decorate([
        ViewChild('mapCanvas', { static: false }),
        __metadata("design:type", ElementRef)
    ], AboutPage.prototype, "mapElement", void 0);
    AboutPage = __decorate([
        Component({
            selector: 'app-about',
            templateUrl: 'about.page.html',
            styleUrls: ['about.page.scss']
        }),
        __metadata("design:paramtypes", [])
    ], AboutPage);
    return AboutPage;
}());
export { AboutPage };
//# sourceMappingURL=about.page.js.map