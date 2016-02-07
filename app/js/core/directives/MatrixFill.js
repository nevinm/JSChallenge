app.directive('matrixFill', ['percentageValues', '$compile', '$timeout',
    function(percentageValues, $compile, $timeout) {
        return {
            restrict: "E",
            template: '<div class="matrix-fill-container">TEST</div>',
            scope: {
                data: "@",
                width: "@",
                height: "@"
            },
            link: function(scope, elem, attrs) {
                //Attributes data
                scope.matrixData = JSON.parse(scope.data);
                scope.totalHeight = JSON.parse(scope.height);
                scope.totalWidth = JSON.parse(scope.width);

                //Directive data
                scope.start = 0;
                scope.end = 0;
                scope.percentagedMatrixData;
                scope.renderMatrixRatio = [];
                scope.dividingNumber = Math.round(Math.sqrt(scope.matrixData.length));
                var parentContainer = angular.element(elem[0].querySelector('.matrix-fill-container'));

                //Random variables
                var dependancyCheck = percentageValues,
                    // test = elem,
                    percentage = 100;

                //Starting function
                scope.init = function() {
                    scope.setContainerStyles();
                    scope.percentagedMatrixData = scope.convertToPerc(scope.matrixData);
                    scope.renderMatrixRatio = scope.createUpdatedMatrixObject(scope.percentagedMatrixData);
                    scope.renderData = scope.findUnits(scope.renderMatrixRatio, scope.totalWidth);
                    scope.appendRect(scope.renderData);
                }

                scope.setContainerStyles = function() {
                    parentContainer[0].style.width = scope.totalWidth + "px";
                    parentContainer[0].style.height = scope.totalHeight + "px";
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

                scope.findUnits = function(renderMatrixRatio, totalWidth) {
                    var totalRenderData = [];
                    angular.forEach(renderMatrixRatio, function(value, key) {
                        var sum = 0,
                            ratio = 0,
                            singularRows = singularColumns = [];
                        angular.forEach(value, function(innerValue, innerKey) {
                            sum += innerValue;
                        });
                        ratio = totalWidth / sum;
                        angular.forEach(value, function(innerValue, innerKey) {
                            singularWidth = parseFloat((ratio * innerValue).toFixed(2));
                            singularRows.push(singularWidth);
                        });
                        totalRenderData.push({
                            "height": sum,
                            "width": singularRows
                        });
                    });
                    return totalRenderData;
                }

                scope.appendRect = function(renderData) {
                    var randomColor = "#" + ((1 << 24) * Math.random() | 0).toString(16),
                        rectangleTemplate = angular.element('<div class="rectangle" style="background-color:' + randomColor + '"></div>');
                    parentContainer.append(rectangleTemplate);
                    $compile(rectangleTemplate)(scope);
                    angular.forEach(renderData, function() {
                        
                    }); 
                }

                scope.init();
            },
            controller: function($scope) {

            }
        }
    }
]);
