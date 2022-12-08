function good(maxAllowedWords) {
  var lookup = getSelectedText();
  // lookup = lookup.replace(/[\.\*\?;!()\+,\[:\]<>^_`\[\]{}~\\\/\"\'=]/g, " ");
  // lookup = lookup.replace(/\s+/g, " ");
  // if (lookup != null && lookup.replace("/s/g", "").length > 0) {
  //   //disable the double-click feature if the lookup string
  //   //exceeds the maximum number of allowable words
  //   if (maxAllowedWords && lookup.split(/[ -]/).length > maxAllowedWords)
  //     return;

  //   //append the layer to the DOM only once
  //   if ($("#definition_layer").length == 0) {
  //     $("body").append(
  //       "<div id='definition_layer' style='position:absolute; cursor:pointer;'><img src='/img/definition-layer.gif' alt='' title=''/></div>"
  //     );
  //   }

  //   //move the layer at the cursor position
  //   $("#definition_layer").map(function () {
  //     $(this).css({ left: e.pageX - 30, top: e.pageY - 40 });
  //   });

  //   //open the definition popup clicking on the layer
  //   $("#definition_layer").mouseup(function (e) {
  //     // e.stopPropagation();
  //     // openPopup(lookup, translateDictionary);
  //   });
  // } else {
  //   $("#definition_layer").remove();
  // }
  
  alert(lookup);
}

function getSelectedText() {
  if (window.getSelection) return window.getSelection().toString();
  else if (document.getSelection) return document.getSelection();
  else if (document.selection) return document.selection.createRange().text;
  return "";
}
