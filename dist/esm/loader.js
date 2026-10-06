import { b as bootstrapLazy } from './index-DB2fo0pR.js';
export { s as setNonce } from './index-DB2fo0pR.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["cv-chat",[[257,"cv-chat",{"collection":[1],"endpoint":[1],"placeholder":[1],"error":[1],"question":[32],"answer":[32],"chunks":[32],"loading":[32],"minimized":[32],"spinnerFrame":[32],"focusInput":[64],"ask":[64]}]]]], options);
};

export { defineCustomElements };
//# sourceMappingURL=loader.js.map
