var extension_id = "gohmipkdcakpgihdmpamceajacedjnbh";

(function() {
    console.log("Monkey Patch is Running");
    var XHR = window.XMLHttpRequest.prototype;
    var open = XHR.open;
    var send = XHR.send;

    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function(postData) {
        this.addEventListener("load", function() {
            var message_data = {
                header: 'xhr_data',
                website_url: window.location.href,
                xhr_url: this._url,
                method: this._method,
                response_data: this.responseText,
                request_data: postData
            }
            chrome.runtime.sendMessage(
                extension_id, {
                    message: message_data
                }
            );
            console.log("XHR Cloned");
        });
        return send.apply(this, arguments);
    };
})();
