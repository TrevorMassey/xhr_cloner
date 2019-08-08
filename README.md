# XHR Cloner

This is a chrome extension which can be used to clone XHR calls from many websites and dump it into a file, into the console, or re-send them through another HTTP request to a server of the users choice.

## Getting Started

Because of limitations in how Chrome extensions work, packaging this would limit the websites it could be used for. I have only used it as an unpacked extension while in Dev mode.

To use it, do the following:
- Clone or download this repository to a folder of your choice
- Open manifest.json and add the domain you want to clone XHRs from under the 'externally_connectable' heading.
- Navigate to 'chrome://extensions'
- Activate Developer mode by clicking the switch in the top right corner
- Load the unpacked extension by clicking the 'Load Unpacked' button, and selecting the directory you cloned this repository into
- Check what the extension ID is (it'll be different on every system) and copy it
- Open up 'content_scripts/monkey_patch.js' and paste the extension ID into the extension_id variable at the top of the script
- Navigate back to 'chrome://extensions' and reload the extension by clicking the swirly arrow button

It should now work.

### Options

You can right click on the icon that appears in the toolbar and select options to open up the options screen. From here you can select what you want to do with the cloned data and provide a filename or api directions to send it to.

### Prerequisites

Chrome

## Deployment

If you only want to use this with specific websites, I suppose you could package it up after modifying the manifest.json. Though I have not done this myself since for me the primary purpose of this is debugging and investigating how websites work.

## Acknowledgments

Similar scripts to this can be found throughout stackoverflow and medium. This project is the result of cobbling together several of them. While I do not recall the exact sources of this advice, I want to acknowledge that others were helpful in it's creation.
<div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
