import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'stlazy',
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
    {
      type: 'www',
      serviceWorker: null,
      buildDir: 'js',
      resourcesUrl: '/js/stlazy'
    }
  ],
  //globalScript: "src/utils/utils.ts",
};
