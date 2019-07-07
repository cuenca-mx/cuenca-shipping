var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, State, h } from '@stencil/core';
let AppStep1 = class AppStep1 {
    constructor() {
        this.predictions = [];
        this.entered_address = '';
        this.onInputAddress = (e) => {
            this.entered_address = e.target.value;
            if (this.timeout_for_req) {
                clearTimeout(this.timeout_for_req);
                this.timeout_for_req = null;
            }
            this.timeout_for_req = setTimeout(() => {
                this.getQueryPredictions();
            }, 650);
        };
    }
    componentDidLoad() {
        this.nav = this.element.parentElement;
        this.toastController = document.querySelector('ion-toast-controller');
    }
    async toastErrorMessage() {
        const toast = await this.toastController.create({
            header: 'Ocurrio un error, intente de nuevo.'
        });
        return await toast.present();
    }
    getQueryPredictions() {
        this.predictions = [];
        if (this.entered_address) {
            var service = new google.maps.places.AutocompleteService();
            service.getPlacePredictions({
                input: this.entered_address,
                componentRestrictions: {
                    country: 'mx'
                },
                types: ['address']
            }, (predictions, status) => {
                if (status != google.maps.places.PlacesServiceStatus.ZERO_RESULTS &&
                    status != google.maps.places.PlacesServiceStatus.OK) {
                    this.toastErrorMessage();
                    return;
                }
                this.predictions = predictions || [];
            });
        }
    }
    selectPrediction(prediction) {
        this.nav.push('app-step2', {
            selected_option: { type: "prediction", value: prediction }
        });
    }
    selectGeolocation() {
        this.nav.push('app-step2', {
            selected_option: { type: "geolocation" }
        });
    }
    render() {
        return [
            h("ion-toast-controller", null),
            h("app-header", { "ion-title": "Cuenca" }),
            h("ion-content", { class: "ion-padding" },
                h("ion-item", null,
                    h("ion-label", { position: "stacked" }, "A\u00F1ade direccion"),
                    h("ion-input", { autofocus: true, placeholder: "\u00BFDonde entregamos tu tarjeta?", onInput: e => this.onInputAddress(e) })),
                h("ion-item", null,
                    h("ion-label", { class: "ion-text-right" },
                        h("img", { src: "/assets/img/powered_by_google.png", width: "100" }))),
                h("ion-list", null,
                    this.predictions.map((prediction) => h("ion-item", { onClick: () => this.selectPrediction(prediction) },
                        h("ion-icon", { slot: "start", name: "navigate" }),
                        h("ion-label", null,
                            h("h3", null, prediction.structured_formatting.main_text),
                            h("p", null, prediction.structured_formatting.secondary_text)))),
                    h("ion-item", { onClick: () => this.selectGeolocation() },
                        h("ion-icon", { slot: "start", name: "navigate" }),
                        h("ion-label", null,
                            h("h3", null, "Ubicacion Actual"),
                            h("p", null, "Entregar cerca de ubicacion actual"))),
                    h("ion-item", { onClick: () => this.selectGeolocation() },
                        h("ion-icon", { slot: "start", name: "map" }),
                        h("ion-label", null,
                            h("h3", null, "\u00BFNo encuentras tu direccion?"),
                            h("p", null, "Fijar la direccion en el mapa")))))
        ];
    }
};
__decorate([
    Element()
], AppStep1.prototype, "element", void 0);
__decorate([
    State()
], AppStep1.prototype, "predictions", void 0);
AppStep1 = __decorate([
    Component({
        tag: 'app-step1',
        styleUrl: 'app-step1.css'
    })
], AppStep1);
export { AppStep1 };
