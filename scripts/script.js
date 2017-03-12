"use strict";

function loadScript() {
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL('scripts/jquery.js');
    document.head.appendChild(s);

    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = chrome.extension.getURL('scripts/jquery-ui.min.js');
    document.head.appendChild(s);

    var css = document.createElement("link");
    css.type = "text/css";
    css.rel  = 'stylesheet';
    css.href = chrome.extension.getURL('css/jquery-ui.min.css');
    document.head.appendChild(css);

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
    var content = "<style>#Youtoo{cursor: -webkit-grabbing;width:360px;height:210px;background-image:url("+chrome.extension.getURL('img/bg.jpg')+");z-index:1000;position:fixed;top:30%;left:35%;border-radius:2px;padding:25px 0 0}</style>"
    content += '<iframe width="360" height="215" src="https://www.youtube.com/embed/'+message+'" frameborder="0"></iframe>';
    div.innerHTML = content;
    document.body.appendChild(div);

    $( "#Youtoo" ).draggable();

    document.getElementById("Youtoo").addEventListener("dblclick", function() {
        var $myDiv = $("#Youtoo");
        if($myDiv.closest("html").length)
            $myDiv.remove();
    });
});