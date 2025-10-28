import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cvchat',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements'
    },
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'demo.html', dest: 'index.html' }
      ]
    }
  ]
};