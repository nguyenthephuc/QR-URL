"use strict";

function loadScript() {
    if(typeof jQuery === undefined) {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = chrome.extension.getURL('scripts/jquery.js');
        document.head.appendChild(s);
    }

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel  = 'stylesheet';
    css.href = chrome.extension.getURL('css/iframe.css');
    document.head.appendChild(css);

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel  = 'stylesheet';
    css.href = chrome.extension.getURL('css/jquery-ui.min.css');
    document.head.appendChild(css);

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL('scripts/jquery-ui.min.js');
    document.head.appendChild(s);

    var div = document.createElement("div");
    div.id = "Youtoo-loaded";
    document.body.appendChild(div);
}

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if(document.getElementById('Youtoo-loaded') === null)
        loadScript();
    if(document.getElementById('Youtoo') !== null)
        document.getElementById('Youtoo').remove();

    var div = document.createElement('div');
    div.id = "Youtoo";
    div.className = "modal-Youtoo";
    var content = "<span class=\"close\" id=\"close-Youtoo\">&times;</span>";
    content += '<iframe width="360" height="215" src="https://www.youtube.com/embed/'+message+'?autoplay=1" allowfullscreen frameborder="0"></iframe>';
    div.innerHTML = content;
    document.body.appendChild(div);

    $( "#Youtoo" ).draggable();

    document.getElementById("close-Youtoo").addEventListener("click", function() {
        var $myDiv = $("#Youtoo");
        if($myDiv.closest("html").length)
            $myDiv.remove();
    });
});