import { Component, Element, Listen, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'app-step1',
  styleUrl: 'app-step1.css'
})
export class AppStep1 {
  @Element() element: HTMLElement;

  @Prop() backUrl: string;
  @Prop() clientId: string;
  @Prop() clientName: string;

  @State() predictions: any[] = [];

  entered_address: string='';
  timeout_for_req: any;

  nav: any;
  toastController: any;

  componentDidLoad(){
    this.nav = this.element.parentElement;
    this.toastController = document.querySelector(
      'ion-toast-controller'
    );
  }

  async toastErrorMessage(){
    const toast = await this.toastController.create({
      header: 'Ocurrio un error, intente de nuevo.'
    });
    return await toast.present();
  }

  getQueryPredictions(){
    this.predictions = [];
    if (this.entered_address){
      var service = new google.maps.places.AutocompleteService();
      service.getPlacePredictions({
        input: this.entered_address,
        componentRestrictions: {
          country: 'mx'
        },
        types: ['address']
      }, (predictions, status) => {
        if (
          status != google.maps.places.PlacesServiceStatus.ZERO_RESULTS &&
          status != google.maps.places.PlacesServiceStatus.OK
        ) {
          this.toastErrorMessage();
          return;
        }
        this.predictions = predictions || [];
      });
    }
  }

  selectPrediction(prediction){
    this.nav.push('app-step2', {
      selectedOption: {type: "prediction", value: prediction},
      backUrl: this.backUrl,
      clientId: this.clientId
    });
  }

  selectGeolocation(){
    this.nav.push('app-step2', {
      selectedOption: {type: "geolocation"},
      backUrl: this.backUrl,
      clientId: this.clientId
    });
  }

  @Listen('ionChange')
  ionChangeAddress(event: CustomEvent) {
    this.entered_address = event.detail.value;
    if (this.entered_address == ""){
      this.getQueryPredictions()
    }else{
      if(this.timeout_for_req) {
        clearTimeout(this.timeout_for_req);
        this.timeout_for_req = null;
      }
      this.timeout_for_req = setTimeout(() => {
        this.getQueryPredictions()
      }, 650);
    }
  }

  render() {
    return [
      <ion-toast-controller></ion-toast-controller>,
      <app-header ion-title="Cuenca"></app-header>,

      <ion-content class="ion-padding">
        <ion-item>
          <ion-label position="stacked">
            { this.clientName
              ? <span>Hola {this.clientName}</span>
              : <span>Añade tu direccion</span>
            }
          </ion-label>
          <ion-input
            autofocus
            clear-input
            placeholder="¿Donde entregamos tu tarjeta?"
          ></ion-input>
        </ion-item>
        <ion-item>
          <ion-label class="ion-text-right">
            <img
              src="/assets/img/powered_by_google.png"
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