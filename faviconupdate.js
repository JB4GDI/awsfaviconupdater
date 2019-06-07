const {icons, spriteUrl} = populateIcons();
const awsServiceName = extractServiceName(document.URL);
console.log(awsServiceName, icons, spriteUrl);
// We have found a match in the URL!
if (icons.hasOwnProperty(awsServiceName)) {
    setIcon(awsServiceName);
}

/**
 * Removes all the current favicons then loads the new favicon and sets it.
 **/
function setIcon(awsServiceName) {
    let position = icons[awsServiceName];
    document.querySelectorAll("link[rel*='icon']").forEach(item => {
        item.parentNode.removeChild(item)
    });
    var link = document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    generateIcon(position, function (dataUrl) {
        link.href = dataUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    });

}

/**
 * Generates the icon from the sprite file based on the position from the ICONS array.
 **/
function generateIcon(position, cb) {

    let image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = spriteUrl;
    let canvas = document.createElement('canvas');
    image.onload = function () {
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.getContext('2d').drawImage(this, 0, 0);
        // set a little timeout before calling our cropping thing
        setTimeout(function () {
            crop(canvas, position[0], position[1], 20, 20, cb)
        }, 1500);
    };
}


/**
 * Crops the canvas of the sprite to the favicon position and returns a base64 encoded image
 **/
function crop(canvas, offsetX, offsetY, width, height, callback) {
    // create an in-memory canvas
    var buffer = document.createElement('canvas');
    var b_ctx = buffer.getContext('2d');
    // set its width/height to the required ones
    buffer.width = width;
    buffer.height = height;
    // draw the main canvas on our buffer one
    // drawImage(source, source_X, source_Y, source_Width, source_Height,
    //  dest_X, dest_Y, dest_Width, dest_Height)
    b_ctx.drawImage(canvas, offsetX, offsetY, width, height,
        0, 0, buffer.width, buffer.height);
    // now call the callback with the dataURL of our buffer canvas
    callback(buffer.toDataURL());
}

/**
 * Extracts the service name from the url
 **/
function extractServiceName(url) {
    let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;

    // Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
    let captureGroupArray = Array.from(url.matchAll(reg));

    if (!captureGroupArray || !captureGroupArray.length || captureGroupArray[0].length < 3) return;
    let awsServiceName = captureGroupArray[0][2];

    // For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
    if (awsServiceName === 'codesuite') {
        awsServiceName = captureGroupArray[0][3];
    }
    return awsServiceName;
}

/**
 * Fetches all of the available services and icon positions
 * Also sets the latest sprite image url
 */
function populateIcons() {
    const icons = {};
    let spriteUrl = '';
    //Automatically extract the service names and sprite positions from https://console.aws.amazon.com/resource-groups
    document.querySelectorAll('span.service-icon.service-icon-navbar.service-icon-size-med').forEach(item => {
        if (!item) return;
        const href = item.parentElement.parentElement.parentElement.getAttribute('data-service-href');
        if (!spriteUrl) {
            spriteUrl = 'https://api.codetabs.com/v1/proxy?quest=' + getComputedStyle(item).backgroundImage.replace('url("', "").replace('")', '');
        }
        const awsServiceName = extractServiceName(href);
        icons[awsServiceName] = item.style.backgroundPosition.replace(/[^0-9 ]/g, '').split(' ').map(x => +x);
    });
    return {icons, spriteUrl};
}
