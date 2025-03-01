String.prototype.trim = function() { return this.replace(/^\s+|\s+$/g, ''); }
let filterOption = 'nothing';
let subFilterOption = 'album';

function isProbablyUrl(string) {
	var substr = string.substring(0,4).toLowerCase();
	if (substr == 'ftp:' || substr == 'www.') return true;
	var substr = string.substring(0,5).toLowerCase();
	if (substr == 'http:') return true;
	var substr = string.substring(0,6).toLowerCase();
	if (substr == 'https:') return true;
	var substr = string.substring(0,7).toLowerCase();
	if (substr == 'chrome:') return true;
    if (string.includes('www.quobuz.com')) return true;
	return false;
}

function openList(list) {
	var strings = list.split(/\r\n|\r|\n/);
	for (var i=0; i<strings.length; i++) {
		// check empty
		strings[i] = strings[i].trim();
		if (strings[i] == '') continue;
		var url = strings[i];
		if (!isProbablyUrl(url)) {
			// if it looks like a URL we'll open it, otherwise we will do a Google search on it
			url = 'http://www.google.com/search?q=' + encodeURI(url);
		}
		//open the new tab
		browser.tabs.create({'url':url});
	}
}

function saveUrl(list, delimiter, filename) {
    var strings = list.split(/\r\n|\r|\n/);
    var validUrls = [];
    for (var i = 0; i < strings.length; i++) {
        strings[i] = strings[i].trim();
        if (strings[i] === '') continue;
        if (isProbablyUrl(strings[i])) {
            if (filterUrl(strings[i])) {
                if (subFilterUrl(strings[i])) {
                        validUrls.push(strings[i]);
                    }
            }
        }
    }
    const rawBlob = new Blob([validUrls.join(delimiter)], { type: 'text/plain' });
    const rawUrl = URL.createObjectURL(rawBlob);
    browser.downloads.download({
        url: rawUrl,
        filename: filename,
    });
}

function saveList(list) {
    saveUrl(list, '\n', 'links_raw.txt');
}

function saveLine(list) {
    saveUrl(list, ' ', 'links_single_line.txt');
}

function filterUrl(url) {
    // filterUrl ohne option-Parameter, da der globale filterOption verwendet wird
    if (filterOption === 'qobuz') {
        return url.includes('www.qobuz.com');
    } else if (filterOption === 'deezer') {
        return url.includes('deezer');
    } else if (filterOption === 'nothing' || filterOption === '') {
        return true;
    }
    return false;
}
function subFilterUrl(url) {
    // filterUrl ohne option-Parameter, da der globale filterOption verwendet wird
    if (subFilterOption === 'album') {
        return url.includes('album');
    } else if (subFilterOption === 'artist') {
        return url.includes('/interpreter/') || url.includes('/artist/');
    } else if (subFilterOption === 'subNothing' || subFilterOption === '') {
        return true;
    }
    return false;
}

function setFilter(option) {
    filterOption = option; // Setze die globale Filteroption
}
function setSubFilter(subOption) {
    subFilterOption =subOption
}