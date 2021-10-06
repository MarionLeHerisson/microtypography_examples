import {check, fix} from '../_snowpack/pkg/typography-fixer.js'
import englishRules from '../_snowpack/pkg/typography-fixer/lib/rules/en-UK.js'
import frenchRules from '../_snowpack/pkg/typography-fixer/lib/rules/fr-FR.js'
import markdown from '../_snowpack/pkg/typography-fixer/lib/ignores/markdown.js'

const rulesEn = englishRules.concat(markdown)
const rulesFr = frenchRules.concat(markdown)

// returns an array with all the places where rules have been transgressed
// or undefined if no rules were broken.
const checkResultsEn = check(rulesEn, 'Some text "to verify".')
const checkResultsFr = check(rulesFr, 'Du texte "à vérifier".')

// returns the string with all rule violations fixed
// in that case it returns: 'Some text “to verify.”'
const fixedStringEn = fix(rulesEn, 'Some text "to verify".')
const fixedStringFr = fix(rulesFr, 'Du texte "à vérifier".')

console.log(checkResultsEn);
console.log(checkResultsFr);
console.log(fixedStringEn);
console.log(fixedStringFr);
