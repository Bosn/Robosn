!function(undefined) {
	'use strict';
	var HACK_NAME = ['貘吃馍香', '大城小胖', 'Rayi-', '寒冬winter', '_Franky', 
		'不如归零', '三水清', '紫云妃', '姜太文', '王巖']; 
	var SEC = 1;                                // prevent flush time interval
	var INTERVAL = 10;                          // monitor time interval
	var SERVER_ROOT = 'http://localhost:1988/'; // server root
	
	var _processedMidList = [];
	var ev = document.createEvent('HTMLEvents');
	ev.initEvent('click', true, true);
	var lastTime = new Date();
	lastTime.setTime(new Date().getTime() - 1000 * SEC * 2);

	setInterval(function() {
		console.log('tick' + new Date().getTime());
		var eleUpdate = $('[node-type=feed_list_newBar]')[0];
		eleUpdate && eleUpdate.dispatchEvent(ev);

		var i, j, k = 0;
		var toBeProcessed = $('[action-type="feed_list_forward"]');
		var keyMap
		for (i = 0; i < toBeProcessed.length; i++) {
			var ele = toBeProcessed[i];
			var data = ele.getAttribute('action-data');
			var map = {};
			var arr = data.split('&');
			for (j = 0; j < arr.length; j++) {
				var item = arr[j].split('=');
				var key = item[0];
				var val = item[1];
				if (key && val) {
					map[key] = val;
				}
			}

			if (isProcessed(map)) {
				continue;
			}
			_processedMidList.push(map.mid);
			
			if (true) {
			//if (exists(HACK_NAME, map.name)) {
				console.log('new post of ' + map.name + ' found!');
				// don't process forward post
				if (map.rootuid) {
					console.log('found rootuid, so this is a forward post, ignored, rootid=' + map.rootuid);
					continue;
				}

				console.log('found it! mid=' + map.mid + ', ' + new Date());
				var content = $(ele).parent().parent().parent().find('.WB_text').html();
				map.content = content;

				// closure for binding ele
				!function(el) {
					sendPostToServer(map, function(data) {
						if (data.isOk) {
							process(el, data.action); 
						}
					});
				}(ele);
			}

		}
	}, 1000 * INTERVAL);


	function isProcessed(map) {
		for (var i = 0; i < _processedMidList.length; i++)
			if (_processedMidList[i] - 0 == map.mid - 0)
				return true;
		return false;
	}

	function process(ele, action) {
		console.log('do action: ' + JSON.stringify(action));
		// flush prevent
		//if (new Date().getTime() - lastTime.getTime() < 1000 * SEC)
			//return;

		// forward
		if (action.actionId == 1) {
			ele.dispatchEvent(ev);
			$('textarea.W_input')[0].value = action.param1;

			// comment to forward post
			//var ctl1 = $('[node-type="forwardInput"]');
			// ctl1 && ctl1[0] && (ctl1[0].checked = true);

			// comment to original post
			var ctl2 = $('[node-type="originInput"]');
			ctl2 && ctl2[0] && (ctl2[0].checked = true);
			$('[node-type="submit"]')[0].dispatchEvent(ev);
		} else if (action.actionId == 2) {

		} else if (action.actionId == 3) {

		}
		lastTime = new Date();
	}

	function stripHtml(html) {
		html = html  || "";
		var scriptregex = "<scr" + "ipt[^>.]*>[sS]*?</sc" + "ript>";
		var scripts = new RegExp(scriptregex, "gim");
		html = html.replace(scripts, " ");

		//Stripts the <style> tags from the html
		var styleregex = "<style[^>.]*>[sS]*?</style>";
		var styles = new RegExp(styleregex , "gim");
		html = html.replace(styles, " ");

		//Strips the HTML tags from the html
		var objRegExp = new RegExp("<(.| )+?>", "gim");
		var  strOutput = html.replace(objRegExp, " ");

		//Replace all < and > with &lt; and &gt;
		strOutput = strOutput.replace(/</, "&lt;");
		strOutput = strOutput.replace(/>/, "&gt;");

		objRegExp = null;
		return strOutput;
	}

	function sendPostToServer(map, cb) {
		$.ajax({
			url : SERVER_ROOT + 'sendPost',
			dataType : 'jsonp',
			data : {
				'userId' : map.uid,
				'id' : map.mid,
				'content' : stripHtml(map.content),
				'r' : new Date().getTime()
			},
			jsonp : 'callback',
			success : function(data) {
				cb(data);
			}
		});
	}

	function exists(arr, item) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == item) {
				return true;
			}
		}
		return false;
	}
	console.log('monitor started...');

	// for debug
	window.exports = {};
	exports._processedMidList = _processedMidList;
	exports.stripHtml = stripHtml;
}();
