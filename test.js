var ignoreDoc = require("./");
var fs = require("fs");
var example = ignoreDoc(fs.readFileSync('./example'));

it('ignores .git, .svn, .hg and .DS_STORE by default', function(){
  expect(example('.git')).to.be.false;
  expect(example('.git/foo/bar')).to.be.false;
  expect(example('.svn')).to.be.false;
  expect(example('.svn/foo/bar')).to.be.false;
  expect(example('.hg')).to.be.false;
  expect(example('.hg/foo/bar')).to.be.false;
  expect(example('npm-debug.log')).to.be.false;
});

it('ignores defined files', function(){
  expect(example('bar.js')).to.be.false;
  expect(example('bar.j')).to.be.true;
  expect(example('bar.jsx')).to.be.true;
  expect(example('foo.pyc')).to.be.false;
});

it('ignores folders within all files', function(){
  expect(example('node_modules')).to.be.false;
  expect(example('node_modules/foo/bar/qux')).to.be.false;
  expect(example('node_module')).to.be.true;
  expect(example('node_modules ')).to.be.true;
  expect(example('foo')).to.be.true;
  expect(example('foo/corge/qux')).to.be.false;
  expect(example('node_module')).to.be.true;
  expect(example('foo ')).to.be.true;
});

it('optionally takes additional patterns', function(){
  example = ignoreDoc('./example', ['*.md']);

  expect(example('corge.md')).to.be.false;
});
