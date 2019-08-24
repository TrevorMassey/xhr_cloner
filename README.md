# XHR Cloner

This is a chrome extension which can be used to clone XHR calls from many websites and dump it into a file, into the console, or re-send them through another HTTP request to a server of the users choice. This is useful for situations where you don't have time to figure out a new API but still need to grab a bunch of JSON data for a prototype.

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

### Settings

You can create a settings.json file to configure what to do with the xhr data once you have it. See sample_settings.json as an example.

### Prerequisites

Chrome

## Deployment

If you only want to use this with specific websites, I suppose you could package it up after modifying the manifest.json. Though I have not done this myself since for me the primary purpose of this is debugging and investigating how websites work.

## Limitations

It works by inserting a monkey patch before the page loads. This monkey patch overrides prototype methods for the built-in XMLHttpRequest objects. Any website which uses these default tools to make HTTP Requests should be clone-able with this extension. It does not work on certain websites (such as Facebook) which either use a different method of making HTTP Requests, or do some other javascript magic I haven't figured out yet.

Please contact me if you have ideas for how to make it work for more websites.

## Acknowledgments

Similar scripts to this can be found throughout stackoverflow and medium. This project is the result of cobbling together several of them. While I do not recall the exact sources of this advice, I want to acknowledge that others were helpful in it's creation.
<div>Icons made by <a href="https://www.flaticon.com/authors/wanicon" title="wanicon">wanicon</a> from <a href="https://www.flaticon.com/"                 title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/"                 title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
