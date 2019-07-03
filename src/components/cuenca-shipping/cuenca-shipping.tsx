import { Component, h } from '@stencil/core';

@Component({
  tag: 'cuenca-shipping',
  styleUrl: 'cuenca-shipping.css'
})
export class MyComponent {
  render() {
    return (
      <ion-tabs>
        <ion-tab tab="tab-step1" component="app-step1"></ion-tab>

        <ion-tab tab="tab-step2">
          <app-header title="Ajustar Ubicacion"></app-header>
        </ion-tab>

        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="tab-step1">
            <ion-icon name="home"></ion-icon>
            <ion-label>Paso 1</ion-label>
          </ion-tab-button>

          <ion-tab-button tab="tab-step2">
            <ion-icon name="map"></ion-icon>
            <ion-label>Paso 2</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    )
  }
}
