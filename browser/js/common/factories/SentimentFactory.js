'use strict';

app.factory('SentimentFactory', function ($http, $log) {

  return {
    fetchById : function (id) {
      return $http.get('/api/sentiments/' + id)
      .then(response => response.data)
      .catch($log.error);
    },

    fetchAll : function () {
      return $http.get('/api/sentiments')
      .then(response => response.data)
      .catch($log.error);
    },

  };

});