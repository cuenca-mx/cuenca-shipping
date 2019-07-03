import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-step1',
  styleUrl: 'app-step1.css'
})
export class AppStep1 {
  render() {
    return [
      <app-header title="Cuenca"></app-header>,

      <ion-content class="ion-padding">
        Hola Mundo!
      </ion-content>
    ];
  }
}