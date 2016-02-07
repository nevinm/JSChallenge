app.value('version', '0.1');
app.service('percentageValues',['_' , function(_) {
    this.returnValues = function(array, target) {
        var off = target - _.reduce(array, function(acc, x) {
            return acc + Math.round(x)
        }, 0);
        return _.chain(array).
        // sortBy(function(x) {
        //     return Math.round(x) - x
        // }).
        map(function(x, i) {
            return Math.round(x) + (off > i) - (i >= (array.length + off))
        }).
        value();
    }
}]);
