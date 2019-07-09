import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-step3',
  styleUrl: 'app-step3.css'
})
export class AppStep3 {
  render() {
    return [
      <app-header
        ion-title="Direccion recibida"
      ></app-header>,
      <ion-content class="ion-padding">
      	<div class="ion-text-center">
		    <img width="250" src="/assets/img/success.png"/>
		    <h2>Hemos recibido tu <b>direción</b></h2>
		    <p>Si estas en CDMX tu tarjeta sera entregada en menos de 90 minutos,
		    sino haremos todo lo posible por entregartela lo mas pronto posible.</p>
		    <p>Te estaremos contactando para mas detalles</p>
	    </div>  
      </ion-content>
    ];
  }
}