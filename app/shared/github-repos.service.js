app.service('ghRepos', ['$http', function($http) {
    return function() {
      return $http.get('https://api.github.com/repositories');  
    };
}]);