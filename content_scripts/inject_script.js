let s1 = document.createElement('script');
s1.src = chrome.runtime.getURL('content_scripts/monkey_patch.js');
elem = (document.head || document.documentElement).appendChild(s1);
console.log("Added Scripts");
