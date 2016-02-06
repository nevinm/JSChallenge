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
            scope.end = 0;
            scope.percentagedMatrixData;
            scope.renderMatrixObject = [];
            scope.dividingNumber = Math.round(Math.sqrt(scope.matrixData.length));

            //Random variables
            var dependancyCheck = percentageValues,
                percentage = 100;

            //Starting function
            scope.init = function() {
                scope.percentagedMatrixData = scope.convertToPerc(scope.matrixData);
                scope.renderMatrixObject = scope.createUpdatedMatrixObject(scope.percentagedMatrixData);
            }

            scope.convertToPerc = function(totalMatrix) {
                var totalValue = 0,
                    percentagedMatrix = [];
                angular.forEach(totalMatrix, function(singleData) {
                    totalValue = totalValue += singleData;
                });
                angular.forEach(totalMatrix, function(singleData, key) {
                    percentagedMatrix[key] = (singleData / totalValue) * percentage;
                });
                percentagedMatrix = percentageValues.returnValues(percentagedMatrix, percentage);
                return percentagedMatrix;
            }

            scope.createUpdatedMatrixObject = function(percentagedMatrix) {
                angular.forEach(percentagedMatrix, function(value, key) {
                    renderMatrixObject = scope.divideData(scope.start, scope.end, scope.dividingNumber, percentagedMatrix);
                });
                return renderMatrixObject;
            }

            scope.sliceArray = function(array, start, end) {
                if (!end) {
                    end = -1;
                }
                scope.start = end;
                return array.slice(start, end);
            }

            scope.divideData = function(start, end, dividingNumber, percentagedMatrix) {
                var renderMatrixObject = [];
                angular.forEach(percentagedMatrix, function(value, key) {
                    if (end < percentagedMatrix.length) {
                        start = end;
                        end = (start + dividingNumber);
                        slicedArray = scope.sliceArray(percentagedMatrix, start, end);
                        renderMatrixObject.push(slicedArray);
                    } else {}
                });

                return renderMatrixObject;
            }

            scope.init();
        },
        controller: function($scope) {

        }
    }
}]);
