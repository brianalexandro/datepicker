angular.module('ngApp').filter('cleanHTML', function() {
    return function(value) {
    	return value.replace(/\t/g, '').replace(/\n/g, '');
    };
});