/**
 * Created by halfthin on 2015/10/27.
 */
var path = require('path');

var appSettings = {
    prod: true,
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 8080,
    downloadFolder: 'download/',
    appName: 'zc-phone.apk'
};

module.exports = appSettings;