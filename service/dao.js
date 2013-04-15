var DATABASE_NAME = 'BosnAutoPlatformDB';
var mysql = require('mysql');

function Connection() {
	this.init();
}

/**
 * get counter of key
 *
 * @param {number}   key
 * @param {function} cb
 */
Connection.prototype.getCounter = function(key, cb) {
	this._con.query('SELECT `count` FROM tb_counter WHERE `key` = ?', [+key], function (err, rows, fields) {
		if (err) throw err;
		cb(rows[0].count);
	});
}

/**
 * set counter of key
 *
 * @param {number} key
 */
Connection.prototype.setCounter = function(key) {
	this._con.query('UPDATE tb_counter SET `count` = `count` + 1 WHERE `key` = ?', [+key], function (err, rows, fields) {
		if (err) throw err;
	});
}

/**
 * get words list in dictionary
 */
Connection.prototype.getWordList = function(cb) {
	this._con.query('SELECT * FROM tb_dictionary', function(err, rows, fields) {
		if (err) throw err;
		cb(rows);
	});
};

/**
 *
 *
 */
Connection.prototype.getActionList = function(matchedWord, cb) {
	this._con.query('SELECT * FROM tb_res_src WHERE `key` = ?', 
		[matchedWord.key], function(err, rows, fields) {
		if (err) throw err;
		cb(rows);
	});
};

/**
 * does post id exists in database
 *
 * @param {number}   post id
 * @param {function} cb
 */
Connection.prototype.doesPostExist = function(id, cb) {
	this._con.query('SELECT COUNT(*) AS c FROM tb_post WHERE id = ?', [id], function(err, rows, fields) {
		if (err) throw err;
		cb(rows[0].c - 0 > 0 ? true : false);
	});
}


/**
 * add post
 * @param {object} params
 */
Connection.prototype.addPost = function(params) {
	this._con.query('INSERT INTO tb_post SET id = ?, user_id = ?, post_date = ?, content = ?',
		[params.id, params.userId, new Date(), params.content], function(err, rows, fields) {
		if (err) throw err;
	});
}

/**
 * initialization, must be invoked before any other functions invokation
 *
 */
Connection.prototype.init = function() {
	var that = this;
	this._con = mysql.createConnection({
		host : '10.235.160.141',
		user : 'root',
		insecureAuth : 'true',
		password : '880622'
	});

	this._con.on('error', function(err) {
		if (!err.fatal) return;
		if (err.code !== 'PROTOCOL_CONNECTION_LOST') {
			console.log('error event fired');
			throw err;
		}
		console.log('Re-connecting lost _con: ' + err.stack);
		that._con = createConnection();
		that._con.connect();
	});
	this._con.query('USE ' + DATABASE_NAME);
}

/**
 * close _con
 *
 */
Connection.prototype.close = function() {
	this._con.end();
	this._con = null;
};

exports.Connection = Connection;
