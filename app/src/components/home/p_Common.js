


import React from 'react'
import $ from 'jquery'

var obj = {
    // 服务器接口
    baseUrl: 'http://10.3.136.73:88',
    loading: $('<div/>'),

    //urlObj =>urlStr
    urlDecode(_url, _params) {
        _url += (_url.indexOf("?") != -1) ? "" : "?";
        for (var k in _params) {
            _url += ((_url.indexOf("=") != -1) ? "&" : "") + k + "=" + encodeURI(_params[k]);
        }
        return _url;
    },

    //loading
    loadingStart() {
        this.loading.addClass('loading').appendTo($(document.body));
    },

    loadingEnd() {
        this.loading.removeClass('loading').remove();
    },

    //打乱数组
    shuffle(_array){
        var m = _array.length,
            t, i;
        while (m) {
            i = Math.floor(Math.random() * m--);
            t = _array[m];
            _array[m] = _array[i];
            _array[i] = t;
        }
        return _array;
    },

}

export default obj;

