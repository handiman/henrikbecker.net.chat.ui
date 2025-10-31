import { p as promiseResolve, b as bootstrapLazy } from './index-Dyl2uF-5.js';
export { s as setNonce } from './index-Dyl2uF-5.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.38.2 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  const importMeta = import.meta.url;
  const opts = {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["cv-chat",[[257,"cv-chat",{"collection":[1],"placeholder":[1],"error":[1],"question":[32],"answer":[32],"confidence":[32],"promptGuard":[32],"chunks":[32],"loading":[32],"minimized":[32]}]]]], options);
});
//# sourceMappingURL=cv-chat.js.map
