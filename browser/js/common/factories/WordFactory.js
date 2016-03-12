'use strict';

app.factory('WordFactory', function ($http, $log) {

  return {

    fetchAll : function () {
      return $http.get('/api/words')
      .then(response => response.data)
      .catch($log.error);
    }

  }

});