
const ICONS = {};
let SPRITE_URL = false;
//Automatically extract the service names and sprite positions from https://console.aws.amazon.com/resource-groups
document.querySelectorAll('span.service-icon.service-icon-navbar.service-icon-size-med').forEach(item => {
    if (!item) return;
    const href = item.parentElement.parentElement.parentElement.getAttribute('data-service-href');
    if (!SPRITE_URL) {
        SPRITE_URL = getComputedStyle(item).backgroundImage.replace('url("', "").replace('")', '');
    }
    const awsServiceName = extractServiceName(href);
    ICONS[awsServiceName] = item.style.backgroundPosition.replace(/[^0-9 ]/g, '').split(' ').map(x => +x);
});

// Look for the string blocks right after the 'amazon.com/' (ec2/s3/iam/ses/etc...)

let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;

// Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
let captureGroupArray = Array.from(document.URL.matchAll(reg));
let awsServiceName = captureGroupArray[0][2];

// For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
if (awsServiceName === 'codesuite') {
    awsServiceName = captureGroupArray[0][3];
}


// We have found a match in the URL!
if (ICONS.hasOwnProperty(awsServiceName)) {
    setIcon(awsServiceName);
}


function setIcon(awsServiceName) {
    let position = ICONS[awsServiceName];
    document.querySelectorAll("link[rel*='icon']").forEach(item => {item.parentNode.removeChild(item)});
    var link = document.createElement('link');
    link.type = 'image/png';
    link.rel = 'shortcut icon';
    genIcon(position, function (dataUrl) {
        link.href = dataUrl;
        document.getElementsByTagName('head')[0].appendChild(link);
    });

}

function genIcon(position, cb) {
    let image = new Image();
    image.src = SPRITE_URL;

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


// The crop function
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
