var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Prop, h } from '@stencil/core';
let MyComponent = class MyComponent {
    componentDidLoad() {
        this.injectGoogleMapsApiScript();
    }
    injectGoogleMapsApiScript() {
        const exists_script = document.body.querySelector('script#googlemaps');
        if (!exists_script) {
            let script = document.createElement('script');
            script.id = 'googlemaps';
            const uri_gmaps = "https://maps.googleapis.com/maps/api/js?";
            if (this.apiKey) {
                script.src = uri_gmaps + 'key=' + this.apiKey + '&libraries=places';
            }
            else {
                script.src = uri_gmaps + 'libraries=places';
            }
            document.body.appendChild(script);
        }
    }
    render() {
        return (h("ion-app", null,
            h("ion-router", { useHash: false },
                h("ion-route", { url: window.location.pathname, component: "app-step1" }),
                h("ion-route", { url: window.location.pathname, component: "app-step2" })),
            h("ion-nav", { animated: false })));
    }
};
__decorate([
    Element()
], MyComponent.prototype, "element", void 0);
__decorate([
    Prop()
], MyComponent.prototype, "apiKey", void 0);
MyComponent = __decorate([
    Component({
        tag: 'cuenca-shipping',
        styleUrl: 'cuenca-shipping.css'
    })
], MyComponent);
export { MyComponent };
