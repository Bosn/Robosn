var http = require('http');
var journey = require('journey');
var bll = require('./service/bll');

// initialize router
var router = new (journey.Router);
router.map(function () {
    this.root.bind(function (req, res) {
        res.send(200, {}, "Robosn powered by Node.js");
    });

    /**
     * receive post data from front end
     * return back action commands
     *
     */
    this.get('/sendPost').bind(function(req, res, params) {
        var biz = new bll.Business();
        biz.sendPost(params, function(data){
            biz.dispose();
            res.send(200, {}, data);
        });
    });
});

require('http').createServer(function (request, response) {
    var body = "";
    request.addListener('data', function (chunk) { body += chunk });
    request.addListener('end', function () {
        router.handle(request, body, function (result) {
            result.headers['Content-Type'] = 'application/x-javascript';
            response.writeHead(result.status, result.headers);
            response.end(result.body);
        });
    });
}).listen(1988);

console.log('Robosn is listening at http://127.0.0.1:1988/');
