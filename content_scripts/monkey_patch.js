const extension_id = "gohmipkdcakpgihdmpamceajacedjnbh";

(function() {
    console.log("Monkey Patch is Running");
    let XHR = window.XMLHttpRequest.prototype;
    let open = XHR.open;
    let send = XHR.send;

    XHR.open = function(method, url) {
        this._method = method;
        this._url = url;
        return open.apply(this, arguments);
    };

    XHR.send = function(postData) {
        this.addEventListener("load", function(event) {
            console.group('XHR Load:');
            console.log(event);
            let message_data = {
                header: 'xhr_data',
                initiator: window.location.href,
                xhr_url: this._url,
                method: this._method,
                response_data: this.responseText,
                request_data: postData
            };
            chrome.runtime.sendMessage(
                extension_id, {message: message_data}
            );
            console.log("XHR Cloned");
        });
        return send.apply(this, arguments);
    };
})();
