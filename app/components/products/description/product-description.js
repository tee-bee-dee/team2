/**
 * Created by eduardo on 2/14/15.
 */
module.exports = (function () {
    var ret = {};
    
    ret.dir = function () {
      return {
        restrict: 'E',
        templateUrl: 'components/products/description/product-description.html'
      };
    }
    
    return ret;
})();