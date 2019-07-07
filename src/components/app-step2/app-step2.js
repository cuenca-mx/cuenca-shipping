var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop, State, h } from '@stencil/core';
import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;
let AppStep2 = class AppStep2 {
    constructor() {
        this.address = {};
        this.onInputInterior = (e) => {
            this.address['internalNumber'] = e.target.value;
        };
        this.onInputComment = (e) => {
            this.address['comment'] = e.target.value;
        };
    }
    componentDidLoad() {
        this.nav = this.element.parentElement;
        this.alertController = document.querySelector('ion-alert-controller');
        this.initMap();
        this.changeMapOption();
    }
    initMap() {
        let latLng = new google.maps.LatLng(19.4284706, -99.1276627);
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: latLng,
            zoom: 11,
            disableDefaultUI: true
        });
        this.map.addListener('drag', () => {
            this.marker.setPosition(this.map.getCenter());
        });
        this.map.addListener('dragend', () => {
            this.setAddressRender({
                location: this.map.getCenter()
            }, true);
        });
    }
    async loadingShow() {
        this.loadingController = document.querySelector('ion-loading-controller');
        this.loading = await this.loadingController.create();
        await this.loading.present();
    }
    async changeMapOption() {
        await this.loadingShow();
        const option = this.selected_option;
        if (option.type == "prediction") {
            this.setAddressRender({ placeId: option.value.place_id });
        }
        else {
            this.changeMapGeolocation();
        }
    }
    async showAlert(data) {
        const alert = await this.alertController.create(data);
        await alert.present();
    }
    async changeMapGeolocation() {
        try {
            var optionsGeolocation = {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0
            };
            const geolocation = await Geolocation.getCurrentPosition(optionsGeolocation);
            const coords = geolocation.coords;
            let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
            this.setAddressRender({ location: latLng });
        }
        catch (error) {
            this.loading.dismiss();
            if (error.code) {
                this.showAlert({
                    header: 'Accion requerida.',
                    message: 'Activa el acceso a tu ubicacion.',
                    buttons: [{
                            text: "Atras",
                            handler: () => {
                                this.nav.pop();
                            }
                        }, {
                            text: "Ya Active",
                            handler: () => {
                                this.changeMapGeolocation();
                                console.log('Confirm Okay');
                            }
                        }]
                });
            }
            else {
                this.showAlert({
                    header: 'Error.',
                    message: 'Ocurrio un error, intente de nuevo.',
                    buttons: [{
                            text: "OK",
                            handler: () => {
                                this.nav.pop();
                            }
                        }]
                });
            }
        }
    }
    setAddressRender(search, dragend = false) {
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode(search, (results, status) => {
            if (status === google.maps.GeocoderStatus.OK) {
                const result = this.validateAddress(results);
                if (result) {
                    if (!dragend) {
                        this.map.setCenter(result.geometry.location);
                        this.map.setZoom(19);
                        this.marker = new google.maps.Marker({
                            position: result.geometry.location,
                            map: this.map
                        });
                    }
                    this.setAddress(result);
                }
                this.loading.dismiss();
            }
        });
    }
    validateAddress(results) {
        for (let result in results) {
            const components = results[result].address_components;
            for (let component in components) {
                const type = components[component]['types'][0];
                if (type == "street_number" || type == "route") {
                    if (type == "route") {
                        results[result]['dragend'] = true;
                    }
                    return results[result];
                }
            }
        }
        return null;
    }
    getNeighborhood(result) {
        const types = ["political", "sublocality", "sublocality_level_1"];
        const components = result.address_components;
        for (let component in components) {
            const type = components[component]['types'][0];
            console.log();
            if (type in types) {
                console.log(components[component]['long_name']);
            }
        }
    }
    setAddress(result) {
        console.log(result);
        this.address = Object.assign({}, this.address, { formatted: result.formatted_address, dragend: result.dragend, latitude: result.geometry.location.lat(), longitude: result.geometry.location.lng(), neighborhood: this.getNeighborhood(result) });
    }
    handleClickEnd() {
        console.log(this.address);
    }
    render() {
        return [
            h("ion-alert-controller", null), ,
            h("ion-loading-controller", null),
            h("app-header", { "ion-title": "Ajustar Ubicacion", "back-buttom": true }),
            h("ion-content", null,
                this.address['formatted']
                    ? h("ion-card", null,
                        h("ion-card-content", null,
                            h("h4", null,
                                h("strong", null, this.address['formatted'])),
                            h("small", null,
                                "Mueva el mapa para ajustar su ubicaci\u00F3n.",
                                this.address['dragend']
                                    ? h("strong", null, "(Obligatorio)")
                                    : null)))
                    : null,
                h("div", { id: "map" })),
            h("ion-footer", null,
                h("ion-list", null,
                    h("ion-row", null,
                        h("ion-col", { size: "5" },
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "N\u00BA Interior (Opcional)"),
                                h("ion-input", { autofocus: true, placeholder: "Piso / Depto / etc...", onInput: e => this.onInputInterior(e) }))),
                        h("ion-col", null,
                            h("ion-item", null,
                                h("ion-label", { position: "stacked" }, "Comentario"),
                                h("ion-input", { autofocus: true, placeholder: "Intrucciones de entrega", onInput: e => this.onInputComment(e) }))))),
                h("ion-button", { expand: "full", size: "large", disabled: this.address['dragend'] ? true : false, onClick: () => this.handleClickEnd() }, "Finalizar"))
        ];
    }
};
__decorate([
    Element()
], AppStep2.prototype, "element", void 0);
__decorate([
    Prop()
], AppStep2.prototype, "selected_option", void 0);
__decorate([
    State()
], AppStep2.prototype, "address", void 0);
AppStep2 = __decorate([
    Component({
        tag: 'app-step2',
        styleUrl: 'app-step2.css'
    })
], AppStep2);
export { AppStep2 };
