app.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.html',
    controller: 'HomeController'
  });
});

app.config(function($stateProvider) {
  $stateProvider.state('about', {
    url: '/about',
    templateUrl: 'js/home/about.html',
    controller: 'AboutController'
  });
});