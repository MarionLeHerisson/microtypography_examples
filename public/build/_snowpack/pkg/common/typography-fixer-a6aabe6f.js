import { c as createCommonjsModule, r as ramda } from './ramda-0dd7d62e.js';

var typographyFixer = createCommonjsModule(function (module, exports) {

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.fix = fix;
exports.group = group;
exports.rule = rule;
exports.ignore = ignore;



var _ramda2 = _interopRequireDefault(ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var anyPass = _ramda2.default.anyPass;
var append = _ramda2.default.append;
var both = _ramda2.default.both;
var compose = _ramda2.default.compose;
var concat = _ramda2.default.concat;
var cond = _ramda2.default.cond;
var converge = _ramda2.default.converge;
var curry = _ramda2.default.curry;
var either = _ramda2.default.either;
var filter = _ramda2.default.filter;
var flatten = _ramda2.default.flatten;
var groupBy = _ramda2.default.groupBy;
var head = _ramda2.default.head;
var is = _ramda2.default.is;
var isArrayLike = _ramda2.default.isArrayLike;
var join = _ramda2.default.join;
var lensProp = _ramda2.default.lensProp;
var map = _ramda2.default.map;
var merge = _ramda2.default.merge;
var not = _ramda2.default.not;
var over = _ramda2.default.over;
var pipe = _ramda2.default.pipe;
var propSatisfies = _ramda2.default.propSatisfies;
var reduce = _ramda2.default.reduce;
var replace = _ramda2.default.replace;
var sort = _ramda2.default.sort;
var tail = _ramda2.default.tail;
var transpose = _ramda2.default.transpose;
var unapply = _ramda2.default.unapply;
var unnest = _ramda2.default.unnest;
var where = _ramda2.default.where;

/**
 * Returns an array of rule violations in the passed-in string.
 *
 * Ignores and rules are separated at the beginning of the call, then the ranges
 * to ignore are computed. When the a check results intersect with or is
 * contained in a range it will be simply ignored.
 *
 * If there's no results, the function returns `undefined`.
 *
 * See the {@link rule} and {@link ignore} documentation for details about how
 * rules and ignore rules are created.
 *
 * @param  {Array} [ruleset=[]] the array with all the rules and ignores to use
 *                              when checking the passed-in string
 * @param  {string} [string] the string to check
 * @return {Array|undefined} an array of rule violation results or `undefined`
 *                           when there is no violations.<br>Each result
 *                           object will have the following properties:
 * @property {string} name the name of the broken rule
 * @property {Array} range the range at which the violation can be found
 *                         in the string
 * @example
 * import {check} from 'typography-fixer'
 * import rules from 'typography-fixer/lib/rules/en-UK'
 *
 * const results = check(rules, 'Some string "to check".')
 *
 * // The check function support currying
 * const checkString = check(rules)
 *
 * const results = checkSring('Some string "to check".')
 */

function check() {
  var ruleset = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var string = arguments[1];

  var _splitRules = splitRules(ruleset);

  var ignores = _splitRules.ignores;
  var rules = _splitRules.rules;

  if (rules.length === 0) {
    return string ? undefined : function () {};
  }

  var getRanges = compose(unnest, _ramda2.default.ap(map(rangesFunctionFor, ignores)), _ramda2.default.of);
  var getCheckResults = converge(unapply(flatten), map(checkString, rules));

  var doCheck = function doCheck(string) {
    var anyIntersection = anyPass(map(rangesIntersects, getRanges(string)));
    var noIntersection = compose(not, propSatisfies(anyIntersection, 'range'));
    var results = filter(noIntersection, getCheckResults(string));

    return results.length > 0 ? results : undefined;
  };

  return string ? doCheck(string) : doCheck;
}

/**
 * Returns the passed-in string modified by the specified ruleset.
 *
 * Ignores and rules are separated at the beginning of the call, then the ranges
 * to ignore are computed. The string is split using the ranges to have in one
 * array all the parts that can be modified and in another array all the ignored
 * parts. Once all the fixes were applied, the string from the two arrays are
 * joined together into a new string and returned.
 *
 * See the {@link rule} and {@link ignore} documentation for details about how
 * rules and ignore rules are created.
 *
 * @param  {Array} [ruleset=[]] the array with all the rules and ignores to use
 *                              to transform the passed-in string
 * @param  {string} [string] the string to fix
 * @return {string} the fixed string
 * @example
 * import {fix} from 'typography-fixer'
 * import rules from 'typography-fixer/lib/rules/en-UK'
 *
 * const string = fix(rules, 'Some string "to fix".')
 *
 * // The fix function support currying
 * const fixString = fix(rules)
 *
 * const results = fixString('Some string "to fix".')
 */
function fix() {
  var ruleset = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
  var string = arguments[1];

  var _splitRules2 = splitRules(ruleset);

  var ignores = _splitRules2.ignores;
  var rules = _splitRules2.rules;

  if (rules.length === 0) {
    return string || function () {};
  }

  var getRanges = compose(sortRanges, compactRanges, unnest, _ramda2.default.ap(map(rangesFunctionFor, ignores)), _ramda2.default.of);
  var fixer = pipe.apply(undefined, _toConsumableArray(map(fixString, rules)));

  var doFix = function doFix(string) {
    var _splitByRanges = splitByRanges(string, getRanges(string));

    var legit = _splitByRanges.legit;
    var ignored = _splitByRanges.ignored;

    var fixContent = map(fixer);

    return alternateJoin(fixContent(legit), ignored);
  };

  return string ? doFix(string) : doFix;
}

/**
 * Returns a flat array of rules with names prefixed by the passed-in `name`.
 *
 * When called without a name the `group` function will only flatten the given
 * rules array.
 *
 * One use case of calling group without a name is when exporting a ruleset from
 * a file so that nested groups get flatten into the exported array.
 *
 * @param  {string} [name] the name of the rules group
 * @param  {Array} rules the rules to be part of the group
 * @return {Array} an array of new rules prefixed with this group name
 *
 * @example
 * import {group, rule} from 'typography-fixer'
 *
 * export default group([
 *   group('spaces', [
 *     rule('spaceAfterPeriodOrColon', /(\D)(\.|:)([^\s\)])/, '$1$2 $3'),
 *     …
 *   ])
 * ])
 */
function group(name, rules) {
  var rulesAsFirstArgument = compose(isArrayLike, head);
  var nameThenRules = both(compose(isString, head), compose(isArrayLike, tail));

  var normalizeArguments = cond([when(rulesAsFirstArgument, function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var rules = _ref2[0];
    return [[], rules];
  }), when(nameThenRules, function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var name = _ref4[0];
    var rules = _ref4[1];
    return [[name], rules];
  }), when(_ramda2.default.T, function () {
    return [[], []];
  })]);

  var _normalizeArguments = normalizeArguments([name, rules]);

  var _normalizeArguments2 = _slicedToArray(_normalizeArguments, 2);

  var groupName = _normalizeArguments2[0];
  var ruleset = _normalizeArguments2[1];

  var prefixer = compose(join('.'), concat(groupName));
  var prefixName = over(lensProp('name'), prefixer);

  return Object.freeze(map(prefixName, flatten(ruleset)));
}

/**
 * Creates a new rule object that matches the specified `match` expression.
 *
 * A rule is an object with a `name`, `match` and `replace` properties.
 *
 * A rule can be created with either a string or a regular expression as the
 * `match` paramete
 *
 * - When given a regular expression the flags of the original expression
 *   are preserved except for the `global` which will be forcefully defined
 *   on the `match` created when checking or fixing a string.
 * - When given a string this string will be used a source for the regular
 *   expressions. These expressions will be created with the `multiline` flag
 *   enabled.
 *
 * The `replace` parameter is used when a match is found and will be passed
 * as the second argument of the `String#replace` method. A regular expression
 * based on the one used to search the string will be passed as the first
 * argument. It means that every group will be available to use in the
 * replacement string. A function can also be passed in the `replace`
 * parameter and will then receive the matched string and the various groups as
 * arguments.
 *
 * @param  {string} name the name of the rule
 * @param  {string|RegExp} match the regular expression to match against
 *                               a string
 * @param  {string|function} replace the replacement string or function
 *                                   to use when a match is found
 * @return {Object} the rule object
 * @example
 * import {rule} from 'typography-fixer'
 *
 * // this rule adds a space after `.` and `:` unless the characted is preceded
 * // by a number, as in 12.4 or 04:35, or followed by a space or `)`
 * const ruleObject = rule('spaceAfterPeriodOrColon', /(\D)(\.|:)([^\s\)])/, '$1$2 $3')
 */
function rule(name, match, replace) {
  return Object.freeze({ name: name, match: match, replace: replace });
}

/**
 * Creates a new ignore rule that excludes the specified `ignore` expression.
 *
 * An ignore rule is an object with a `name`, `ignore` and an optional
 * `invertRanges` properties.
 *
 * An ignore rule can be created with either a string or a regular expression
 * as the `ignore` paramete
 *
 * - When given a regular expression the flags of the original expression
 *   are preserved except for the `global` which will be forcefully defined
 *   on the expression created when checking or fixing a string.
 * - When given a string this string will be used a source for the regular
 *   expressions. These expressions will be created with the `multiline` flag
 *   enabled.
 *
 * An ignore rule can also ignores everything that is not matched by the
 * expression by passing `true` as in the `invertRanges` argument of the
 * `ignore` function.
 *
 * @param  {string} name the name of the rule
 * @param  {string|RegExp} ignore the regular expression to match against
 *                                a string
 * @param  {boolean} [invertRanges=false] if `true` the excluded ranges will
 *                                        cover every part of the string that
 *                                        is not matched by the expression
 * @return {Object} [description]
 * @example
 * import {ignore} from 'typography-fixer'
 *
 * // this rule ignores markdown code blocks defined using three consecutive backticks
 * const ignoreObject = ignore('codeBlock', /(```)(.|\n)*?\1/),
 */
function ignore(name, ignore) {
  var invertRanges = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

  return Object.freeze({ name: name, ignore: ignore, invertRanges: invertRanges });
}

//  ########  ########  #### ##     ##    ###    ######## ########
//  ##     ## ##     ##  ##  ##     ##   ## ##      ##    ##
//  ##     ## ##     ##  ##  ##     ##  ##   ##     ##    ##
//  ########  ########   ##  ##     ## ##     ##    ##    ######
//  ##        ##   ##    ##   ##   ##  #########    ##    ##
//  ##        ##    ##   ##    ## ##   ##     ##    ##    ##
//  ##        ##     ## ####    ###    ##     ##    ##    ########

/**
 * A predicate that returns true when the passed-in value is a regular
 * expression.
 *
 * @param  {*} value the value to test
 * @return {boolean} whether the value is a regular expression or not
 * @access private
 */
var isRegExp = is(RegExp);

/**
 * A predicate that returns true when the passed-in value is a string.
 *
 * @param  {*} value the value to test
 * @return {boolean} whether the value is a string or not
 * @access private
 */
var isString = is(String);

/**
 * A predicate that returns true when the passed-in value is a function.
 *
 * @param  {*} value the value to test
 * @return {boolean} whether the value is a function or not
 * @access private
 */
var isFunction = is(Function);

/**
 * A predicate that returns true when the passed-in value is either a string
 * or a regular expression.
 *
 * @param  {*} value the value to test
 * @return {boolean} true if the value is either a regular expression
 *                        or a string
 * @access private
 */
var isStringOrRegExp = either(isString, isRegExp);

/**
 * A predicate that returns true when the passed-in value is either a string
 * or a function.
 *
 * @param  {*} value the value to test
 * @return {boolean} true if the value is either a function or a string
 * @access private
 */
var isStringOrFunction = either(isString, isFunction);

/**
 * A predicate that returns true when the passed-in object is a valid rule.
 *
 * @param  {*} value the object to test
 * @return {boolean} true if the passed-in object is a valid rule
 * @access private
 */
var isRule = where({
  name: isString,
  match: isStringOrRegExp,
  replace: isStringOrFunction
});

/**
 * A predicate that returns true when the passed-in object is a valid
 * ignore rule.
 *
 * @param  {*} value the object to test
 * @return {boolean} true if the passed-in object is a valid ignore rule
 * @access private
 */
var isIgnore = where({
  name: isString,
  ignore: isStringOrRegExp
});

/**
 * Wraps the passed-in condition and function into an array to be used
 * in a `cond` argument.
 *
 * @param  {function(value:*):boolean} predicate a function to use as predicate
 * @param  {function(value:*):*} then a function to use when the predicate
 *                                    is fulfilled
 * @return {Array<Function>} an array with the two passed-in functions
 */
var when = function when(predicate, then) {
  return [predicate, then];
};

/**
 * Returns the base flags array for a regular expression depending on whether
 * the regexp should match globally or not.
 *
 * @param  {boolean} global whether the regexp should match globally or not
 * @return {Array} the base flags array
 * @access private
 */
var baseFlags = function baseFlags(global) {
  return global ? ['g'] : [];
};

/**
 * Extract the flag letter corresponding to a given property from the specified
 * regular expression. For instance, if asked the flag for the multiline
 * property and the passed-in expression has `multiline` enabled the function
 * will return `'m'` otherwise it will return an empty string.
 *
 * @param  {string} prop the property flag to extract
 * @param  {RegExp} re the target regular expression
 * @return {string} the flag string
 * @access private
 */
var flag = curry(function (prop, re) {
  return re[prop] ? prop[0] : '';
});

/**
 * Returns the flags array for the given regular expression but with the
 * global flag defined using the specified parameter.
 *
 * This function is used to create clones of rules and ignores expression
 * but configurated to be used in different context.
 *
 * @param  {boolean} global whether the regexp should match globally or not
 * @param  {RegExp} re the target regular expression
 * @return {Array} an array of regular expression flags
 * @access private
 */
var flagsForRegExp = curry(function (global, re) {
  var appendFlags = compose(append(flag('multiline', re)), append(flag('ignoreCase', re)));

  return appendFlags(baseFlags(global));
});

/**
 * Returns a cloned regular expression from the passed-in rule's property
 * specified in the arguments.
 *
 * @param  {boolean} global whether the regexp should match globally or not
 * @param  {string} prop the rule property to clone
 * @param  {Object} rule the source rule object
 * @return {RegExp} the cloned regular expression
 * @access private
 */
var ruleRegExp = curry(function (global, prop, rule) {
  var getSource = function getSource(e) {
    return isRegExp(e) ? e.source : e;
  };
  var getFlags = compose(join(''), function (e) {
    return isRegExp(e) ? flagsForRegExp(global, e) : concat(baseFlags(global), 'm');
  });

  return new RegExp(getSource(rule[prop]), getFlags(rule[prop]));
});

/**
 * A parameterized function that returns a cloned regular expression for
 * the passed-in ignore rule.
 *
 * @param  {Object} ignore the source ignore rule
 * @return {RegExp} the cloned regular expression
 * @access private
 */
var ignoreRuleRegExp = ruleRegExp(true, 'ignore');

/**
 * A parameterized function that returns a cloned regular expression for
 * the passed-in rule to use when searching matches globally in a string.
 *
 * @param  {Object} ignore the source ignore rule
 * @return {RegExp} the cloned regular expression
 * @access private
 */
var searchRuleRegExp = ruleRegExp(true, 'match');

/**
 * A parameterized function that returns a clone regular expression for
 * the passed-in ignore rule when performing a simple match against a string.
 *
 * @param  {Object} ignore the source ignore rule
 * @return {RegExp} the cloned regular expression
 * @access private
 */
var matchRuleRegExp = ruleRegExp(false, 'match');

/**
 * Returns the check results of the given rule against the passed-in string.
 * If no matches are found the function returns an empty array.
 *
 * @param  {Object} rule the rule to check the string
 * @param  {string} string the string to check
 * @return {Array<Object>} an array of resuls
 * @access private
 */
function checkString(rule, string) {
  var searchRegExp = searchRuleRegExp(rule);
  var matchRegExp = matchRuleRegExp(rule);

  var doCheck = function doCheck(string) {
    var matches = [];
    searchRegExp.lastIndex = 0;

    var match = undefined;
    do {
      match = searchRegExp.exec(string);
      if (match && match[0].replace(matchRegExp, rule.replace) !== match[0]) {
        matches.push({
          rule: rule.name,
          range: [match.index, searchRegExp.lastIndex]
        });
      }
    } while (match);

    return matches;
  };

  return string ? doCheck(string) : doCheck;
}

/**
 * Returns the passed-in string fixed according to the specified rule.
 *
 * @param  {Object} rule the rule to apply to the string
 * @param  {string} string the string to fix
 * @return {string} the fixed string
 * @access private
 */
function fixString(rule, string) {
  var searchRegExp = searchRuleRegExp(rule);

  var doFix = function doFix(string) {
    searchRegExp.length = 0;

    return replace(searchRegExp, rule.replace, string);
  };

  return string ? doFix(string) : doFix;
}

/**
 * Returns a function to compute the ranges to ignore according to the
 * passed-in rule.
 *
 * @param  {Object} rule the rule for which computing the range
 * @return {function(string):Array} a function that returns the range for
 *                                  for a given string
 * @access private
 */
function rangesFunctionFor(rule) {
  return rule.invertRanges ? exclusiveRangesFor(rule) : inclusiveRangesFor(rule);
}

/**
 * Returns the ignored ranges in the string for the passed-in rule. All the
 * sections of the string that is matched by the rule regular expression will
 * be ignored.
 *
 * @param  {Object} rule the ignore rule for which getting ranges
 * @param  {string} the string into which find the ranges
 * @return {Array<Array>} an array with the ignored ranges
 * @access private
 */
function inclusiveRangesFor(rule, string) {
  var re = ignoreRuleRegExp(rule);

  var getRanges = function getRanges(string) {
    re.lastIndex = 0;
    var ranges = [];
    var match = undefined;

    do {
      match = re.exec(string);
      if (match) {
        ranges.push([match.index, re.lastIndex]);
      }
    } while (match);

    return ranges;
  };

  return string ? getRanges(string) : getRanges;
}

/**
 * Returns the ignored ranges in the string for the passed-in rule. All the
 * sections of the string that is not matched by the rule regular expression
 * will be ignored.
 *
 * @param  {Object} rule the ignore rule for which getting ranges
 * @param  {string} the string into which find the ranges
 * @return {Array<Array>} an array with the ignored ranges
 * @access private
 */
function exclusiveRangesFor(rule, string) {
  var re = ignoreRuleRegExp(rule);

  var getRanges = function getRanges(string) {
    re.lastIndex = 0;
    var ranges = [];
    var start = 0;
    var match = undefined;

    do {
      match = re.exec(string);
      if (match) {
        ranges.push([start, match.index - 1]);
        start = re.lastIndex;
      }
    } while (match);

    ranges.push([start, string.length]);

    return ranges;
  };

  return string ? getRanges(string) : getRanges;
}

/**
 * A filter function that only keep objects in the list that are either valid
 * rules or ignore rules.
 *
 * @param  {Array<Object>} ruleset the list of objects to filter
 * @return {Array<Object>} the filtered list
 * @access private
 */
var rulesFilter = filter(either(isRule, isIgnore));

/**
 * A grouping function that separates rules and ignore rules into two
 * separate lists.
 *
 * @param  {Array<Object>} ruleset the list of rules to group
 * @return {Object} an object with the rules and ignores from the original array
 * @property {Array<Object>} rules the array of rules
 * @property {Array<Object>} ignores the array of ignores
 * @access private
 */
var rulesGrouper = groupBy(function (rule) {
  return rule.ignore ? 'ignores' : 'rules';
});

/**
 * Takes an object and returns a new object where the `rules` and `ignores`
 * properties have been defined with a new array if they were not present.
 *
 * @param  {Object} object the initial object
 * @return {Object} a new object that is guarantee to have `rules` and
 *                  `ignores` properties
 * @access private
 */
var setRulesDefault = merge({ ignores: [], rules: [] });

/**
 * Returns an object with two lists containing the rules and ignores from
 * the passed-in array. Every objects that doesn't match the criteria will
 * be discarded.
 *
 * @param  {Array<Object>} ruleset the array of rules to split
 * @return {Object} an object with the rules and ignores from the original array
 * @property {Array<Object>} rules the array of rules
 * @property {Array<Object>} ignores the array of ignores
 * @access private
 */
var splitRules = compose(setRulesDefault, rulesGrouper, rulesFilter);

/**
 * Returns whether the two passed-in ranges intersect or not
 *
 * @param  {Array} rangeA the first range to test
 * @param  {Array} rangeB the second range to test
 * @return {boolean} whether the two ranges intersect
 * @access private
 */
var rangesIntersects = curry(function (rangeA, rangeB) {
  var _rangeA = _slicedToArray(rangeA, 2);

  var startA = _rangeA[0];
  var endA = _rangeA[1];

  var _rangeB = _slicedToArray(rangeB, 2);

  var startB = _rangeB[0];
  var endB = _rangeB[1];

  return startB >= startA && startB <= endA || endB >= startA && endB <= endA || startA >= startB && startA <= endB || endA >= startB && endA <= endB;
});

/**
 * Takes a string and a list of ranges and returns an object with two lists
 * containing in `ignored` the string parts that are contained in the passed-in
 * ranges and in `legit` the parts that are not contained by the ranges.
 *
 * @param  {string} string the string to split
 * @param  {Array<Array>} ranges the ranges to use to split the string
 * @return {Object} an object with the string split by ranges
 * @property {Array<string>} legit the parts of the string not contained
 *                                 in the passed-in ranges
 * @property {Array<string>} ignored the parts of the string contained
 *                                   in the passed-in ranges
 * @access private
 */
function splitByRanges(string, ranges) {
  var results = { legit: [], ignored: [] };

  var start = 0;
  var reducer = function reducer(memo, range) {
    memo.legit.push(string.slice(start, range[0]));
    memo.ignored.push(string.slice(range[0], range[1]));
    start = range[1];
    return results;
  };
  reduce(reducer, results, ranges);

  results.legit.push(string.slice(start, string.length));
  results.ignored.push('');

  return results;
}

/**
 * A reducer function that takes a string `memo` and a tuple of two strings `a`
 * and `b` and which returns a string that is the result of `memo + a + b`.
 *
 * @param  {string} memo the reduce memo
 * @param  {array} tuple the current pair of string from the two lists
 * @return {string} the new memo
 * @access private
 */
var joinReducer = function joinReducer(memo, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 2);

  var a = _ref6[0];
  var b = _ref6[1];
  return memo + a + b;
};

/**
 * Takes two lists and joins them such as the final string is the result
 * of `a[0] + b[0] + a[1] + b[1] + a[n] + b[n]`.
 *
 * @param  {Array<string>} a the first list to join
 * @param  {Array<string>} b the second list to join
 * @return {string} the string resulting of joining the two lists
 * @access private
 */
var alternateJoin = function alternateJoin(a, b) {
  return reduce(joinReducer, '', transpose([a, b]));
};

/**
 * Takes a list of ranges and returns a new list where all the intersecting
 * ranges have been merged.
 *
 * @param  {Array<Array>} ranges [description]
 * @return {Array<Array>} [description]
 * @access private
 */
function compactRanges(ranges) {
  if (ranges.length === 0) {
    return [];
  }

  return reduce(rangesReducer, [], ranges);
}

/**
 * The reducer function used to merge intersecting ranges.
 *
 * @param  {Array<Array>} memo the initial memo array
 * @param  {Array} rangeA the current range to process
 * @return {Array<Array>} the new memo array
 * @access private
 */
function rangesReducer(memo, rangeA) {
  var filterer = function filterer(rangeB) {
    if (rangesIntersects(rangeA, rangeB)) {
      rangeA[0] = Math.min(rangeA[0], rangeB[0]);
      rangeA[1] = Math.max(rangeA[1], rangeB[1]);
      return false;
    } else {
      return true;
    }
  };

  return memo.length === 0 ? append(rangeA, memo) : append(rangeA, filter(filterer, memo));
}

/**
 * Takes a list of ranges and sort them by their start position.
 *
 * @param  {Array<Array>} ranges the list of ranges to sort
 * @return {Array<Array>} the sorted ranges list
 * @access private
 */
var sortRanges = sort(function (a, b) {
  return a[0] - b[0];
});
});

export { typographyFixer as t };
