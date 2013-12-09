var path = require('path'),
    easyimg = require('easyimage'),
    fs = require('fs');
var dir=__dirname + '/../public/images/uploaded/';
var targetPath = path.resolve(dir);
var allowedExt = 'jpg';
//var fpath='http://localhost:9090/uploaded/';
var fpath='images/uploaded/';
var list = [];

/*
 * GET a JSON with a dirlisting in reverse order.
 */
exports.index = function(req, res) {
    list.length = 0;
    console.log('Reading dir [' + dir + ']');

    //first read the directory and sort on modification time
    // see: http://stackoverflow.com/questions/10559685/using-node-js-how-do-you-get-a-list-of-files-in-chronological-order
    var files = fs.readdirSync(dir)
          .map(function(v) { 
              return { name:v,
                       time:fs.statSync(dir + v).mtime.getTime()
                     }; 
           })
           .sort(function(a, b) { return b.time - a.time; }) //reversed a.time - b.time
           .map(function(v) { return v.name; });
    //console.log('The resulting files-list', files);
    files.forEach(function(file){
        if (path.extname(file).toLowerCase() === '.' + allowedExt) {
            //console.log('Pushing', fpath+file);
            list.push({'path':fpath+file, 'thpath':fpath+'thumbs/thumb_'+file, name: file.slice(0, -4)});
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(list));
};

/*
 * POST an uploaded image to the server and save and create that thumb_* to thumb directory
 */
exports.save = function(req, res){
    if (req.files){
        var tempPath = req.files.files.path;
    } else {
        res.send('No file posted. Exiting.');
        return;
    }
    if (path.extname(req.files.files.name).toLowerCase() === '.' + allowedExt) {
        //console.log("writing to ", targetPath + '/' + req.files.files.name);
        fs.rename(tempPath, targetPath + '/' + req.files.files.name, function(err) {
            console.log("err", err);
            // if (err) throw err;
            console.log("Upload completed!");
            easyimg.resize({src:targetPath + '/' + req.files.files.name, dst:targetPath + '/thumbs/thumb_' + req.files.files.name, width:145, height:145}, function(err, stdout, stderr) {
              //if (err) throw err;
              console.log('Resized to 145x145 in: ' + targetPath + '/thumbs/thumb_' + req.files.files.name);
            });
        res.send('');
        });
    } else {
        fs.unlink(tempPath, function () {
            // if (err) throw err;
            console.error('Only .' + allowedExt + ' files are allowed!');
        });
        res.send('Only .' + allowedExt + ' files are allowed!');
    }

    // res.render('index', { title: 'Express' });
};

/*
 * GET a method to remove a file
 */
exports.destroy = function(req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end('[{"status":"success"}]');
};

/*
 * POST a method to remove a file
 */
exports.remove = function(req, res){
    res.send('remove');
    console.log("remove", req.body.fileNames);
    fs.unlink(targetPath + '/' + req.body.fileNames, function (err) {
        // if (err) throw err;
        console.log("err", err);
        console.error("Remove ready...");
    });
    res.send('');
};
