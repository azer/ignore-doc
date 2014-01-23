var minimatch = require("minimatch");
var ignoredByDefault = [
  '.git',
  '.svn',
  '.hg',
  '.DS_STORE',
  'npm-debug.log'
];

module.exports = define;

function define (doc, add) {
  doc = doc.toString();
  var patterns = doc.split('\n');

  add && (patterns = patterns.concat(add));
  patterns = patterns.concat(ignoredByDefault);

  var i = patterns.length;
  while (i--) {
    if (/^[^\/]+$/.test(patterns[i])) {
      patterns.push(patterns[i] + '/**/*');
    }
  }

  return apply;

  function apply (filename) {
    var i = patterns.length;
    while (i--) {
      if (minimatch(filename, patterns[i])) {
        return false;
      }
    }

    return true;
  }
}
