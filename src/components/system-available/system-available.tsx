import { Component, h } from '@stencil/core';

@Component({
  tag: 'system-available',
  styleUrl: 'system-available.css'
})
export class SystemAvailable {
  render() {
    const today = new Date();
    const day = today.getDay();
    const weekend = [6,7];
    let startDate = "8:00am";
    let endDate = "9:00pm";
    if (weekend.includes(day)){
      startDate = "9:00am"
      endDate = "8:00pm"
    }
    return [
      <app-header
        ion-title="Lo sentimos"
      ></app-header>,
      <ion-content class="ion-padding">
      	<div class="ion-text-center">
		    <img width="250" src="/assets/img/system-available.png"/>
		    <h2><b>Fuera de Horario</b></h2>
		    <p>Nuestro horario de envíp de tarjetas es de {startDate} a {endDate}.</p>
        <p><b>Te invitamos a ingresar mañana nuevamente para que enviemos tu tarjeta sin problemas.</b></p>
	    </div>  
      </ion-content>
    ];
  }
}