import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop() title: string;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>
            <img
              id="title_logo"
              src="assets/img/cuenca-logo.png"
              width="25"
            />
            <span>{ this.title }</span>
          </ion-title>
        </ion-toolbar>
      </ion-header>,
    ];
  }
}