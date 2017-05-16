var assert = require("assert"); 


// describe('Authentication', function() {
//   describe('#decodeAuthString()', function() {
//     it('Decodes Authentication String', function() {
//       var auth = require('../../routes/api/auth/index.js');
//       	assert.equal(auth.decodeAuthString("a"), false);
//       	assert.equal(auth.decodeAuthString("test@gmail.com:password"), {email: "test@gmail.com",password: "password"});
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