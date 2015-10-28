/**
 * Created by halfthin on 2015/10/27.
 */
var path = require('path');

var appSettings = {
    prod: false,
    path: path.normalize(path.join(__dirname, '..')),
    port: process.env.NODE_PORT || 3310,
    downloadFolder: 'download/',
    appName: 'app-debug.apk'
};

module.exports = appSettings;