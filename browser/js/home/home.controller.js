
app.controller('HomeController', function ($scope, FrequencyFactory, SentimentFactory) {
  console.log('made it home');
  FrequencyFactory.fetchAll()
  .then(function(frequencies) {
    $scope.frequencies = frequencies;
  })
  SentimentFactory.fetchAll()
  .then(function(sentiments) {
    $scope.sentiments = sentiments;
  })
  
});
