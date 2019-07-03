import { Component, Element, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'cuenca-shipping',
  styleUrl: 'cuenca-shipping.css'
})
export class MyComponent {
  @Element() element: HTMLElement;
  @Prop() apiKey: string;

  nav: any;

  componentDidLoad(){
    this.nav = this.element.querySelector('ion-nav');
    this.injectGoogleMapsApiScript();
  }

  @Listen('optionSelect')
  todoCompletedHandler(event: CustomEvent) {
    const option = event.detail;
    console.log(option)
    this.nav.push('app-step2');
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
        <ion-router >
          <ion-route-redirect from="/" to="/step1" />
          <ion-route url="/step1" component="app-step1" />
          <ion-route url="/step2" component="app-step2" />
        </ion-router>
        <ion-nav animated={false}/>
      </ion-app>
    )
  }
}
