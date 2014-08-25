var tmpl = ['嘿嘿', '哈哈', '[晕]', '[左太极]', 
	'[右太极]', '[飞吻]', '在干吗？', '忙啥呢', '我想你'];
var ev = document.createEvent('HTMLEvents');
var btn = $('.chatSend')[0];
ev.initEvent('click', true, true);
var timer = 1;

setInterval(function() {
	$('#textInput').val(tmpl[Math.floor(tmpl.length * Math.random())]);
	btn.click();
	timer++;
}, Math.round(Math.random() * 100000));
