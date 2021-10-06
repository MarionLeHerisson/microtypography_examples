import { g as getDefaultExportFromCjs, c as createCommonjsModule } from '../../../common/ramda-0dd7d62e.js';
import { t as typographicFixer, c as constants } from '../../../common/constants-8ea3273a.js';

var frFR = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});





exports.default = (0, typographicFixer.group)([(0, typographicFixer.group)('punctuations', [(0, typographicFixer.rule)('multiplePunctuation', /([!?])\1+/, '$1'), (0, typographicFixer.rule)('shortEtCaetera', /([Ee]tc)(\.{3}|\u2026)/, '$1.'), (0, typographicFixer.rule)('tripleDots', /\.{3,}/, '…'), (0, typographicFixer.rule)('maleHonorific', /Mr\./, 'M.'), (0, typographicFixer.rule)('numberAbbr', /(n|N)°/, '$1º'), (0, typographicFixer.rule)('enDash', /(\w\x20)-(\x20\w)/, '$1–$2')]), (0, typographicFixer.group)('spaces', [(0, typographicFixer.rule)('multipleSpaces', /\x20+/, ' '), (0, typographicFixer.rule)('noSpaceBefore', /(\x20|\u00a0|\u202F)*(,|\.|\u2026)/, '$2'), (0, typographicFixer.rule)('spaceAfterPunctuation', /([^&\n\s]*)(\.|,|;|:|!|\?|%|\u2026)(?!\x20|$)/, '$1$2 '), (0, typographicFixer.rule)('spaceBeforePunctuation', /(?:\x20)?([?!:;%])/, ' $1'), (0, typographicFixer.rule)('spaceBeforeCurrency', '(\\d) ?([' + constants.currenciesRegExp + '])', '$1 $2')]), (0, typographicFixer.group)('ordinal', [(0, typographicFixer.rule)('greaterThan10', /(\d{2,})emes/, '$1èmes'), (0, typographicFixer.rule)('firstFemalePlural', /(\d{1})[èe]res/, '$1res'), (0, typographicFixer.rule)('lowerThan10', /((^|[^\d])\d)[èe]mes/, '$1es'), (0, typographicFixer.rule)('firstFemale', /(\d)[èe]re/, '$1re'), (0, typographicFixer.rule)('firstMale', /(\d)[èe]me(?!s)/, '$1e')]), (0, typographicFixer.group)('quotes', [(0, typographicFixer.rule)('singleQuote', /(\w)'(\w)/, '$1’$2'), (0, typographicFixer.rule)('doubleQuote', /"([^"]+)"/, function (_, m) {
  return '« ' + m.replace(/^\s+|\s+$/g, '') + ' »';
})]), (0, typographicFixer.group)('datetime', [(0, typographicFixer.rule)('daysAndMonths', /(Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche|Janvier|Février|Mars|Avril|Mai|Juin|Juillet|Aout|Septembre|Octobre|Novembre|Décembre)/, function (s) {
  return s.toLowerCase();
}), (0, typographicFixer.rule)('timeLong', /(\d)\s*h\s*(\d+)\s*min\s*(\d+)\s*s/, '$1 h $2 min $3 s'), (0, typographicFixer.rule)('timeShort', /(\d)\s*h\s*(\d)/, '$1 h $2')]), (0, typographicFixer.group)('ligatures', [(0, typographicFixer.rule)('lowerOe', /oe/, 'œ'), (0, typographicFixer.rule)('upperOe', /O[eE]/, 'Œ'), (0, typographicFixer.rule)('lowerAe', /ae/, 'æ'), (0, typographicFixer.rule)('upperAe', /A[eE]/, 'Æ')])]);
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(frFR);

export default __pika_web_default_export_for_treeshaking__;
