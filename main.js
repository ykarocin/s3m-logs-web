const fs = require('fs');
const pug = require('pug');

// import {promisify} from 'util';
// const readFile = promisify(fs.readFile);

// Compile the source code
const compiledFunction = pug.compileFile('template.pug');

// let baseSource = fs.readFileSync('ColumnIndex.java/base')
// let leftSource = fs.readFileSync('ColumnIndex.java/left')
// let rightSource = fs.readFileSync('ColumnIndex.java/right')
// let mergeMethodsSource = fs.readFileSync('ColumnIndex.java/MERGE_METHODS')
// let keepBothMethodsSource = fs.readFileSync('ColumnIndex.java/KEEP_BOTH_METHODS')
// let safeSource = fs.readFileSync('ColumnIndex.java/SAFE')
// let unstructuredSource = fs.readFileSync('ColumnIndex.java/UNSTRUCTURED')
//
// let caseNumber = 1;
// let title = 'cassandra/rev_0f1fb_8b0e1/ColumnIndex.java';
//
// let comments = [['Construtor do Builder', ["Left alterou assinatura, corpo, e adicionou 1 overload",
//                 "Right alterou corpo",
//                 "Unstructured acusou conflito nos argumentos e no overload",
//                 "Safe deu match com vazio, e manteve duas outras versões do método",
//                 "MM e KB mantiveram três versões"]],
//                 ["teste", ["1", "2", 3]]
//             ];

// Render a set of data

fs.readdirSync("./cases").forEach(file => {
  let baseSource = fs.readFileSync("./cases/" + file + '/base')
  let leftSource = fs.readFileSync("./cases/" + file + '/left')
  let rightSource = fs.readFileSync("./cases/" + file + '/right')
  let mergeMethodsSource = fs.readFileSync("./cases/" + file + '/MERGE_METHODS')
  let keepBothMethodsSource = fs.readFileSync("./cases/" + file + '/KEEP_BOTH_METHODS')
  let safeSource = fs.readFileSync("./cases/" + file + '/SAFE')
  let unstructuredSource = fs.readFileSync("./cases/" + file + '/UNSTRUCTURED')

  let caseNumber = 1;
  let title = file;

  let comments = [['Construtor do Builder', ["Left alterou assinatura, corpo, e adicionou 1 overload",
                  "Right alterou corpo",
                  "Unstructured acusou conflito nos argumentos e no overload",
                  "Safe deu match com vazio, e manteve duas outras versões do método",
                  "MM e KB mantiveram três versões"]],
                  ["teste", ["1", "2", 3]]
              ];


  let content = compiledFunction({
    caseNumber: caseNumber,
    title: title,
    baseSource: baseSource,
    leftSource: leftSource,
    rightSource: rightSource,
    mergeMethodsSource: mergeMethodsSource,
    keepBothMethodsSource: keepBothMethodsSource,
    safeSource: safeSource,
    unstructuredSource: unstructuredSource,
    list: comments
  });

  console.log(`<!doctype html>
  <html lang="en" dir="ltr">
  <script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" type="text/css" href="dist/diff2html.css">

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <style media="screen">
      table,
      th,
      td {
        /* border: 1px solid grey;
        padding: 8px; */
      }

      .row>div {
        border: 1px solid grey;
      }
    </style>
    <title></title>
  </head>

  <body>
    <div class="container-fluid">

      <h1>S3M Renaming Analysis</h1>
      <table class="table">
        ${content}

      </table>

    </div>


  </body>

  </html>
`);
})
