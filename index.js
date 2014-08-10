var minimatch = require("minimatch");
var ignoredByDefault = [
  '.git',
  '.svn',
  '.hg',
  '.DS_STORE',
  'npm-debug.log'
];

module.exports = define;

function define (patterns, add) {
  if (!Array.isArray(patterns)) {
    if (typeof patterns != "string") patterns = patterns.toString();
    patterns = patterns.split('\n');
  }
  
  add && (patterns = patterns.concat(add));
  patterns = patterns.concat(ignoredByDefault);

  var i = patterns.length;
  while (i--) {
    if (/^[^\/\*]+$/.test(patterns[i])) {
      patterns.push(patterns[i] + '/**/*');
    }
  }

  return apply;

  function apply (filename) {
    var i = patterns.length;
    while (i--) {
      if (minimatch(filename, patterns[i], { dot: true })) {
        return false;
      }
    }

    return true;
  }
}
