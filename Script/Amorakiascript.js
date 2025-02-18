
//Search feld Sichbar unsichtbar 
document.getElementById("first_search_icon").addEventListener("click", function(){
    this.style.display = "none";
    document.getElementById("search_feld").style.display = "block";
  });
  document.getElementById("Second_Search_Icon").addEventListener("click", function(){
    document.getElementById("search_feld").style.display = "none";
    document.getElementById("first_search_icon").style.display = "block";
  });
// Search funktion durchführen
  // const taster=getElementById('erste_Button_Dattes');
  // taster.addEventListener('click',OpenFormular);
  document.getElementById('Second_Search_Icon').addEventListener('click', function() {
    const searchTerm = document.querySelector('#search_feld input').value.trim(); // Suchbegriff aus dem Eingabefeld holen
    if (searchTerm === "") {
      alert("Bitte geben Sie ein Suchwort ein.");
      return;
    }
  
    const content = document.getElementById('Paragaraph_Ein'); // Der Bereich, in dem gesucht wird
    const text = content.innerText || content.textContent; // Textinhalt des Bereichs
    const searchIndex = text.indexOf(searchTerm); // Position des Suchbegriffs im Text
  
    if (searchIndex === -1) {
      alert('Das Wort "' + searchTerm + '" wurde nicht gefunden.');
    } else {
      // Erstelle einen Range-Objekt, um die Position des Wortes zu finden
      const range = document.createRange();
      const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
  
      let node;
      let startIndex = 0;
      let found = false;
  
      // Durchlaufe alle Textknoten im content-Bereich
      while ((node = treeWalker.nextNode())) {
        const nodeText = node.nodeValue;
        const nodeLength = nodeText.length;
  
        // Prüfe, ob der Suchbegriff in diesem Textknoten vorkommt
        if (searchIndex >= startIndex && searchIndex < startIndex + nodeLength) {
          const offset = searchIndex - startIndex;
          range.setStart(node, offset);
          range.setEnd(node, offset + searchTerm.length);
          found = true;
          break;
        }
        startIndex += nodeLength;
      }
  
      if (found) {
        // Springe zur gefundenen Stelle
        const rect = range.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.top - window.innerHeight / 2, // Zentriere das Wort im Fenster
          behavior: 'smooth' // Sanftes Scrollen
        });
  
        // Optional: Markiere das Wort kurzzeitig
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
  
        // Entferne die Markierung nach kurzer Zeit
        setTimeout(() => {
          selection.removeAllRanges();
        }, 1000); // Markierung nach 1 Sekunde entfernen
      }
    }
  });
  // function OpenFormular(event){
  //   event.target.getElementById('Formular').style.display='block';
  // }

