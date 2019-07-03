import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-step2',
  styleUrl: 'app-step2.css'
})
export class AppStep2 {
  render() {
    return [
      <app-header title="Ajustar Ubicacion"></app-header>
    ];
  }
}