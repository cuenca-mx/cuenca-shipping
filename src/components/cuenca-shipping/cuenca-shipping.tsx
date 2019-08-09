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

  limitDate(hour) {
    var today = new Date();
    today.setHours(hour);
    today.setMinutes(0);
    today.setSeconds(0);
    return today
  }

  systemAvailable() {
    const now = new Date();
    const day = now.getDay();
    const weekend = [6,7];
    let startDate = this.limitDate(8);
    let endDate = this.limitDate(21);
    if (weekend.includes(day)){
      startDate = this.limitDate(9);
      endDate = this.limitDate(20);
    }
    const from = startDate.getTime();
    const to = endDate.getTime();
    const nowtime = now.getTime();
    return nowtime >= from && nowtime <= to;
  };

  render() {      
    if (this.clientId){
      const is_available = this.systemAvailable();
      let firstComponent = 'app-step1';
      if (!is_available) {
          firstComponent = 'system-available';
      }else if(localStorage.getItem("clientId") == this.clientId){
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
            <ion-route url={window.location.pathname} component="system-available" />
          </ion-router>
          <ion-nav animated={false}/>
        </ion-app>
      )
    }
    return null
  }
}
