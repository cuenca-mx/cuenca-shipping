import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppStep1 {
  @Prop() title: string;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>
            <img
              id="title_logo"
              src="https://cuenca.com/img/homePics/Logo.png"
              width="25"
            />
            <span>{ this.title }</span>
          </ion-title>
        </ion-toolbar>
      </ion-header>,
    ];
  }
}