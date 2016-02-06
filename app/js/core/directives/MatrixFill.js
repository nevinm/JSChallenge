app.directive('matrixFill', function() {
    return {
        restrict: "E",
        template: '<div class="marix-fill-container">TEST</div>',
        scope: {
            data: "@"
        },
        controller: function($scope) {
            $scope.matrixData = JSON.parse($scope.data);
            $scope.totalValue = 0;
            $scope.updatedMatrixData = [];
            $scope.dividingNumber = Math.round(Math.sqrt($scope.matrixData.length));

            $scope.convertToPerc = function() {
                angular.forEach($scope.matrixData, function(singleData) {
                    $scope.totalValue = $scope.totalValue += singleData;
                });
                angular.forEach($scope.matrixData, function(singleData, key) {
                    $scope.updatedMatrixData[key] = (singleData / $scope.totalValue) * 100
                });
            }

            $scope.divideData = function() {

            }

            $scope.convertToPerc();
        }
    }
});
