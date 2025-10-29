import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cv-chat',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
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