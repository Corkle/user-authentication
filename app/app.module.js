var app = angular.module('authApp', ['ui.router', 'templates']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
    $urlRouterProvider.otherwise('/');
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        
        $state.previous = fromState;
    });
}]);

function DEBUG(msg, obj) {
    var dt = new Date();
    var timestamp = dt.toLocaleTimeString();
    console.log(timestamp, msg, obj);
}