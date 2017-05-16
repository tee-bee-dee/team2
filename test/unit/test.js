var assert = require("assert"); 

// describe('SMS Send Text', function() {
//   describe('#sendText()', function() {
//     it('Send A Text Message', function() {
//       var auth = require('../../lib/sms.js');
//       	assert.equal(auth.sendText("8155555555","This is a test.",function(){return 0;}), false);
//     	});
// 	});
// });


describe('rgb object to CSS ', function() {
  describe('#rgbObjectToCSS()', function() {
    it('Convert passed in object to CSS', function() {
      var style = require('../../lib/style.js');
      var obj = {r:100,g:200,b:25,a:1}
      	assert.equal(style.rgbObjectToCSS(obj),'rgba(100,200,25,1)');
    	});
	});
});