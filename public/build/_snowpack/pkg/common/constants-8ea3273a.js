import { c as createCommonjsModule, r as ramda } from './ramda-0dd7d62e.js';

var typographicFixer = createCommonjsModule(function (module, exports) {

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.check = check;
exports.fix = fix;
exports.group = group;
exports.rule = rule;
exports.ignore = ignore;
function check(allRules, string) {
  if (!allRules || !string) {
    throw new Error('The check arguments are mandatory');
  }

  var _collectRules = collectRules(allRules);

  var ignores = _collectRules.ignores;
  var rules = _collectRules.rules;

  if (rules.length === 0) {
    return undefined;
  }

  var ranges = flatten(ignores.map(function (ignore) {
    return ignore.ranges(string);
  }));

  var results = [];

  for (var i = 0, len = rules.length; i < len; i++) {
    var _rule = rules[i];
    results = results.concat(_rule.check(string));
  }

  results = results.filter(function (result) {
    return !ranges.some(function (range) {
      return rangesIntersects(range, result.range);
    });
  });

  return results.length > 0 ? results : undefined;
}

function fix(allRules, string) {
  if (!allRules || !string) {
    throw new Error('The fix arguments are mandatory');
  }

  var _collectRules2 = collectRules(allRules);

  var ignores = _collectRules2.ignores;
  var rules = _collectRules2.rules;

  if (rules.length === 0) {
    return string;
  }

  var ranges = campactRanges(flatten(ignores.map(function (ignore) {
    return ignore.ranges(string);
  })));

  var _splitByRanges = splitByRanges(string, ranges);

  var included = _splitByRanges.included;
  var excluded = _splitByRanges.excluded;

  for (var i = 0, len = included.length; i < len; i++) {
    for (var j = 0, _len = rules.length; j < _len; j++) {
      var _rule2 = rules[j];
      included[i] = _rule2.fix(included[i]);
    }
  }

  return alternateJoin(included, excluded);
}

function group(name, rules) {
  var groupName = undefined;

  if (Array.isArray(name)) {
    rules = name;
    groupName = [];
  } else {
    if (!name || !rules) {
      throw new Error('The group rules argument is mandatory');
    }
    groupName = [name];
  }

  return flatten(rules).map(function (rule) {
    var newObject = {
      name: groupName.concat(rule.name).join('.')
    };

    for (var key in rule) {
      if (key === 'name') {
        continue;
      }
      newObject[key] = rule[key];
    }

    return newObject;
  });
}

function rule(name, expression, replacement) {
  if (!name || !expression || !replacement) {
    throw new Error('All arguments of the rule function are mandatory');
  }

  var source = undefined;

  if (expression instanceof RegExp) {
    source = expression.source;
  } else {
    source = expression;
  }

  return {
    name: name,
    check: function check(string) {
      var re = new RegExp(source, 'gm');
      var matches = [];
      var match = undefined;
      do {
        match = re.exec(string);
        if (match) {
          matches.push({
            rule: this.name,
            range: [match.index, re.lastIndex]
          });
        }
      } while (match);

      return matches;
    },
    fix: function fix(string) {
      var re = new RegExp(source, 'gm');
      return string.replace(re, replacement);
    }
  };
}

function ignore(name, expression) {
  if (!name || !expression) {
    throw new Error('All arguments of the ignore function are mandatory');
  }

  var source = undefined;

  if (expression instanceof RegExp) {
    source = expression.source;
  } else {
    source = expression;
  }

  return {
    name: name,
    ranges: function ranges(string) {
      var re = new RegExp(source, 'gm');
      var ranges = [];
      var match = undefined;

      do {
        match = re.exec(string);
        if (match) {
          ranges.push([match.index, re.lastIndex]);
        }
      } while (match);

      return ranges;
    }
  };
}

function collectRules(allRules) {
  var ignores = [];
  var rules = [];

  for (var i = 0, len = allRules.length; i < len; i++) {
    var _rule3 = allRules[i];

    if (_rule3.ranges) {
      ignores.push(_rule3);
    } else {
      rules.push(_rule3);
    }
  }

  return { ignores: ignores, rules: rules };
}

function rangesIntersects(rangeA, rangeB) {
  var _rangeA = _slicedToArray(rangeA, 2);

  var startA = _rangeA[0];
  var endA = _rangeA[1];

  var _rangeB = _slicedToArray(rangeB, 2);

  var startB = _rangeB[0];
  var endB = _rangeB[1];

  return startB >= startA && startB <= endA || endB >= startA && endB <= endA || startA >= startB && startA <= endB || endA >= startB && endA <= endB;
}

function flatten(arr) {
  return arr.reduce(function (memo, el) {
    return memo.concat(el);
  }, []);
}

function splitByRanges(string, ranges) {
  var included = [];
  var excluded = [];

  var start = 0;
  for (var i = 0, len = ranges.length; i < len; i++) {
    var range = ranges[i];

    included.push(string.slice(start, range[0]));
    excluded.push(string.slice(range[0], range[1]));
    start = range[1];
  }
  included.push(string.slice(start, string.length));

  return { included: included, excluded: excluded };
}

function alternateJoin(a, b) {
  var string = '';

  for (var i = 0, len = a.length; i < len; i++) {
    string += a[i];
    if (b[i]) {
      string += b[i];
    }
  }

  return string;
}

function campactRanges(ranges) {
  if (ranges.length === 0) {
    return [];
  }

  var newRanges = [ranges.shift()];

  ranges.forEach(function (rangeA) {
    for (var i = 0, len = newRanges.length; i < len; i++) {
      var rangeB = newRanges[i];
      if (rangesIntersects(rangeA, rangeB)) {
        rangeB[0] = Math.min(rangeA[0], rangeB[0]);
        rangeB[1] = Math.max(rangeA[1], rangeB[1]);
        return;
      }
    }

    newRanges.push(rangeA);
  });

  return newRanges.sort(function (a, b) {
    return a[0] - b[0];
  });
}
});

var constants = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.allUnits = exports.otherUnits = exports.volumeUnits = exports.surfaceUnits = exports.scalableUnits = exports.unitScales = exports.vulgarFractions = exports.currenciesRegExp = exports.currencies = undefined;



var _ramda2 = _interopRequireDefault(ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compose = _ramda2.default.compose;
var concat = _ramda2.default.concat;
var map = _ramda2.default.map;
var join = _ramda2.default.join;

/**
 * A map of all unicode currencies with the string to use in a RegExp to match
 * them.
 *
 * @type {Object}
 * @access private
 */

var currencies = exports.currencies = {
  '¤': '¤',
  '¥': '¥',
  '£': '£',
  '$': '\\$',
  '₠': '₠',
  '₡': '₡',
  '₢': '₢',
  '₣': '₣',
  '₤': '₤',
  '₥': '₥',
  '₦': '₦',
  '₧': '₧',
  '₨': '₨',
  '₩': '₩',
  '₪': '₪',
  '₫': '₫',
  '€': '€',
  '₭': '₭',
  '₮': '₮',
  '₯': '₯',
  '₰': '₰',
  '₱': '₱',
  '₲': '₲',
  '₳': '₳',
  '₴': '₴',
  '₵': '₵',
  '₶': '₶',
  '₷': '₷',
  '₸': '₸',
  '₹': '₹',
  '₺': '₺',
  '₻': '₻',
  '₼': '₼',
  '₽': '₽',
  '₾': '₾',
  '฿': '฿',
  '៛': '៛'
};

/**
 * A string containing a regular expression to matches a currency.
 *
 * @type {string}
 * @access private
 */
var currenciesRegExp = exports.currenciesRegExp = _ramda2.default.join('', _ramda2.default.values(currencies));

/**
 * A list of all the vulgar fractions in unicode with the numerical value
 * to match them.
 *
 * @type {Array}
 * @access private
 */
var vulgarFractions = exports.vulgarFractions = [[1, 4, '¼'], [1, 2, '½'], [3, 4, '¾'], [1, 7, '⅐'], [1, 9, '⅑'], [1, 10, '⅒'], [1, 3, '⅓'], [2, 3, '⅔'], [1, 5, '⅕'], [2, 5, '⅖'], [3, 5, '⅗'], [4, 5, '⅘'], [1, 6, '⅙'], [5, 6, '⅚'], [1, 8, '⅛'], [3, 8, '⅜'], [5, 8, '⅝'], [7, 8, '⅞'], [0, 3, '↉']];

/**
 * A list of all the scale prefix of the international unit system used
 * to generate all the variant for the units.
 *
 * @type {Array}
 * @access private
 */
var unitScales = exports.unitScales = ['y', 'z', 'a', 'f', 'p', 'n', 'µ', 'm', 'c', 'd', '', 'da', 'h', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

/**
 * A list of all the units that accept a prefix from the international unit
 * system.
 *
 * @type {Array}
 * @access private
 */
var scalableUnits = exports.scalableUnits = ['m', 'm²', 'm³', 'g', 's', 'l', 'L', 'b', 'B', 'K', 'W', 'V', 'Hz', 'Ω', 'A', 'mol', 'cd'];

/**
 * A list of all the supported surface units.
 *
 * @type {Array}
 * @access private
 */
var surfaceUnits = exports.surfaceUnits = ['mile', 'miles', 'in', 'yd', 'ft', 'm'];

/**
 * A list of all the supported volume units.
 *
 * @type {Array}
 * @access private
 */
var volumeUnits = exports.volumeUnits = ['in', 'yd', 'ft', 'm'];

/**
 * A list of all the other supported units that are not created using the
 * international system units factory.
 *
 * @type {Array}
 * @access private
 */
var otherUnits = exports.otherUnits = [
// temperatures
'°C', '°F', '°Ré', '°N', '°Ra',
// distances
'mi', 'in', 'ft', 'yd', 'nautical mile', 'nautical miles',
// speed
'kmph', 'km/h', 'mps', 'm/s', 'mph', 'mi/h', 'knot', 'knots', 'nautical mile/h', 'nautical miles/h', 'ma',
// surfaces
'ha', 'a', 'ca', 'mile²', 'miles²', 'in²', 'yd²', 'ft²', 'ro', 'acre', 'acres', 'nautical mile²', 'nautical miles²',
// volumes
'in³', 'ft³', 'yd³', 'gal', 'bbl', 'pt', 'fluid pt', 'dry pt',
// weight
't', 'carat', 'grain', 'oz', 'lb', 'cwt', 'ton', 'st',
// time
'h', 'min',
// electric
'dBm', 'dBW', 'var', 'VA', 'F', 'H', 'S', 'C', 'Ah', 'J', 'kWh', 'eV', 'Ω∙m', 'S/m', 'V/m', 'N/C', 'V·m', 'T', 'G', 'Wb', 'dB', 'ppm'];

/**
 * A function to combine the units from international units system with their
 * prefix.
 *
 * @param  {Array} scales the list of scales prefix to use
 * @param  {Array} units the list of units to combine
 * @return {Array} an array containing all the variants of the provided units
 * @access private
 */
var combine = compose(map(join('')), _ramda2.default.xprod);

/**
 * A list of all the supported units.
 *
 * @type {Array}
 * @access private
 */
var allUnits = exports.allUnits = concat(otherUnits, combine(unitScales, scalableUnits));
});

export { constants as c, typographicFixer as t };
