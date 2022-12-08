function setupDoubleClick(areaClass, maxAllowedWords) {
  //shows the definition layer
  var showLayer = function (e) {
    e.preventDefault();
    var lookup = getSelectedText();
    lookup = lookup.replace(/[\.\*\?;!()\+,\[:\]<>^_`\[\]{}~\\\/\"\'=]/g, " ");
    lookup = lookup.replace(/\s+/g, " ");
    if (lookup != null && lookup.replace("/s/g", "").length > 0) {
      //disable the double-click feature if the lookup string
      //exceeds the maximum number of allowable words
      if (maxAllowedWords && lookup.split(/[ -]/).length > maxAllowedWords)
        return;

      //append the layer to the DOM only once
      if ($("#definition_layer").length == 0) {
        // var imageUrl = websiteUrl + "external/images/doubleclick/definition-layer.gif";
        $("body").append(
          "<div id='definition_layer' style='position:absolute; cursor:pointer;'><img src='/img/definition-layer.gif' alt='' title=''/></div>"
        );
      }

      //move the layer at the cursor position
      $("#definition_layer").map(function () {
        $(this).css({ left: e.pageX - 30, top: e.pageY - 40 });
      });

      //open the definition popup clicking on the layer
      $("#definition_layer").mouseup(function (e) {
        e.stopPropagation();

        api(lookup);
        // openPopup(lookup, translateDictionary);
      });
    } else {
      $("#definition_layer").remove();
    }
  };

  var api = function (lookup) {
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + lookup)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        result.innerHTML = `
            <div class="word">
                    <h3>${lookup}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
      })
      .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
      });
  };

  var area = areaClass ? "." + areaClass : "body";
  $(area).mouseup(showLayer);
  
  
}

/*
 * Cross-browser function to get selected text
 */
function getSelectedText() {
  if (window.getSelection) return window.getSelection().toString();
  else if (document.getSelection) return document.getSelection();
  else if (document.selection) return document.selection.createRange().text;
  return "";
}


