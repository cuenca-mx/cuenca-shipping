import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'app-step2',
  styleUrl: 'app-step2.css'
})
export class AppStep2 {
  @State() address_detail: string='';
  @Prop() selected_option: object;

  map: any;
  marker: any;

  componentDidLoad(){
  	console.log(this.selected_option)
    this.initMap();
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
  }

  render() {
    return [
      <app-header title="Ajustar Ubicacion"></app-header>,
      <ion-content>
        <div id="map"></div>
      </ion-content>,
     <ion-footer>
        <ion-list>
          <ion-item>
            <ion-label position="stacked">Detalle de entrega
            </ion-label>
            <ion-input
              autofocus
              placeholder="Piso, Oficina, Departamento, etc..."
              //onInput={e => this.onInputAddressDetail(e)}
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