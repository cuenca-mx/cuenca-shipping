import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cuenca-shipping',
  outputTargets: [
    {
      type: 'dist',
      copy: [{ src: 'assets' }],
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/app.css'
};
