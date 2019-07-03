import { Component, Prop, State, h } from '@stencil/core';
import { Plugins } from '@capacitor/core';

const { Geolocation } = Plugins;

@Component({
  tag: 'app-step2',
  styleUrl: 'app-step2.css'
})
export class AppStep2 {
  @Prop() selected_option: any;

  @State() address: string='';
  @State() address_detail: string='';

  map: any;
  marker: any;

  loadingController: any;
  loading: any;

  componentDidLoad(){
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
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

    var _this = this;
    google.maps.event.addListener(this.map, 'drag', function () {
      _this.marker.setPosition(this.getCenter());
    });

    google.maps.event.addListener(this.map, 'dragend', function () {
      _this.setAddressRender(this.getCenter());
    });
  }

  async changeMapOption(){
    this.loadingController = document.querySelector('ion-loading-controller');
    this.loading = await this.loadingController.create();
    await this.loading.present();
    const option = this.selected_option;
    if (option.type == "prediction"){
      await this.changeMapPrediction(option.value.place_id);
    }else{
      await this.changeMapGeolocation();
    }
    await this.loading.dismiss();
  }

  changeMapPrediction(place_id) {
    var request = {placeId: place_id, fields: ['formatted_address','geometry']};
    var service = new google.maps.places.PlacesService(this.map);
    service.getDetails(request, (place, status) =>{
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        this.map.setCenter(place.geometry.location);
        this.map.setZoom(19);
        this.marker = new google.maps.Marker({
          position: place.geometry.location,
          map: this.map
        });
        this.address = place.formatted_address;
      }
    });
  }

  setAddressRender(location){
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({
      'location': location
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
          if (results[0]) {
            this.address = results[0]["formatted_address"];
          }
      }
    });
  }

  async changeMapGeolocation(){
    var optionsGeolocation = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    const geolocation = await Geolocation.getCurrentPosition(optionsGeolocation);
    const coords = geolocation.coords;
    let latLng = new google.maps.LatLng(coords.latitude, coords.longitude);
    this.map.setCenter(latLng);
    this.map.setZoom(19);
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
    this.setAddressRender(latLng);
  }

  onInputAddressDetail = (e) => {
    this.address_detail = (e.target as any).value;
  }

  render() {
    return [
      <ion-loading-controller></ion-loading-controller>,
      <app-header title="Ajustar Ubicacion"></app-header>,
      <ion-content>
        <div id="map"></div>
      </ion-content>,
      <ion-footer>
        <ion-list>
          <ion-item>
            { this.address }
            <ion-label position="stacked">Detalle de entrega
            </ion-label>
            <ion-input
              autofocus
              placeholder="Piso, Oficina, Departamento, etc..."
              onInput={e => this.onInputAddressDetail(e)}
            ></ion-input>
          </ion-item>
        </ion-list>   
        <ion-button
          disabled={this.address_detail == '' ? true : false}
          expand="full" size="large"
        >Finalizar</ion-button>
      </ion-footer>
    ];
  }
}