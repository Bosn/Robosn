var DATABASE_NAME = 'BosnAutoPlatformDB';
var CALLBACK_NAME = 'callback';
var ACTION_TYPE  = {
	FORWARD : 1,
	COMMENT : 2,
	POST : 3
};

var http = require('http');
var sys = require('sys');
var mysql = require('mysql');
var journey = require('journey');
var connection = createConnection();
connection.connect();

// initialize router
var router = new (journey.Router);
router.map(function () {
	this.root.bind(function (req, res) {
		res.send(200, {}, "Welcome");
	});

	this.get('/sendPost').bind(function(req, res, params) {
		connection.query('USE ' + DATABASE_NAME);
		doesPostExist(params.id, function(exists){
			if (exists) {
				console.log('post with id = ' + params.id + ' exists, ignored');
				res.send(200, {}, JSONP({isOk : false, msg :'post exists'}, params));
				return;
			}
			connection.query('INSERT INTO tb_post SET id = ?, user_id = ?, post_date = ?, content = ?',
				[params.id, params.userId, new Date(), params.content], function(err, rows, fields) {
				if (err) throw err;
				processNewPost(params, function(data) {
					res.send(200, {}, JSONP(data, params));
				});
			});
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

function JSONP(obj, params) {
	return params[CALLBACK_NAME] + '(' + JSON.stringify(obj) + ')';
}

function doesPostExist(id, cb) {
	connection.query('SELECT COUNT(*) AS c FROM tb_post WHERE id = ?', [id], function(err, rows, fields) {
		if (err) throw err;
		cb(rows[0].c - 0 > 0 ? true : false);
	});
}

function processNewPost(post, cb) {
	//console.log('processing new post:' + JSON.stringify(post));
	connection.query('SELECT * FROM tb_dictionary', function(err, rows, fields) {
		if (err) throw err;

		var wordsMap = [];
		var row;
		var i;

		// initialize word map
		for (i = 0; i < rows.length; i++) {
			row = rows[i];
			wordsMap.push({
				wordText : row.word_text,
				key : row.key,
				priority : row.priority
			});
		}
		//console.log('processing post:id=' + post.id + ', now wordsMap has ' + wordsMap.length + ' items.');
		var wordMapKey;
		var word;
		var matched = false;
		var matchedWord = null;
		var content = post.content.toLowerCase();

		console.log('judge content:' + content);
		for (wordMapKey in wordsMap) {
			word = wordsMap[wordMapKey];
			if (content.indexOf(word.wordText) != -1) {
				matchedWord = word;
				matched = true;
				break;
			}
		}

		if (!matched) {
			console.log('no matched key, returned');
			cb({isOk : false, msg : 'no matched key'});
		} else {
			connection.query('SELECT * FROM tb_res_src WHERE `key` = ?', 
				[matchedWord.key], function(err, rows, fields) {
				if (err) throw err;
				var actions = [];
				var action;
				var row;
				for (i = 0; i < rows.length; i++) {
					row = rows[i];
					actions.push({
						actionId : row.action_id,
						key : row.key,
						priority : row.priority,
						param1 : row.param1,
						param2 : row.param2,
						param3 : row.param3,
						wordText : matchedWord.wordText
					});
				}
				if (actions.length == 0) {
					cb({isOk : false, msg : 'no matched action with key=' + matchedKey});
				} else {
					// randomly select an action
					action = actions[parseInt(Math.random() * actions.length)];
					//console.log('action.length=' + actions.length);
					console.log('matched action returned:' + JSON.stringify(action));
					getCounter(action.key, function(count) {
						setCounter(action.key);
						action.param1 = action.param1.replace('{keyCounter}', count);
						action.param1 = action.param1.replace('{word}', action.wordText);
						cb({isOk : true, action : action});	
					});
				}
			});
		}
	});
}

function getCounter(key, cb) {
	connection.query('SELECT `count` FROM tb_counter WHERE `key` = ?', [+key], function (err, rows, fields) {
		if (err) throw err;
		cb(rows[0].count);
	});
}

function setCounter(key) {
	connection.query('UPDATE tb_counter SET `count` = `count` + 1 WHERE `key` = ?', [+key], function (err, rows, fields) {
		if (err) throw err;
	});
}

// initialize database
function createConnection() {
	return mysql.createConnection({
		host : '10.235.160.141',
		user : 'root',
		insecureAuth : 'true',
		password : '880622'
	});
}

function handleDisconnect() {
	connection.on('error', function(err) {
		if (!err.fatal) return;
		if (err.code !== 'PROTOCOL_CONNECTION_LOST') throw err;
		console.log('Re-connecting lost connection: ' + err.stack);
		connection = createConnection();
		handleDisconnect(connection);
		connection.connect();
	});
}

handleDisconnect();

console.log('Robosn is listening at http://127.0.0.1:1988/');
