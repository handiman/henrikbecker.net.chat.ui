'use strict';

var index = require('./index-CB70RYB7.js');
var appGlobals = require('./app-globals-V2Kpy_OQ.js');

const defineCustomElements = async (win, options) => {
  if (typeof window === 'undefined') return undefined;
  await appGlobals.globalScripts();
  return index.bootstrapLazy([["cv-chat.cjs",[[257,"cv-chat",{"ingestEndpoint":[1,"ingest-endpoint"],"questionPlaceholder":[1,"question-placeholder"],"errorMessage":[1,"error-message"],"question":[32],"answer":[32],"confidence":[32],"promptGuard":[32],"chunks":[32],"loading":[32]}]]]], options);
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;
//# sourceMappingURL=loader.cjs.js.map
