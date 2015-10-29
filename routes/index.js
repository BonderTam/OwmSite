var express = require('express');
var router = express.Router();
var siteConfig = require('../configs/siteConfig');
var path = require('path');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('home', {title: '众成电话本'});

});

router.get('/app.apk', function (req, res) {
    var fileName = path.join(siteConfig.path, siteConfig.downloadFolder, siteConfig.appName);
    //console.log(fileName);

    var fileState = fs.statSync(fileName);

    res.writeHead(200, {
        'Content-Type': 'application/vnd.android.package-archive',
        'Content-Length': fileState.size,
        'content-disposition': 'attachment;filename=" ' + siteConfig.appName + '"'
    });

    var readStream = fs.createReadStream(fileName);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(res);

});

module.exports = router;
