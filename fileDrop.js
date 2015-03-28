function catchKeyPress(fileName) {
    var keyDownFunc = function(e) {
        /*Down key*/
        if (e.keyCode == 40) {
            console.log("I am " + fileName);
        }
    };
    $(document).keydown(keyDownFunc);
}

function loadHandler(fileName) {
    return function(e) {
        catchKeyPress(fileName);
    };
}

var errorHandler = function(e) {
    window.console.log('Error:' + e.target.error.code);
};

function loadFile(file) {
    var fileName = file.name;
    var reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onload = loadHandler(fileName);
    reader.readAsArrayBuffer(file);
}

function handleFileDrag(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function handleFileDrop(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    loadFile(files[0]);
}

function initializeDragDrop() {
    var dropZone = document.getElementById('main');
    dropZone.addEventListener('dragover', handleFileDrag, false);
    dropZone.addEventListener('drop', handleFileDrop, false);
}
