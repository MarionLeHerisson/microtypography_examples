import { g as getDefaultExportFromCjs, c as createCommonjsModule } from '../../../common/ramda-0dd7d62e.js';
import { t as typographicFixer } from '../../../common/constants-8ea3273a.js';

var enUK = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});





exports.default = (0, typographicFixer.group)([(0, typographicFixer.group)('punctuations', [(0, typographicFixer.rule)('multiplePunctuation', /([!?])\1+/, '$1'), (0, typographicFixer.rule)('shortEtCaetera', /([Ee]tc)(\.{3}|\u2026)/, '$1.'), (0, typographicFixer.rule)('tripleDots', /\.{3,}/, '…')]), (0, typographicFixer.group)('spaces', [(0, typographicFixer.rule)('multipleSpaces', /\x20+/, ' '), (0, typographicFixer.rule)('noSpaceBeforePunctuation', /(\x20|\u00a0)*(\.|,|;|:|!|\?|%|\u2026)/, '$2'), (0, typographicFixer.rule)('spaceAfterPunctuation', /([^&\n\s]*)(\.|,|;|:|!|\?|%|\u2026)(?!\x20|$)/, '$1$2 '), (0, typographicFixer.rule)('spacesAroundEmDash', /(\x20|\u00a0)*(\u2014)(\x20|\u00a0)*/, '$2')]), (0, typographicFixer.group)('quotes', [(0, typographicFixer.rule)('doubleQuote', /"([^"]+)"/, function (_, m) {
  return '“' + m.replace(/^\s+|\s+$/g, '') + '”';
}), (0, typographicFixer.rule)('punctuationAfterQuote', /(\u201d)(\.|,)/, '$2$1')])]);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(enUK);

export default __pika_web_default_export_for_treeshaking__;
