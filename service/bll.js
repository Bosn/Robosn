var dao = require('./dao');
var CALLBACK_NAME = 'callback';
var ACTION_TYPE  = {
	FORWARD : 1,
	COMMENT : 2,
	POST : 3
};

function Business() {
	this._db = new dao.Connection();
}

Business.prototype.sendPost = function(post, cb) {
	var that = this;
	this._db.doesPostExist(post.id, function(exists){
		if (exists) {
			console.log('post with id = ' + post.id + ' exists, ignored');
			cb(JSONP({isOk : false, msg :'post exists'}, post));
		} else {
			that._db.addPost(post);
			processNewPost(post, function(data) {
				cb(JSONP(data, post));
			}, that);
		}
	});
};

Business.prototype.dispose = function() {
	this._db.close();
};

/**
 * process new post incoming
 *
 * @param {object}   post
 * @param {function} cb
 */
function processNewPost(post, cb, that) {
	var wordsMap = [];
	var row;
	var i;

	that._db.getWordList(function(rows) {

		// initialize word map
		for (i = 0; i < rows.length; i++) {
			row = rows[i];
			wordsMap.push({
				wordText : row.word_text,
				key : row.key,
				priority : row.priority
			});
		}

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
			cb({isOk : false, msg : 'no matched key'});
		} else {
			that._db.getActionList(matchedWord, function(rows) {
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
					cb({isOk : false, msg : 'no matched action with key=' + matchedWord.key});
				} else {
					// randomly select an action
					action = actions[parseInt(Math.random() * actions.length)];
					console.log('matched action returned:' + JSON.stringify(action));
					that._db.getCounter(action.key, function(count) {
						that._db.setCounter(action.key);
						action.param1 = action.param1.replace('{keyCounter}', count);
						action.param1 = action.param1.replace('{word}', action.wordText);
						cb({isOk : true, action : action});	
					});
				}
			});
		}
	});
}

function JSONP(obj, params) {
	return params[CALLBACK_NAME] + '(' + JSON.stringify(obj) + ')';
}

exports.Business = Business;
