import { Component, Element, State, Event, EventEmitter, h } from '@stencil/core';

@Component({
  tag: 'app-step1',
  styleUrl: 'app-step1.css'
})
export class AppStep1 {
  @Element() element: HTMLElement;
  @State() predictions: any[] = [];

  entered_address: string='';
  timeout_for_req: any;

  @Event() optionSelect: EventEmitter;

  getQueryPredictions(){
    this.predictions = [];
    if (this.entered_address){
      this.selectPrediction('test');
    }
  }

  onInputAddress = (e) => {
    this.entered_address = (e.target as any).value;
    if(this.timeout_for_req) {
        clearTimeout(this.timeout_for_req);
        this.timeout_for_req = null;
    }
    this.timeout_for_req = setTimeout(() => {
      this.getQueryPredictions()
    }, 650);
  };

  selectPrediction(prediction){
    this.optionSelect.emit({type: "prediction", value: prediction});
  }

  selectGeolocation(){
    this.optionSelect.emit({type: "geolocation"});
  }

  render() {
    return [
      <app-header title="Cuenca"></app-header>,

      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">Añade direccion</ion-label>
          <ion-input
            autofocus
            placeholder="¿Donde entregamos tu tarjeta?"
            onInput={e => this.onInputAddress(e)}
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-right">
            <img
              src="assets/img/powered_by_google_on_white.png"
              width="100"
            />
          </ion-label>
        </ion-item>
        <ion-list>
          {this.predictions.map((prediction) =>
            <ion-item onClick={() => this.selectPrediction(prediction)}>
              <ion-icon slot="start" name="navigate"></ion-icon>
              <ion-label><h3>{ prediction.structured_formatting.main_text }</h3>
              <p>{ prediction.structured_formatting.secondary_text }</p></ion-label>
            </ion-item>
          )}
          <ion-item onClick={() => this.selectGeolocation()}>
            <ion-icon slot="start" name="navigate"></ion-icon>
            <ion-label><h3>Ubicacion Actual</h3>
            <p>Entregar cerca de ubicacion actual</p></ion-label>
          </ion-item>
          <ion-item onClick={() => this.selectGeolocation()}>
            <ion-icon slot="start" name="map"></ion-icon>
            <ion-label><h3>¿No encuentras tu direccion?</h3>
            <p>Fijar la direccion en el mapa</p></ion-label>
          </ion-item>
        </ion-list>
      </ion-content>
    ];
  }
}