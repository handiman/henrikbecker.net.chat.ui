import { b as bootstrapLazy } from './index-C_P-tY0Y.js';
export { s as setNonce } from './index-C_P-tY0Y.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await globalScripts();
  return bootstrapLazy([["cv-chat",[[257,"cv-chat",{"question":[32],"answer":[32],"confidence":[32],"promptGuard":[32],"chunks":[32],"loading":[32]}]]]], options);
};

export { defineCustomElements };
//# sourceMappingURL=loader.js.map
