'use strict';

app.factory('FrequencyFactory', function ($http, $log) {

  return {
    fetchById : function (id) {
      return $http.get('/api/frequencies/' + id)
      .then(response => response.data)
      .catch($log.error);
    },

    fetchAll : function () {
      return $http.get('/api/frequencies')
      .then(response => response.data)
      .catch($log.error);
    },

  };

});