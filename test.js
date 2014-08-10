var test = require('prova');
var test = require('prova');
var ignoreDoc = require("./");
var fs = require("fs");
var example = ignoreDoc(fs.readFileSync('./example'));

test('ignores .git, .svn, .hg and .DS_STORE by default', function (t) {
  t.plan(7)
  t.notOk(example('.git'));
  t.notOk(example('.git/foo/bar'));
  t.notOk(example('.svn'));
  t.notOk(example('.svn/foo/bar'));
  t.notOk(example('.hg'));
  t.notOk(example('.hg/foo/bar'));
  t.notOk(example('npm-debug.log'));
});

test('ignores defined files', function (t) {
  t.plan(4)
  t.notOk(example('bar.js'));
  t.ok(example('bar.j'));
  t.ok(example('bar.jsx'));
  t.notOk(example('foo.pyc'));
});

test('ignores folders within all files', function (t) {
  t.plan(10)
  t.notOk(example('node_modules'));
  t.notOk(example('node_modules/.bin'));
  t.notOk(example('node_modules/bin/azer/.git'));
  t.notOk(example('node_modules/foo/bar/qux'));
  t.ok(example('node_module'));
  t.ok(example('node_modules '));
  t.ok(example('foo'));
  t.notOk(example('foo/corge/qux'));
  t.ok(example('node_module'));
  t.ok(example('foo '));
});

test('optionally takes additional patterns', function (t) {
  example = ignoreDoc('./example', ['*.md']);

  t.plan(1)
  t.notOk(example('corge.md'));
});
