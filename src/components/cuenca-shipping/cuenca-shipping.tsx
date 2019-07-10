import { Component, Element, Prop, h } from '@stencil/core';

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
    if (this.clientId){
      let firstComponent = 'app-step1';
      if(localStorage.getItem("clientId") == this.clientId){
        firstComponent = 'app-step3';
      }
      return (
        <ion-app>
          <ion-router useHash={false}>
            <ion-route
              url={window.location.pathname}
              component={firstComponent}
              componentProps={{
                'backUrl': this.backUrl,
                'clientId': this.clientId,
                'clientName': this.clientName
              }} 
            />
            <ion-route url={window.location.pathname} component="app-step2" />
            <ion-route url={window.location.pathname} component="app-step3" />
          </ion-router>
          <ion-nav animated={false}/>
        </ion-app>
      )
    }
    return null
  }
}
