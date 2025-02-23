function initPopup() {

    browser.tabs.query({currentWindow: true}).then(tabs => {
        if (!tabs.length) return;

        var listTextArea = document.getElementById("list");
        for (var i = 0; i < tabs.length; ++i) {
            listTextArea.value += tabs[i].url + "\n";
        }

        if (location.search != "?focusHack") location.search = "?focusHack";
        listTextArea.select();
    });

    document.getElementById("openButton").addEventListener("click", openTextAreaList);
    document.getElementById("saveListe").addEventListener("click", saveLinksListe);
    document.getElementById("saveZeile").addEventListener("click", saveLinksZeile);

    // Korrigierte Event-Listener
    document.getElementById("filterQuobuzButton").addEventListener("click", function() {
        setFilter('qobuz');
        changeButtonColor(this);
    });
    document.getElementById("filterDeezerButton").addEventListener("click", function() {
        setFilter('deezer');
        changeButtonColor(this);
    });
    document.getElementById("filterNothingButton").addEventListener("click", function() {
        setFilter('nothing');
        changeButtonColor(this);
    });
}
function changeButtonColor(button) {
    // Entferne die "active" Klasse von allen Buttons
    document.getElementById("filterQuobuzButton").classList.remove("active");
    document.getElementById("filterDeezerButton").classList.remove("active");
    document.getElementById("filterNothingButton").classList.remove("active");

    // Füge die "active" Klasse zum geklickten Button hinzu
    button.classList.add("active");
}

function openTextAreaList() {
    var list = document.getElementById("list").value; // Lese die Liste aus der Textarea
    openList(list); // Liste mit aktuellem Filter laden
}

function saveLinksListe() {
    var list = document.getElementById("list").value; // Lese die Liste aus der Textarea
    saveList(list);
}

function saveLinksZeile() {
    var list = document.getElementById("list").value; // Lese die Liste aus der Textarea
    saveLine(list);
}

// Filter setzen und Liste neu laden
/*
function setFilter(option) {
    if (option = 'qobuz') {
        newfilter = qobus;
    }
    if (option = 'deezer') {
        newfilter = deezer;
    }
    if (option = 'nothing') {
        filterUrl( , 'nothing')
    }


}
*/
window.addEventListener("load", initPopup);
