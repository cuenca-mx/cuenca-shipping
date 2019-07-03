import { Component, Element, Listen, h } from '@stencil/core';

@Component({
  tag: 'cuenca-shipping',
  styleUrl: 'cuenca-shipping.css'
})
export class MyComponent {
  @Element() element: HTMLElement;

  nav: any;

  componentDidLoad(){
    this.nav = this.element.querySelector('ion-nav');
  }

  @Listen('optionSelect')
  todoCompletedHandler(event: CustomEvent) {
    const option = event.detail;
    console.log(option)
    this.nav.push('app-step2');
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
