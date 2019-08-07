console.log("Running injection");
var s = document.createElement('script');

s.src = chrome.runtime.getURL('content_scripts/monkey_patch.js');
s.onload = function() {
    this.remove();
};
root = document.head || document.documentElement
if (root.firstChild) {
    console.log("Inserting before first child");
    root.firstChild.insertBefore(s);
} else {
    console.log("No first child, appending");
    root.appendChild(s)
}
console.log("after injection");
console.log((document.head || document.documentElement).firstChild);
