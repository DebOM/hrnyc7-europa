angular.module('calendarWidget', [])
.component('calendarWidget', {
  templateUrl: './app/components/calendarWidgetTemplate.html',
  controller: function calendarController($scope, $http, $route, $mdDialog){
    // $scope.date = new Date();
    $scope.today = new Date();
    $scope.dates = [];

    $scope.maxDate = new Date();
    $scope.maxDate.setDate($scope.today.getDate() + 60);
    $scope.taskData;

    $http.get('/api/dates')
    .then(data => {
      $scope.taskData = data;
      var jsDates = data.data.map(date => new Date(date.dueDate));
      console.log('cal dates', jsDates)
      $scope.dates = jsDates.map(date=> {
        return [date.getFullYear(), date.getMonth(), date.getDate()]
      });
      console.log('scope dates', $scope.dates)
    });

    $scope.showPrerenderedDialog = function(ev) {
      $scope.date = ev.target.parentNode.attributes['aria-label'].value;
      $scope.taskDate = new Date($scope.date);
      $scope.task = $scope.taskData.data.filter(task => new Date(task.dueDate).getTime() === $scope.taskDate.getTime())

      $mdDialog.show({
        contentElement: '#myDialog',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true
      });
    };

    $scope.filterDates = date => {
      var year = date.getFullYear();
      var month = date.getMonth();
      var day = date.getDate();
      console.log('fd dates', $scope.dates)

      return $scope.dates.reduce((acc, date)=>{
        if(year===date[0] && month === date[1] && day === date[2]){
          return true;
        }
        return acc;
      }, false)
    };
  }
})
