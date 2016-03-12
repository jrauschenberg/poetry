
app.controller('HomeController', function ($scope, WordFactory, FrequencyFactory, SentimentFactory) {

  $scope.config = {
    extended: true
  };

  $scope.showPOS = function() {
    $scope.hideAllButPOS = false;
    $scope.hideAllButSentiment = true;

  }

  $scope.showSentiment = function() {
    $scope.hideAllButPOS = true;
    $scope.hideAllButSentiment = false;
  }


  $scope.closest = {};
  $scope.closest.text = 'Nobody, yet. Enter your poem!';

  $scope.compare = function(sentiment, POS) {
    var totalDiff = {};
    for (var i=0; i<$scope.sentiments.length; i++) {
      totalDiff[$scope.sentiments[i].author] = Math.abs(($scope.sentiments[i].sentiment - sentiment)*100);
    }
    for (var keys in POS) {
      for (var j=0; j<$scope.data5.length; j++) {
        if ($scope.data5[j].key === keys) {
          totalDiff['William Shakespeare'] += Math.abs((POS[keys] - $scope.data5[j]['y']));
        }
      }
    }
    for (var keys in POS) {
      for (var j=0; j<$scope.data4.length; j++) {
        if ($scope.data4[j].key === keys) {
          totalDiff['E.E. Cummings'] += Math.abs((POS[keys] - $scope.data4[j]['y']));
        }
      }
    }
    for (var keys in POS) {
      for (var j=0; j<$scope.data3.length; j++) {
        if ($scope.data3[j].key === keys) {
          totalDiff['John Berryman'] += Math.abs((POS[keys] - $scope.data3[j]['y']));
        }
      }
    }
    for (var keys in POS) {
      for (var j=0; j<$scope.data2.length; j++) {
        if ($scope.data2[j].key === keys) {
          totalDiff['Wallace Stevens'] += Math.abs((POS[keys] - $scope.data2[j]['y']));
        }
      }
    }
    for (var keys in POS) {
      for (var j=0; j<$scope.data6.length; j++) {
        if ($scope.data6[j].key === keys) {
          totalDiff['Sylvia Plath'] += Math.abs((POS[keys] - $scope.data6[j]['y']));
        }
      }
    }
    var min, closestAuthor;
    for (var author in totalDiff) {
      if (totalDiff[author] < min || min === undefined) {
        min = totalDiff[author];
        closestAuthor = author;
      }
    }
    if (closestAuthor === 'Sylvia Plath') {
      $scope.closest.text = "Your poetry is closest to Sylvia Plath. Avoid ovens.";
      $scope.closest.link = 'https://en.wikipedia.org/wiki/Sylvia_Plath';
      $scope.closest.photo = 'https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/11_splat_150.jpg?itok=0yy1NVGf';
    }
    if (closestAuthor === 'Wallace Stevens') {
      $scope.closest.text = "Your poetry is closest to Wallace Stevens. You truly are the emperor of ice cream.";
      $scope.closest.link = 'https://en.wikipedia.org/wiki/Wallace_Stevens';
      $scope.closest.photo = 'http://myweb.wvnet.edu/~jelkins/lp-2001/images/stevens3.jpg';
    }
    if (closestAuthor === 'William Shakespeare') {
      $scope.closest.text = "Your poetry is closest to William Shakespeare. That doesn't mean it's good, just that you're ripping him off.";
      $scope.closest.link = 'https://en.wikipedia.org/wiki/William_Shakespeare';
      $scope.closest.photo = 'http://shakespeare.mit.edu/shake.gif';
    }
    if (closestAuthor === 'John Berryman') {
      $scope.closest.text = "Your poetry is closest to John Berryman. Avoid bridges in Minneapolis.";
      $scope.closest.link = 'https://en.wikipedia.org/wiki/John_Berryman';
      $scope.closest.photo = 'http://www.fsgworkinprogress.com/wp-content/uploads/2015/02/WIP_Horizontal_Blog_Post_688_x_371px.jpg';
    }
    if (closestAuthor === 'E.E. Cummings') {
      $scope.closest.text = "your poetry is closest to ee cummings";
      $scope.closest.link = 'https://en.wikipedia.org/wiki/E._E._Cummings';
      $scope.closest.photo = 'http://www.notablebiographies.com/images/uewb_03_img0211.jpg';
    }
  };

  $scope.analyze = function(poem) {
    poem = poem.split(/[\n ]/);
    SentimentFactory.analyze(poem)
    .then(function(analysis) {
      $scope.data[0].values.push({label: 'You', value: $scope.sentimentAnalysis(poem)});
      $scope.data7 = [];
      for (var key in analysis) {
        $scope.data7.push({key: key, y: analysis[key]});
      }
      $scope.compare($scope.sentimentAnalysis(poem), analysis);
    });
  };

  WordFactory.fetchAll()
  .then(function(words) {
    $scope.words = words;
  });

  $scope.sentimentAnalysis = function(text) {
    var overallValence = 0;
    var overallValenceValue = 0;
    text.forEach(function(word) {
        $scope.words.forEach(function(instance) {
          if (word === instance.description) {
            overallValence ++;
            overallValenceValue += instance.meanValence;
          }
        });
    });
    overallValence = overallValenceValue/overallValence || 5;
    return overallValence;
};


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
    // for (var i=0; i<1; i++) {
    //   for (var key in $scope.frequencies[i])
    //   $scope.data2.push({key: key, $scope.frequencies[i]['noun']});
    // }
  });

  $scope.options7 = {
    title: {
      enable: true,
      text: "Your Poem"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

$scope.data7 = [{
  key : 'No Poem Entered',
  y : 100
}];

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
        showValues: false,
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
    },

  };

  $scope.data = [{
    key: "Poets and Sentiments",
    values: [
        ]
  }];

  $scope.options2 = {
    title: {
      enable: true,
      text: "Wallace Stevens"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data2 = [
    {
      key: 'noun',
      y: 35.8
    },
    {
      key: "pronoun",
      y: 6.96
    },
    {
      key: "adverb",
      y: 3.48
    },
    {
      key: "modal",
      y: 2.24
    },
    {
      key: "verb",
      y: 9.09
    },
    {
      key: "adjective",
      y: 7.52
    },
    {
      key: "coordinating conjunction",
      y: 5.39
    },
    {
      key: "existential there",
      y: 0.22
    },    
    {
      key: "determiner",
      y: 10.55
    },
    {
      key: "preposition or subordinating conjunction",
      y: 15.15
    },
  ];

    $scope.options3 = {
    title: {
      enable: true,
      text: "John Berryman"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data3 = [
    {
      key: 'noun',
      y: 32.18
    },
    {
      key: "pronoun",
      y: 7.13
    },
    {
      key: "adverb",
      y: 3.48
    },
    {
      key: "modal",
      y: 1.84
    },
    {
      key: "verb",
      y: 12.87
    },
    {
      key: "adjective",
      y: 4.14
    },
    {
      key: "coordinating conjunction",
      y: 5.52
    },
    {
      key: "existential there",
      y: 0.46
    },    
    {
      key: "determiner",
      y: 8.97
    },
    {
      key: "preposition or subordinating conjunction",
      y: 6.90
    },
  ];

    $scope.options4 = {
    title: {
      enable: true,
      text: "E.E. Cummings"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data4 = [
    {
      key: 'noun',
      y: 29.47
    },
    {
      key: "pronoun",
      y: 6.91
    },
    {
      key: "adverb",
      y: 4.88
    },
    {
      key: "modal",
      y: 2.24
    },
    {
      key: "verb",
      y: 13.62
    },
    {
      key: "adjective",
      y: 6.50
    },
    {
      key: "coordinating conjunction",
      y: 3.86
    },  
    {
      key: "determiner",
      y: 7.11
    },
    {
      key: "preposition or subordinating conjunction",
      y: 11.59
    },
  ];

    $scope.options5 = {
    title: {
      enable: true,
      text: "William Shakespeare"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data5 = [
    {
      key: 'noun',
      y: 28.87
    },
    {
      key: "pronoun",
      y: 6.11
    },
    {
      key: "adverb",
      y: 2.68
    },
    {
      key: "modal",
      y: 1.25
    },
    {
      key: "verb",
      y: 7.73
    },
    {
      key: "adjective",
      y: 3.15
    },
    {
      key: "coordinating conjunction",
      y: 2.51
    },
    {
      key: "existential there",
      y: 0.09
    },    
    {
      key: "determiner",
      y: 4.42
    },
    {
      key: "preposition or subordinating conjunction",
      y: 6.27
    },

  ];


  $scope.options6 = {
    title: {
      enable: true,
      text: "Sylvia Plath"
    },
    chart: {
        type: 'pieChart',
        height: 500,
        width: 500,
        x: function(d){return d.key; },
        y: function(d){return d.y; },
        showLabels: false,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: true,
        legend: {
            margin: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 0
            }
        }
    }
  };

  $scope.data6 = [
    {
      key: 'noun',
      y: 35.97
    },
    {
      key: "pronoun",
      y: 7.72
    },
    {
      key: "adverb",
      y: 5.65
    },
    {
      key: "modal",
      y: 1.51
    },
    {
      key: "verb",
      y: 12.05
    },
    {
      key: "adjective",
      y: 5.46
    },
    {
      key: "coordinating conjunction",
      y: 4.52
    },
    {
      key: "existential there",
      y: 0.19
    },    
    {
      key: "determiner",
      y: 11.11
    },
    {
      key: "preposition or subordinating conjunction",
      y: 9.98
    },
    
  ];

});


