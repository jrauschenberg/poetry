
app.controller('HomeController', function ($scope, FrequencyFactory, SentimentFactory) {

  SentimentFactory.fetchAll()
  .then(function(sentiments) {
    $scope.sentiments = sentiments;
    for (var i=0; i<$scope.sentiments.length; i++) {
      $scope.data[0].values.push({label: $scope.sentiments[i].author, value: $scope.sentiments[i].sentiment});
    }
  });

  FrequencyFactory.fetchAll()
  .then(function(frequencies) {
    $scope.frequencies = frequencies;
    for (var i=0; i<$scope.frequencies.length; i++) {
      $scope.data[0].values.push({label: $scope.frequencies[i].author, value: $scope.frequencies[i].frequency});
    }
  });

  $scope.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        width: 800,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.2f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'Poet'
        },
        yAxis: {
            axisLabel: 'Sentiment',
            axisLabelDistance: -5
        }
    }
  };


  $scope.data = [{
    key: "Poets and Sentiments",
    values: [
        ]
    }];

});
