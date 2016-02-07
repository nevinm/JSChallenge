app.directive('matrixFill', ['percentageValues', 'createRandomColors', '$compile', '$timeout',
    function(percentageValues, createRandomColors, $compile, $timeout) {
        return {
            restrict: "E",
            template: '<div class="matrix-fill-container"></div>',
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
                    percentage = 100;

                //Starting function
                scope.init = function() {
                    //Check data for negative values.
                    if (scope.checkData(scope.matrixData)) {
                        scope.setContainerStyles();
                        scope.percentagedMatrixData = scope.convertToPerc(scope.matrixData);
                        scope.renderMatrixRatio = scope.createUpdatedMatrixObject(scope.percentagedMatrixData, scope.matrixData);
                        scope.renderData = scope.findUnits(scope.renderMatrixRatio, scope.totalWidth);
                        scope.appendRect(scope.renderData);
                    } else {
                        alert("Enter correct data.")
                    }
                }

                scope.checkData = function(data) {
                    var flag = true;
                    angular.forEach(data, function(value, key) {
                        if (value !== undefined && value > 0) {} else {
                            flag = false;
                        }
                    });
                    return flag;
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

                scope.createUpdatedMatrixObject = function(percentagedMatrix, matrixData) {
                    var mergedDataObj = [];
                    for (i = 0; i < percentagedMatrix.length; i++) {
                        mergedDataObj.push({
                            "percentageData": percentagedMatrix[i],
                            "originalData": matrixData[i]
                        });
                    }
                    angular.forEach(mergedDataObj, function(value, key) {
                        renderMatrixObject = scope.divideData(scope.start, scope.end, scope.dividingNumber, mergedDataObj);
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

                scope.divideData = function(start, end, dividingNumber, mergedDataObj) {
                    var renderMatrixObject = [];
                    angular.forEach(mergedDataObj, function(value, key) {
                        if (end < mergedDataObj.length) {
                            start = end;
                            end = (start + dividingNumber);
                            slicedArray = scope.sliceArray(mergedDataObj, start, end);
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
                            singularRows = [],
                            originalDataRows = [],
                            mergedDataRows = [];
                        angular.forEach(value, function(innerValue, innerKey) {
                            sum += innerValue.percentageData;
                        });
                        ratio = totalWidth / sum;
                        angular.forEach(value, function(innerValue, innerKey) {
                            percentageWidth = parseFloat((ratio * innerValue.percentageData).toFixed(2));
                            originalWidth = innerValue.originalData;
                            mergedDataRows.push({
                                "percentageData": percentageWidth,
                                "originalData": originalWidth
                            });
                        });
                        sum = (sum / percentage) * scope.totalHeight;
                        totalRenderData.push({
                            "height": sum,
                            "width": mergedDataRows
                        });
                    });
                    return totalRenderData;
                }

                scope.appendRect = function(renderData) {
                    angular.forEach(renderData, function(value, key) {
                        var templateHeight = value.height;
                        angular.forEach(value.width, function(innerValue, innerKey) {
                            var randomColor = createRandomColors.pleasingColors(),
                                rectangleTemplate = angular.element('<div class="rectangle" style="background-color:' + randomColor +
                                    '; height:' + templateHeight + 'px; width:' +
                                    innerValue.percentageData + 'px"><span class="rectangle-data">' + innerValue.originalData + '</span></div>');
                            parentContainer.append(rectangleTemplate);
                            $compile(rectangleTemplate)(scope);
                        });
                    });
                }

                scope.init();
            }
        }
    }
]);
