app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl as home',
        resolve: {
            repos: function(ghRepos) {
                return ghRepos();
            }
        }
    });
}]);

app.controller('HomeCtrl', [function() {
    this.text = "Home text";
}]);