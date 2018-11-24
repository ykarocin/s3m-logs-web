var drawDiff = function(that) {
  let caseId = that.closest("div").id;

  let leftDiff = document.querySelector(`#${caseId} .left-diff`).value + "Source";
  let rightDiff = document.querySelector(`#${caseId} .right-diff`).value + "Source";

  let left = document.querySelector(`#${caseId} .${leftDiff}`).textContent;
  let right = document.querySelector(`#${caseId} .${rightDiff}`).textContent;
  let diff = JsDiff.createPatch("fileName", left, right, leftDiff, rightDiff);
  let prettyDiff = Diff2Html.getPrettyHtml(diff, {
    inputFormat: 'diff',
    matching: 'lines'
  });

  document.querySelector(`#${caseId} .diff-result`).innerHTML = prettyDiff;
}
