## ignore-doc

Filter filenames with .ignore documents created by users. Based on [minimatch](http://github.com/isaacs/minimatch)

## Install

```bash
$ npm install ignore-doc
```

## Usage

Create an ignore file:

```
node_modules
test
**/*.pyc
```

And read it with ignore-doc:

```js
ignoreDoc = require('ignore-doc')
readFile = require('fs').readFileSync

filter = ignoreDoc(readFileSync('./.ignore'))

filter('node_modules/foo')
// => false

filter('index.js')
// => true

filter('.git') // .git, .svn, .hg is ignored by default
// => false

filter('.DS_STORE') // .DS_STORE is ignored by default
// => false
```

Additional patterns can be passed as second parameter:

```js
filter = ignoreDoc(readFileSync('./.ignore'), ['test.js', 'README*'])

filter('README')
// => false

filter('README.md')
// => false
```

Some advanced patterns like *.py[cod] are supported:

```
*.py[cod]
**/*.py[cod]
```

```js
filter = ignoreDoc(readFileSync('./.ignore'))

filter('foo.pyc')
// => false

filter('foo/bar/qux.pyd')
// => false
```
