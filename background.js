
function handle_xhr_data(request) {
    chrome.storage.sync.get(null, function(options) {
        if (options.tag_string) {
            tag_string = options.tag_string
        } else {
            tag_string = 'chrome-ext'  // optional tags for server
        }
        data = {
            raw_response: request.message.response_data,
            raw_request: request.message.request_data,
            xhr_url: request.message.xhr_url,
            website_url: request.message.website_url,
            request_method: request.message.method,
            tag_string: tag_string
        }
        if (options.post_on) {
            handle_post_request(data, options);
        }
        if (options.file_on) {
            handle_save_to_file(data, options);
        }
        if (options.console_on) {
            handle_log_to_console(data)
        }
        if (options.element_on) {
            handle_insert_element(data)
        }
        if (no_outputs(options)) {
            console.log("No output settings selected")
        }
    })
}

function handle_post_request(data, options) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", options.api_url);
    auth = options.api_username + ":" + options.api_password
    auth = "Basic " + btoa(auth)
    xhr.setRequestHeader("Authorization", auth);
    xhr.setRequestHeader("credentials", 'include');
    xhr.setRequestHeader("Content-Type", "application/json");
    var stringified_data = JSON.stringify(data)

    xhr.onloadend = function() {
        console.group("Received Response: " + 
            xhr.status + ' ' + xhr.statusText)
        res = JSON.parse(xhr.response)
        console.debug(res);
        console.groupEnd();
    }
    console.group("Sending XHR Data");
    console.debug(data)
    console.groupEnd();
    var res = xhr.send(stringified_data);

}

function handle_log_to_console(data) {
    console.log("Logging to console not supported yet")
    return false
    console.group("Logging Data to Console")
    console.groupEnd()
}

function handle_save_to_file(data) {
    console.log("Saving to files is not supported yet")
    return false
    console.group("Save Data to File")
    console.groupEnd()
}

function handle_insert_element(data) {
    console.log("Insert element not supported yet")
    return false
    console.group("Insert Into Element")
    console.groupEnd()
}

function no_outputs(items) {
    if ((!items.element_on) &&
        (!items.console_on) &&
        (!items.file_on) &&
        (!items.post_on)) {
        console.debug("no outpots selected")
        return true
    }
    return false
}

chrome.runtime.onMessageExternal.addListener(
    function(request, sender, sendResponse) {
        if (request.message.header == 'xhr_data') {
            handle_xhr_data(request);
        }
    }
);
