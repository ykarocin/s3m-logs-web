const fs = require('fs');
const pug = require('pug');

// import {promisify} from 'util';
// const readFile = promisify(fs.readFile);

// Compile the source code
const compiledFunction = pug.compileFile('template.pug');

let source = fs.readFileSync('base.java')
console.log(source)

// Render a set of data
console.log(compiledFunction({
  caseNumber: 'X',
  leftSource: source,
}));
// "<p>Timothy's Pug source code!</p>"
