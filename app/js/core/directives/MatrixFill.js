app.directive('matrixFill', ['percentageValues', function(percentageValues) {
    return {
        restrict: "E",
        template: '<div class="marix-fill-container">TEST</div>',
        scope: {
            data: "@",
            width: "@",
            height: "@"
        },
        link: function(scope, elem, attrs) {
            //Attributes data
            scope.matrixData = JSON.parse(scope.data);
            scope.height = JSON.parse(scope.height);
            scope.width = JSON.parse(scope.width);

            //Directive data
            scope.start = 0;
            scope.totalValue = 0, scope.end = 0;
            scope.percentagedMatrixData = [];
            scope.renderMatrixObject = [];
            scope.dividingNumber = Math.round(Math.sqrt(scope.matrixData.length));

            //Random variables
            var dependancyCheck = percentageValues,
                percentage = 100;

            //Starting function
            scope.init = function() {
                scope.convertToPerc();
                scope.createUpdatedMatrixObject();
            }

            scope.convertToPerc = function() {
                angular.forEach(scope.matrixData, function(singleData) {
                    scope.totalValue = scope.totalValue += singleData;
                });
                angular.forEach(scope.matrixData, function(singleData, key) {
                    scope.percentagedMatrixData[key] = (singleData / scope.totalValue) * 100
                });
                scope.percentagedMatrixData = percentageValues.returnValues(scope.percentagedMatrixData, percentage);
            }

            scope.createUpdatedMatrixObject = function() {
                angular.forEach(scope.percentagedMatrixData, function(value, key) {
                    if (scope.end < scope.percentagedMatrixData.length) {
                        var dividedData = scope.divideData();
                        scope.renderMatrixObject.push(dividedData);
                    }
                });
            }

            scope.sliceArray = function(array, start, end) {
                if (!end) {
                    end = -1;
                }
                scope.start = end;
                return array.slice(start, end);
            }

            scope.divideData = function() {
                scope.end = (scope.start + scope.dividingNumber);
                slicedArray = scope.sliceArray(scope.percentagedMatrixData, scope.start, scope.end);
                return slicedArray;
            }
            scope.init();
        },
        controller: function($scope) {

        }
    }
}]);
