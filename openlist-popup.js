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
    document.getElementById("filterQobuzButton").addEventListener("click", function() {
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

    document.getElementById("subFilterAlbumButton").addEventListener("click", function() {
        setSubFilter('album');
        changeButtonColor2(this);
    });
    document.getElementById("subFilterArtistButton").addEventListener("click", function() {
        setSubFilter('artist');
        changeButtonColor2(this);
    });
    document.getElementById("subFilterNothingButton").addEventListener("click", function() {
        setSubFilter('subNothing');
        changeButtonColor2(this);
    });
}
function changeButtonColor(button) {
    // Entferne die "active" Klasse von allen Buttons
    document.getElementById("filterQobuzButton").classList.remove("active");
    document.getElementById("filterDeezerButton").classList.remove("active");
    document.getElementById("filterNothingButton").classList.remove("active");
    // Füge die "active" Klasse zum geklickten Button hinzu
    button.classList.add("active");
}
function changeButtonColor2(button) {
    document.getElementById("subFilterAlbumButton").classList.remove("active2");
    document.getElementById("subFilterArtistButton").classList.remove("active2");
    document.getElementById("subFilterNothingButton").classList.remove("active2");
    button.classList.add("active2");
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

window.addEventListener("load", initPopup);
