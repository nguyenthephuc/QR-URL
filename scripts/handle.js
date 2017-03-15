"use strict";

var _app = angular.module('app', []);
_app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});

_app.controller('youtooController', ['$scope', function ($scope) {
    var API = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=";

    function response(e) {
       var urlCreator = window.URL || window.webkitURL;
       var imageUrl = urlCreator.createObjectURL(this.response);
       document.querySelector("#QR-IMAGE").src = imageUrl;
    }

    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", API + tabs[0].url);
        xhr.responseType = "blob";
        xhr.onload = response;
        xhr.send();
    });
}]);