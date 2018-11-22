const fs = require('fs');
const pug = require('pug');

// import {promisify} from 'util';
// const readFile = promisify(fs.readFile);

// Compile the source code
const compiledFunction = pug.compileFile('template.pug');

let baseSource = fs.readFileSync('ColumnIndex.java/base')
let leftSource = fs.readFileSync('ColumnIndex.java/left')
let rightSource = fs.readFileSync('ColumnIndex.java/right')
let mergeMethodsSource = fs.readFileSync('ColumnIndex.java/MERGE_METHODS')
let keepBothMethodsSource = fs.readFileSync('ColumnIndex.java/KEEP_BOTH_METHODS')
let safeSource = fs.readFileSync('ColumnIndex.java/SAFE')
let unstructuredSource = fs.readFileSync('ColumnIndex.java/UNSTRUCTURED')

let caseNumber = 1;
let title = 'cassandra/rev_0f1fb_8b0e1/ColumnIndex.java';

let comments = [['Construtor do Builder', ["Left alterou assinatura, corpo, e adicionou 1 overload",
                "Right alterou corpo",
                "Unstructured acusou conflito nos argumentos e no overload",
                "Safe deu match com vazio, e manteve duas outras versões do método",
                "MM e KB mantiveram três versões"]],
                ["teste", ["1", "2", 3]]
            ];

// Render a set of data
console.log(compiledFunction({
  caseNumber: caseNumber,
  title: title,
  observations: observations,
  baseSource: baseSource,
  leftSource: leftSource,
  rightSource: rightSource,
  mergeMethodsSource: mergeMethodsSource,
  keepBothMethodsSource: keepBothMethodsSource,
  safeSource: safeSource,
  unstructuredSource: unstructuredSource,
  list: comments
}));
