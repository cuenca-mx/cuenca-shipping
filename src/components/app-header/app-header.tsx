import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop() title: string;
  @Prop() back_buttom: boolean;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          {this.back_buttom
            ? <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
              </ion-buttons>
            : null
          }
          <ion-title>
            <img
              id="title_logo"
              src="/cuenca-shipping/assets/img/cuenca-logo.png"
              width="25"
            />
            <span>{ this.title }</span>
          </ion-title>
        </ion-toolbar>
      </ion-header>,
    ];
  }
}