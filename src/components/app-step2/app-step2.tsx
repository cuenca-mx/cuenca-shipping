import { Component, Element, Prop, State, h } from '@stencil/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  tag: 'app-step2',
  styleUrl: 'app-step2.css'
})
export class AppStep2 {
  @Element() element: HTMLElement;

  @Prop() backUrl: string;
  @Prop() clientId: string;
  @Prop() selectedOption: any;

  @State() address: object={};

  map: any;
  marker: any;

  loadingController: any;
  loading: any;

  alertController: any;

  nav: any;

  componentDidLoad(){
    console.log(this.backUrl)
    this.nav = this.element.parentElement;
    this.alertController = document.querySelector(
      'ion-alert-controller'
    );
    this.initMap();
    this.changeMapOption();
  }

  initMap(){
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

  async loadingShow(){
    this.loadingController = document.querySelector('ion-loading-controller');
    this.loading = await this.loadingController.create();
    await this.loading.present();
  }

  async changeMapOption(){
    await this.loadingShow();
    const option = this.selectedOption;
    if (option.type == "prediction"){
      this.setAddressRender({placeId: option.value.place_id});
    }else{
      this.changeMapGeolocation();
    }
  }

  async showAlert(data){
    const alert = await this.alertController.create(data);
    await alert.present();
  }

  async changeMapGeolocation(){
    try{
      var optionsGeolocation = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      };
      const geolocation = await Geolocation.getCurrentPosition(optionsGeolocation);
      const coords = geolocation.coords;
      let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
      this.setAddressRender({location: latLng});
    }catch(error){
      this.loading.dismiss();
      if (error.code == 1){
        this.showAlert({
          header: 'Accion requerida.',
          message: 'Activa el acceso a tu ubicacion.',
          buttons: [{
            text: "Atras",
            handler: () => {
              this.nav.pop();
            }
          },{
            text: "Ya Active",
            handler: () => {
              this.changeMapGeolocation();
            }
          }]
        });
      }else{
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

  setAddressRender(search, dragend=false){
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(search, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
          const result = this.validateAddress(results);        
          if (result) {
            if (!dragend){    
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

  validateAddress(results){
    const types = ["street_number", "route"];
    for (let result in results){
      const components = results[result].address_components;
      for (let component in components){
        const type = components[component]['types'][0];
        if (types.includes(type)){
          if (type == "route"){
            results[result]['dragendRequired'] = true;
          }
          return results[result]
        }
      }
    }
    return null
  }

  getTypeForIvoy(result, types=[]){
    const components = result.address_components;
    for (let component in components){
      const type = components[component]['types'][0];
      if (types.includes(type)){
        return components[component]['long_name'];
      }
    }
  }

  setAddress(result){
    console.log(result)
    const typesNeighborhood = [
      "political",
      "sublocality",
      "sublocality_level_1"
    ];
    this.address = {
      ...this.address,
      clientId: this.clientId,
      latitude: String(result.geometry.location.lat()),
      longitude: String(result.geometry.location.lng()),
      neighborhood: this.getTypeForIvoy(result, typesNeighborhood),
      street: this.getTypeForIvoy(result, ['route']),
      zipCode: this.getTypeForIvoy(result, ['postal_code']),
      externalNumber: this.getTypeForIvoy(result, ['street_number']),
      googleResult: result
    }
  }

  onInputInterior = (e) => {
    this.address['internalNumber'] = (e.target as any).value;
  }

  onInputComment = (e) => {
    this.address['comment'] = (e.target as any).value;
  }

  handleClickEnd(){
    if(!this.address['internalNumber']){
      const message = `Hemos notado que no has ingresado un 'Numero Interior',
      ¿Deseas que te enviemos tu tarjeta a esta direccion?`;
      this.showAlert({
        header: '¿Estas Seguro?.',
        message: message,
        buttons: [{
          text: "CORREGUIR"
        },{
          text: "SI",
          handler: () => {
            this.sendAddress();
          }
        }]
      });
    }else{
      this.sendAddress();
    }
  }

  async sendAddress(){
    const request = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.address)
    };
    const refresh = await fetch(this.backUrl, request);
    const json = await refresh.json();
    console.log(json)
  }

  render() {
    const googleResult = this.address['googleResult'] || {};
    return [
      <ion-alert-controller></ion-alert-controller>,,
      <ion-loading-controller></ion-loading-controller>,
      <app-header
        ion-title="Ajustar Ubicacion"
        back-buttom={true}
      ></app-header>,
      <ion-content>
        {googleResult['formatted_address']
          ? <ion-card>
              <ion-card-content>
                <h4><strong>{ googleResult['formatted_address'] }</strong></h4>
                <small>
                  Mueva el mapa para ajustar su ubicación.
                  {googleResult['dragendRequired']
                    ? <strong>(Obligatorio)</strong>
                    : null
                  }
                </small>
              </ion-card-content>
            </ion-card>
          : null
        }
        <div id="map"></div>
      </ion-content>,
      <ion-footer>
        <ion-list>
          
          <ion-row>
            <ion-col size="5">
              <ion-item>
                <ion-label position="stacked">Nº Interior (Opcional)
                </ion-label>
                <ion-input
                  autofocus
                  placeholder="Piso / Depto / etc..."
                  onInput={e => this.onInputInterior(e)}
                ></ion-input>
              </ion-item>
            </ion-col>
            <ion-col>
              <ion-item>
                <ion-label position="stacked">Comentario
                </ion-label>
                <ion-input
                  autofocus
                  placeholder="Intrucciones de entrega"
                  onInput={e => this.onInputComment(e)}
                ></ion-input>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-list>   
        <ion-button
          expand="full" size="large"
          disabled={googleResult['dragendRequired'] ? true : false}
          onClick={ () => this.handleClickEnd()}
        >Finalizar</ion-button>
      </ion-footer>
    ];
  }
}