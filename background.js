
function handle_xhr_data(request) {
    function callback(settings) {
        let tag_string;
        if ('tag_string' in settings) {
            tag_string = settings['tag_string']
        } else {
            tag_string = 'chrome-ext';
        }
        let done = true;
        if ('api' in settings) {
            let data = {
                raw_response: request.message.response_data,
                raw_request: request.message.request_data,
                xhr_url: request.message.xhr_url,
                initiator: request.message.initiator,
                request_method: request.message.method,
                tag_string: tag_string
            };
            handle_post_request(data, settings);
            done = true;
        }
        if ('console' in settings) {
            console.group("Received Response Data:");
            console.info(JSON.parse(request.message.response_data));
            console.groupEnd();
            done = true;
        }
        if (!done) {
            console.warn("No output for xhr data")
        }
    }
    read_settings(callback);
}

function read_settings(callback) {
    const url = chrome.runtime.getURL('settings.json');
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            callback(data);
            return data
        });
}

function handle_post_request(data, settings) {
    let xhr = new XMLHttpRequest();
    xhr.onloadend = log_response;

    xhr.open("POST", settings['api']['url']);
    let auth = settings['api']['username'] + ":" + settings['api']['password'];
    auth = "Basic " + btoa(auth);
    xhr.setRequestHeader("Authorization", auth);
    xhr.setRequestHeader("credentials", 'include');
    xhr.setRequestHeader("Content-Type", "application/json");
    let stringified_data = JSON.stringify(data);
    xhr.send(stringified_data);
}

function log_response(e) {
    if (e.target.status !== 201) {
        console.group(e.type + " Status: "
            + e.target.status + ' ' + e.target.statusText);
        if (e.target.responseType === "") {
            console.debug(JSON.parse(e.target.response));
        } else {
            console.debug("Non-JSON response type: " + e.target.response)
        }
        console.groupEnd();
    } else {
        console.info(e.type + " Status: "
            + e.target.status + ' ' + e.target.statusText);
    }
}

chrome.runtime.onMessageExternal.addListener(
    function(request, _, __) {
        if (request.message.header === 'xhr_data') {
            handle_xhr_data(request);
        }
    }
);
