import { g as getDefaultExportFromCjs, c as createCommonjsModule } from '../../../common/ramda-0dd7d62e.js';
import { t as typographyFixer } from '../../../common/typography-fixer-a6aabe6f.js';

var markdown = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * A set of rules to ignore some markdown blocks.
 *
 * The following set includes rules to ignore:
 *
 * - Images and links url and title
 * - Inline code blocks defined with a single backtick
 * - Code blocks defined with three backticks
 * - Preformatted block using a four spaces indent
 *
 * @type {Array<Object>}
 */
exports.default = createIgnoreset();

function createIgnoreset() {
  return (0, typographyFixer.group)('markdown', [(0, typographyFixer.ignore)('imageAndLinkStart', /!?\[/), (0, typographyFixer.ignore)('imageAndLinkEnd', /\]\([^\)]+\)/), (0, typographyFixer.ignore)('imageAndLinkWithExternalDefinitionEnd', /\]\s*\[[^\]]*\]/), (0, typographyFixer.ignore)('linkDefinition', /\[[^\]]+\]:.*$/m), (0, typographyFixer.ignore)('codeBlock', /(```)(.|\n)*?\1/), (0, typographyFixer.ignore)('preformattedBlock', /^\x20{4}.*$/m), (0, typographyFixer.ignore)('codeInline', /(`{1,2}).*?\1/), (0, typographyFixer.ignore)('url', /\b((?:[a-zA-Z][\w-]+:(?:\/{1,3}|[a-zA-Z0-9%])|www\d{0,3}[.]|[a-zA-Z0-9.\-]+[.][a-zA-Z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/)]);
}
});

var __pika_web_default_export_for_treeshaking__ = /*@__PURE__*/getDefaultExportFromCjs(markdown);

export default __pika_web_default_export_for_treeshaking__;
