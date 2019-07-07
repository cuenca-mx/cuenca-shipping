import { Component, Element, Prop, Watch, h } from '@stencil/core';

@Component({
  tag: 'cuenca-shipping',
  styleUrl: 'cuenca-shipping.css'
})
export class MyComponent {
  @Element() element: HTMLElement;
  @Prop() apiKey: string;
  @Prop() backUrl: string;
  @Prop() clientId: string;
  @Prop() clientName: string;

  componentDidLoad(){
    this.injectGoogleMapsApiScript();
  }

  @Watch('clientId')
  watchHandler(newValue: boolean, oldValue: boolean) {
    console.log('The new value of activated is: ', newValue);
    console.log('The new value of activated is: ', oldValue);
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
          <ion-route
            url={window.location.pathname}
            component="app-step1"
            componentProps={{
              'backUrl': this.backUrl,
              'clientId': this.clientId,
              'clientName': this.clientName
            }} 
          />
          <ion-route url={window.location.pathname} component="app-step2" />
        </ion-router>
        <ion-nav animated={false}/>
      </ion-app>
    )
  }
}
