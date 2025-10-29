import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'cv-chat',
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
    }
  ]
};