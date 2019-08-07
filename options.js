var required_fields = [
    'api_url', 'api_username', 'api_password', 'file_path',
    'file_on', 'post_on', 'console_on', 'element_on', 'tag',
]

// Saves options to chrome.storage
function save_options() {
    var storage_data = {};
    for (i = 0; i < required_fields.length; i++) {
        var field = required_fields[i]
        var elem = document.getElementById(field)
        if (elem.type === 'checkbox') {
            value = elem.checked;
        } else {
            value = elem.value;
        }
        if (!value) {
            value = '';
        }
        storage_data[field] = value
    }
    chrome.storage.sync.set(
        storage_data,
        function() {
            // Update status to let user know options were saved.
            var status = document.getElementById('status');
            status.textContent = 'Options saved.';
            setTimeout(function() {
                status.textContent = '';
            }, 750);
        }
    );
};

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    var storage_ask = {}
    for (i = 0; i < required_fields.length; i++) {
        var field = required_fields[i]
        storage_ask[field] = false
    }
    chrome.storage.sync.get(storage_ask, function(items) {
        for (i = 0; i < required_fields.length; i++) {
            var field = required_fields[i]
            value = items[field]
            if (!value) {
                continue;
            }
            var elem = document.getElementById(field)
            if (elem.type === 'checkbox') {
                elem.checked = value;
            } else {
                elem.value = value;
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
