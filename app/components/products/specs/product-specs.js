/**
 * Created by eduardo on 2/14/15.
 */
module.exports = (function () {
    var ret = {};
    
    ret.dir = function () {
          return {
            restrict: 'E',
            templateUrl: 'components/products/specs/product-specs.html'
          };
    }
    
    return ret;
})();