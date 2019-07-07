var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, h } from '@stencil/core';
let AppHeader = class AppHeader {
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    this.backButtom
                        ? h("ion-buttons", { slot: "start" },
                            h("ion-back-button", { "default-href": "/" }))
                        : null,
                    h("ion-title", null,
                        h("img", { id: "title_logo", src: "/assets/img/cuenca-logo.png", width: "25" }),
                        h("span", null, this.ionTitle)))),
        ];
    }
};
__decorate([
    Prop()
], AppHeader.prototype, "ionTitle", void 0);
__decorate([
    Prop()
], AppHeader.prototype, "backButtom", void 0);
AppHeader = __decorate([
    Component({
        tag: 'app-header',
        styleUrl: 'app-header.css'
    })
], AppHeader);
export { AppHeader };
