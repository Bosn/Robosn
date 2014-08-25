var tmpl = ['嘿嘿', '哈哈', '[晕]', '[左太极]', '[右太极]', '[飞吻]', '在干吗？', '忙啥呢', '我想你'];
setInterval(function() {
	$('#textInput').val(tmpl[Math.floor(tmpl.length * Math.random())]);
	$('.chatSend')[0].click();
}, Math.round(Math.random() * 100000));
