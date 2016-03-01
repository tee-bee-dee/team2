'use strict';

function initializePage() {
	$("button.sign1Btn").click(sign1Click);
	$("button.sign2Btn").click(sign2Click);
	$("button.buyBtn").click(buyClick);
}

function sign1Click(e) {
	console.log("Sign up 1 pushed.");
	ga("send", "event", "sign1", "click");
}

function sign2Click(e) {
	console.log("Sign up 2 pushed.");
	ga("send", "event", "sign2", "click");
}

function buyClick(e) {
	console.log("Buy now pushed.");
	ga("send", "event", "buy", "click");
}

(function(w,d,s,g,js,fs){
  g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
  js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
  js.src='https://apis.google.com/js/platform.js';
  fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
}(window,document,'script'));