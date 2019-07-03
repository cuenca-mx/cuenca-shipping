import { Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'cuenca-shipping',
  styleUrl: 'cuenca-shipping.css'
})
export class MyComponent {
  @Element() element: HTMLElement;
  @Prop() apiKey: string;

  componentDidLoad(){
    this.injectGoogleMapsApiScript();
  }

  injectGoogleMapsApiScript(){
    const exists_script = document.body.querySelector('script#googlemaps');
    if (!exists_script){
      let script = document.createElement('script');
      script.id = 'googlemaps';

      const uri_gmaps = "https://maps.googleapis.com/maps/api/js?";
      if(this.apiKey){
        script.src = uri_gmaps + 'key=' + this.apiKey + '&libraries=places';
      } else {
        script.src = uri_gmaps + 'libraries=places';       
      }
      
      document.body.appendChild(script);
    }
  }

  render() {
    return (
      <ion-app>
        <ion-router useHash={false}>
          <ion-route url={window.location.pathname} component="app-step1" />
          <ion-route url={window.location.pathname} component="app-step2" />
        </ion-router>
        <ion-nav animated={false}/>
      </ion-app>
    )
  }
}
