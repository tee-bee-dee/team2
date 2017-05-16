var assert = require("assert"); 


// describe('Login Functionality', function() {
//   describe('#validateLogin()', function() {
//     it('Verifies that a login is valid before calling a function', function() {
//       var auth = require('../../lib/auth.js');

//       	assert.equal(auth.validateLogin(db,"test@email.com","1234",test), true);
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