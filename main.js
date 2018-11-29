const fs = require('fs');
const pug = require('pug');

const CASES_DIR = "./cases/analyzed_conflicts/"
const compiledFunction = pug.compileFile('template.pug');

function main() {
  let content = "";

  fs.readdirSync(CASES_DIR).forEach((file, index) => {
    let baseSource = fs.readFileSync(CASES_DIR + file + '/base')
    let leftSource = fs.readFileSync(CASES_DIR + file + '/left')
    let rightSource = fs.readFileSync(CASES_DIR + file + '/right')
    let mergeMethodsSource = fs.readFileSync(CASES_DIR + file + '/MERGE_METHODS')
    let keepBothMethodsSource = fs.readFileSync(CASES_DIR + file + '/KEEP_BOTH_METHODS')
    let safeSource = fs.readFileSync(CASES_DIR + file + '/SAFE')
    let unstructuredSource = fs.readFileSync(CASES_DIR + file + '/UNSTRUCTURED')
    let observations = fs.readFileSync(CASES_DIR + file + '/summary.html', {encoding:"UTF-8"})

    let caseNumber = index + 1;
    let title = file;

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
      observations: observations
    });
  });

  let htmlSource = `<!doctype html>
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
    </html>`;

  console.log(htmlSource);
}

main();
