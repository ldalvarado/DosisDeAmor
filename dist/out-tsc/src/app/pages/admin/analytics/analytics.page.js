import { __decorate, __metadata } from "tslib";
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { Platform } from '@ionic/angular';
import { ApiService } from '../../../providers/providers';
import { Chart } from 'chart.js';
var AnalyticsPage = /** @class */ (function () {
    function AnalyticsPage(platform, translate, api) {
        this.platform = platform;
        this.translate = translate;
        this.api = api;
        this.interval = 'lastMonth';
        this.analytics = {
            users_number: 0,
            gender: {
                male_number: 0,
                female_number: 0,
            },
            support_number: 0,
            ages: {
                children: 0,
                teens: 0,
                young_adults: 0,
                unknown: 0
            },
            grant_types: {
                password: 0,
                facebook: 0,
                google: 0,
            }
        };
    }
    AnalyticsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.generateDoughnutCharts();
            _this.generateLineCharts();
        });
    };
    /**
     * Establece la estructura de las graficas de dona.
     */
    AnalyticsPage.prototype.generateDoughnutCharts = function () {
        Chart.pluginService.register({
            beforeDraw: function (chart) {
                if (chart.config.options.elements.center) {
                    // Obtiene la cadena de ctx
                    var ctx = chart.chart.ctx;
                    // Obtiene ctx de la cadena
                    // Obtiene opciones del objeto central en las opciones
                    var centerConfig = chart.config.options.elements.center;
                    var fontStyle = centerConfig.fontStyle || 'Arial';
                    var txt = centerConfig.text || '';
                    var color = centerConfig.color || '#000';
                    var sidePadding = centerConfig.sidePadding || 20;
                    var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2);
                    // Comience con una fuente base de 30px.
                    ctx.font = (centerConfig.fontSize || 30) + "px " + fontStyle;
                    // Obtiene el ancho de la cadena y también el ancho del elemento menos 10 para darle un relleno lateral de 5 píxeles.
                    var stringWidth = ctx.measureText(txt).width;
                    var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
                    // Averigua cuánto puede aumentar la anchura de la fuente.
                    var widthRatio = elementWidth / stringWidth;
                    var newFontSize = Math.floor(30 * widthRatio);
                    var elementHeight = (chart.innerRadius * 2);
                    // Elije un nuevo tamaño de fuente para que no sea más grande que el alto de la etiqueta.
                    var fontSizeToUse = Math.min(newFontSize, elementHeight);
                    // Configure la fuente para dibujarla correctamente.
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                    var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                    if (fontSizeToUse < centerConfig.fontSize) {
                        ctx.font = fontSizeToUse + "px " + fontStyle;
                    }
                    ctx.fillStyle = color;
                    // Dibuja el texto en el centro
                    ctx.fillText(txt, centerX, centerY);
                    if (centerConfig.textTitle) {
                        // Establece la configuración para un encabezado en la grafica.
                        // Obtiene opciones del objeto central en opciones
                        var centerConfigTitle = chart.config.options.elements.center;
                        var fontStyleTitle = centerConfigTitle.fontStyleTitle || 'Arial';
                        var txtTitle = centerConfigTitle.textTitle || '';
                        var colorTitle = centerConfigTitle.colorTitle || '#000';
                        var sidePaddingTitle = centerConfigTitle.sidePaddingTitle || 20;
                        // Comiensa con una fuente base de 30 px
                        ctx.font = (centerConfigTitle.fontSizeTitle || 30) + "px " + fontStyleTitle;
                        var currentHeight = centerConfig.fontSize || 30;
                        if (fontSizeToUse < centerConfig.fontSize) {
                            currentHeight = fontSizeToUse;
                        }
                        var newFontSizeTitle = (sidePaddingTitle / 100) * (Math.sqrt(Math.pow(chart.innerRadius, 2) - Math.pow(currentHeight, 2)) * 2);
                        var elementHeightTitle = (chart.innerRadius * 2);
                        // Elije un nuevo tamaño de fuente para que no sea más grande que el alto de la etiqueta.
                        var fontSizeToUseTitle = Math.min(newFontSizeTitle, elementHeightTitle);
                        // Configura la fuente para dibujarla correctamente.
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        var centerXTitle = ((chart.chartArea.left + chart.chartArea.right) / 2);
                        var centerYTitleExtra = centerConfig.fontSize || 30;
                        if (fontSizeToUse < centerConfig.fontSize) {
                            centerYTitleExtra = fontSizeToUse;
                        }
                        var centerYTitle = (((chart.chartArea.top + chart.chartArea.bottom) / 2) - centerYTitleExtra);
                        if (fontSizeToUseTitle < centerConfig.fontSizeTitle) {
                            ctx.font = fontSizeToUseTitle + "px " + fontStyleTitle;
                        }
                        ctx.fillStyle = colorTitle;
                        // Dibuja texto en el centro
                        ctx.fillText(txtTitle, centerXTitle, centerYTitle);
                    }
                }
            }
        });
        var ctxs = this.doughnutUsersChart.nativeElement;
        this.doughnutUsersChartConfig = new Chart(ctxs, {
            type: 'doughnut',
            data: {
                datasets: [],
            },
            labels: [
                this.translate.instant('MALES'),
                this.translate.instant('FEMALES'),
                this.translate.instant('UNKNOWNS'),
                this.translate.instant('CHILDREN'),
                this.translate.instant('TEENS'),
                this.translate.instant('YOUNG_ADULTS'),
                this.translate.instant('ADULTS'),
                this.translate.instant('UNKNOWNS'),
                'App', 'Facebook', 'Google'
            ],
            options: {
                cutoutPercentage: 85,
                legend: {
                    display: false
                },
                elements: {
                    center: {
                        text: '0',
                        color: '#263238',
                        fontStyle: 'Eczar',
                        textTitle: this.translate.instant('USERS'),
                        fontSizeTitle: 15,
                        colorTitle: '#263238',
                        fontStyleTitle: 'Roboto Condensed',
                        sidePaddingTitle: 15
                    }
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].labels[tooltipItem.index];
                            var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                            return label + ": " + value;
                        }
                    }
                }
            }
        });
        this.getDoughnutData();
    };
    /**
     * Recupera la información básica del servidor para las graficas de dona.
     */
    AnalyticsPage.prototype.getDoughnutData = function () {
        var _this = this;
        return new Promise(function (result) {
            _this.api.get('/analytics').then(function (analytics) {
                _this.analytics = analytics;
                _this.doughnutUsersChartConfig.options.elements.center.text = analytics.users_number;
                _this.doughnutUsersChartConfig.data.datasets = [{
                        labels: [
                            _this.translate.instant('MALES'),
                            _this.translate.instant('FEMALES'),
                            _this.translate.instant('UNKNOWNS'),
                        ],
                        data: [analytics.gender.male_number, analytics.gender.female_number,
                            ((analytics.users_number) - analytics.gender.male_number - analytics.gender.female_number)
                        ],
                        backgroundColor: ['#045d56', '#1eb980', '#37efba'],
                        borderColor: ['#3f3f49', '#3f3f49', '#3f3f49'],
                        borderWidth: [1, 1, 1]
                    },
                    {
                        labels: [
                            _this.translate.instant('CHILDREN'),
                            _this.translate.instant('TEENS'),
                            _this.translate.instant('YOUNG_ADULTS'),
                            _this.translate.instant('ADULTS'),
                            _this.translate.instant('UNKNOWNS')
                        ],
                        data: [analytics.ages.children, analytics.ages.teens, analytics.ages.young_adults,
                            analytics.users_number - (analytics.ages.children + analytics.ages.teens + analytics.ages.young_adults + analytics.ages.unknown),
                            analytics.ages.unknown
                        ],
                        backgroundColor: ['#ff6859', '#ff857c', '#ffdc78', '#ffac12', '#ffd7d0'],
                        borderColor: ['#3f3f49', '#3f3f49', '#3f3f49', '#3f3f49', '#3f3f49'],
                        borderWidth: [1, 1, 1, 1, 1]
                    },
                    {
                        labels: [
                            'Password', 'Facebook', 'Google'
                        ],
                        data: [analytics.grant_types.password, analytics.grant_types.facebook, analytics.grant_types.google],
                        backgroundColor: ['#f1c40f', '#3b5998', '#dc4a38'],
                        borderColor: ['#3f3f49', '#3f3f49', '#3f3f49'],
                        borderWidth: [1, 1, 1]
                    }];
                _this.doughnutUsersChartConfig.update();
                result(true);
            }, function (fail) {
                console.log('[analytics-32]', fail);
                result(false);
            });
        });
    };
    /**
     * Establece las gráficas de líneas.
     */
    AnalyticsPage.prototype.generateLineCharts = function () {
        var ctx = this.lineUsersChart.nativeElement;
        this.lineUsersChartConfig = new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                        label: this.translate.instant('USERS'),
                        borderColor: '#fa8072',
                        // backgroundColor: '#fb8d80',
                        data: [],
                    }],
                labels: [],
            },
            options: {
                scales: {
                    yAxes: [{
                            ticks: {
                                fontColor: '#f4f4f4',
                                fontSize: 14,
                                stepSize: true,
                            }
                        }],
                    xAxes: [{
                            ticks: {
                                fontColor: '#f4f4f4',
                                fontSize: 14
                            }
                        }]
                }
            }
        });
        this.getLineData();
    };
    /**
     * Recupera la información básica del servidor para las graficas de lineas.
     */
    AnalyticsPage.prototype.getLineData = function () {
        var _this = this;
        return new Promise(function (result) {
            _this.api.get("/analytics/users/registration?interval=" + _this.interval).then(function (response) {
                _this.lineUsersChartConfig.data.labels = [];
                _this.lineUsersChartConfig.data.datasets[0].data = [];
                response.forEach(function (dates) {
                    _this.lineUsersChartConfig.data.labels.push(dates.created_at);
                    _this.lineUsersChartConfig.data.datasets[0].data.push(dates.users);
                    _this.lineUsersChartConfig.update();
                });
                result(true);
            }, function (fail) {
                console.log('[analytics-248]', fail);
                result(false);
            });
        });
    };
    /**
     * Refresca la página.
     * @param event
     */
    AnalyticsPage.prototype.doRefresh = function (event) {
        var _this = this;
        this.getDoughnutData().then(function () {
            _this.getLineData().then(function () {
                event.target.complete();
            });
        });
    };
    __decorate([
        ViewChild('doughnutUsersChart', { static: false }),
        __metadata("design:type", ElementRef)
    ], AnalyticsPage.prototype, "doughnutUsersChart", void 0);
    __decorate([
        ViewChild('lineUsersChart', { static: false }),
        __metadata("design:type", ElementRef)
    ], AnalyticsPage.prototype, "lineUsersChart", void 0);
    AnalyticsPage = __decorate([
        Component({
            selector: 'app-analytics',
            templateUrl: 'analytics.page.html',
            styleUrls: ['analytics.page.scss']
        }),
        __metadata("design:paramtypes", [Platform,
            TranslateService,
            ApiService])
    ], AnalyticsPage);
    return AnalyticsPage;
}());
export { AnalyticsPage };
//# sourceMappingURL=analytics.page.js.map