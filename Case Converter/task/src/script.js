/****************
 * Get DOM handlers
 */
let textArea = document.getElementById('input');
let btnUpperCase = document.getElementById('upper-case');
let btnLowerCase = document.getElementById('lower-case');
let btnProperCase = document.getElementById('proper-case');
let btnSentenceCase = document.getElementById('sentence-case');
let btnSave = document.getElementById('save-text-file');

// DOM listener events
btnUpperCase.addEventListener("click", function toUpperCase() {
    textArea.value = textArea.value.toUpperCase();
});

btnLowerCase.addEventListener("click", function toLowerCase() {
    textArea.value = textArea.value.toLowerCase();
});

btnProperCase.addEventListener(("click"), function toProperCase() {
    let str = textArea.value.split(' ');
    let arrStr = trimStr(str);
    textArea.value = arrStr.map(item =>
        item[0].toUpperCase() + item.substr(1).toLowerCase()).join(' ');
});

btnSentenceCase.addEventListener(("click"), function toSentenceCase() {
    let str = textArea.value.split('.');
    if (str[str.length - 1] === "") {
        str.pop();
    }
    let arrStr = trimStr(str);
    arrStr = arrStr.map(item =>
        item[0].toUpperCase() + item.substr(1).toLowerCase()).join('. ');
    textArea.value = arrStr + ".";
});

function trimStr(fixedStr) {
    let arrStr = [];
    fixedStr.forEach(ele => arrStr.push(ele.trim()));
    return arrStr;
}


function saveTextAsFile() {
    let textFileAsBlob = new Blob([textArea.value], {type:'text/plain'});
    let downloadLink = document.createElement("a");
    downloadLink.download = "text.txt";
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }
    downloadLink.click();
}
btnSave.onclick = saveTextAsFile;