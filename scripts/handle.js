"use strict";

var _app = angular.module('app', []);
_app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
});

_app.controller('youtooController', ['$scope', '$http', function ($scope, $http) {
    var _api_key = "AIzaSyCDt2V-0SFK05MtdObZLf-xIm9h3yKKS0o";
    /*var _api_subscriptions = "https://www.googleapis.com/youtube/v3/subscriptions";*/
    var _api_channels      = "https://www.googleapis.com/youtube/v3/channels";
    var _api_playlistItems = "https://www.googleapis.com/youtube/v3/playlistItems";
    var _api_search        = "https://www.googleapis.com/youtube/v3/search";
    $scope.is_loading = false;
    $scope.is_show_guide = false;
    $scope.open_with = 1;

    chrome.storage.local.get('keyword', function (result) {
        $scope.keyword = result.keyword;
        $scope.submit();
    });

    $scope.show_guide = function() {
        $scope.is_show_guide = !$scope.is_show_guide;
    }

    $scope.submit = function() {
        if(!$scope.keyword) return;
        chrome.storage.local.set({'keyword': $scope.keyword});
        $scope.is_loading = true;
        $scope.is_error = false;
        $http({
            method : "GET",
            url : _api_search,
            withCredentials: true,
            params: {
                maxResults : "50",
                part: 'id,snippet',
                fields: 'items/id,items/snippet/title,items/snippet/description,items/snippet/thumbnails/default,items/snippet/channelTitle,nextPageToken',
                type: 'video',
                key : _api_key,
                q: $scope.keyword
            }
        }).then(function mySucces(res) {
            $scope.result_search = res.data.items;
            $scope.is_loading = false;
        }, function myError(res) {
            $scope.is_error = true;
            $scope.is_loading = false;
            $scope.error_message = res.data.error.message;
        });
    }

    function newWindow(url, w, h) {
        var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
        var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
        var left = ((width / 2) - (w / 2)) + dualScreenLeft;
        var top = ((height / 2) - (h / 2)) + dualScreenTop;
        var newWindow = window.open(url, '', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
        if (window.focus)
            newWindow.focus();
    }

    $scope.open = function(id) {
        if($scope.open_with === 1) {
            chrome.tabs.getSelected(function(tab) {
                chrome.tabs.executeScript(tab.id, {
                    file: "scripts/script.js"
                }, function() {
                    chrome.tabs.sendMessage(tab.id, id);
                });
            });
        } else {
            newWindow('https://www.youtube.com/embed/'+id, 360, 215);
        }

        /*chrome.tabs.executeScript(null, {
            file: "scripts/script.js"
        });*/
    }

    /*$http({
        method : "GET",
        url : "https://www.googleapis.com/youtube/v3/channels",
        withCredentials: true,
        params: {
            part : "contentDetails",
            id : _id_channel,
            key : _api_key
        }
    }).then(function mySucces(res) {
        $scope.is_error = false;
        angular.forEach(res.data.items, function(value, key) {
            var _id = value.contentDetails.relatedPlaylists.uploads;;
            $http({
                method : "GET",
                url : "https://www.googleapis.com/youtube/v3/playlistItems",
                withCredentials: true,
                params: {
                    part : "snippet",
                    maxResults : "10",
                    playlistId  : _id,
                    key : _api_key
                }
            }).then(function mySucces(res_child) {
                $scope.is_error = false;
                $scope.data = res_child.data.items;
            }, function myError(res_child) {
                $scope.is_error = true;
                $scope.error_message = res_child.data.error.message;
            });
        })
    }, function myError(res) {
        $scope.is_error = true;
        $scope.error_message = res.data.error.message;
    });*/

}]);