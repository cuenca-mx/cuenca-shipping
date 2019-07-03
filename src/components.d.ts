/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface AppHeader {
    'back_buttom': boolean;
    'title': string;
  }
  interface AppStep1 {}
  interface AppStep2 {
    'selected_option': any;
  }
  interface CuencaShipping {
    'apiKey': string;
  }
}

declare global {


  interface HTMLAppHeaderElement extends Components.AppHeader, HTMLStencilElement {}
  var HTMLAppHeaderElement: {
    prototype: HTMLAppHeaderElement;
    new (): HTMLAppHeaderElement;
  };

  interface HTMLAppStep1Element extends Components.AppStep1, HTMLStencilElement {}
  var HTMLAppStep1Element: {
    prototype: HTMLAppStep1Element;
    new (): HTMLAppStep1Element;
  };

  interface HTMLAppStep2Element extends Components.AppStep2, HTMLStencilElement {}
  var HTMLAppStep2Element: {
    prototype: HTMLAppStep2Element;
    new (): HTMLAppStep2Element;
  };

  interface HTMLCuencaShippingElement extends Components.CuencaShipping, HTMLStencilElement {}
  var HTMLCuencaShippingElement: {
    prototype: HTMLCuencaShippingElement;
    new (): HTMLCuencaShippingElement;
  };
  interface HTMLElementTagNameMap {
    'app-header': HTMLAppHeaderElement;
    'app-step1': HTMLAppStep1Element;
    'app-step2': HTMLAppStep2Element;
    'cuenca-shipping': HTMLCuencaShippingElement;
  }
}

declare namespace LocalJSX {
  interface AppHeader extends JSXBase.HTMLAttributes<HTMLAppHeaderElement> {
    'back_buttom'?: boolean;
    'title'?: string;
  }
  interface AppStep1 extends JSXBase.HTMLAttributes<HTMLAppStep1Element> {}
  interface AppStep2 extends JSXBase.HTMLAttributes<HTMLAppStep2Element> {
    'selected_option'?: any;
  }
  interface CuencaShipping extends JSXBase.HTMLAttributes<HTMLCuencaShippingElement> {
    'apiKey'?: string;
  }

  interface IntrinsicElements {
    'app-header': AppHeader;
    'app-step1': AppStep1;
    'app-step2': AppStep2;
    'cuenca-shipping': CuencaShipping;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements extends LocalJSX.IntrinsicElements {}
  }
}


