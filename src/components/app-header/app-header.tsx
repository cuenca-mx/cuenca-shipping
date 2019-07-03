import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'app-header',
  styleUrl: 'app-header.css'
})
export class AppHeader {
  @Prop() ionTitle: string;
  @Prop() backButtom: boolean;

  render() {
    return [
      <ion-header>
        <ion-toolbar color="primary">
          {this.backButtom
            ? <ion-buttons slot="start">
                <ion-back-button default-href="/"></ion-back-button>
              </ion-buttons>
            : null
          }
          <ion-title>
            <img
              id="title_logo"
              src="/assets/img/cuenca-logo.png"
              width="25"
            />
            <span>{ this.ionTitle }</span>
          </ion-title>
        </ion-toolbar>
      </ion-header>,
    ];
  }
}