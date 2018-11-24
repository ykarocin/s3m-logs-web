const fs = require('fs');
const pug = require('pug');

const compiledFunction = pug.compileFile('template.pug');

let content = "";

fs.readdirSync("./cases").forEach((file, index) => {
  let baseSource = fs.readFileSync("./cases/" + file + '/base')
  let leftSource = fs.readFileSync("./cases/" + file + '/left')
  let rightSource = fs.readFileSync("./cases/" + file + '/right')
  let mergeMethodsSource = fs.readFileSync("./cases/" + file + '/MERGE_METHODS')
  let keepBothMethodsSource = fs.readFileSync("./cases/" + file + '/KEEP_BOTH_METHODS')
  let safeSource = fs.readFileSync("./cases/" + file + '/SAFE')
  let unstructuredSource = fs.readFileSync("./cases/" + file + '/UNSTRUCTURED')

  let caseNumber = index + 1;
  let title = file;

  // let comments = [['Construtor do Builder', ["Left alterou assinatura, corpo, e adicionou 1 overload",
  //                 "Right alterou corpo",
  //                 "Unstructured acusou conflito nos argumentos e no overload",
  //                 "Safe deu match com vazio, e manteve duas outras versões do método",
  //                 "MM e KB mantiveram três versões"]],
  //                 ["teste", ["1", "2", 3]]
  //             ];
  let comments = [];

  content += compiledFunction({
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
});

console.log(`<!doctype html>
<html lang="en" dir="ltr">
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="stylesheet" type="text/css" href="dist/diff2html.min.css">
  <link rel="stylesheet" href="dist/bootstrap.css">

  <script type="text/javascript" src="dist/diff2html.js"></script>
  <script type="text/javascript" src="dist/jsdiff.js"></script>

  <script type="text/javascript" src="diff.js"></script>
  
  <title>S3M Renaming Analysis</title>
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
