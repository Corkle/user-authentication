var app = angular.module('authApp', ['ui.router', 'templates']);

app.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', function ($httpProvider, $stateProvider, $urlRouterProvider) {
    $httpProvider.interceptors.push('authenticationInterceptor');
    $urlRouterProvider.otherwise('/');
}]);

app.run(['$rootScope', '$state', function ($rootScope, $state) {
    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
        DEBUG('previousState:', fromState);
        $state.previous = fromState;
    });
}]);

function DEBUG(msg, obj) {
    var dt = new Date();
    var timestamp = dt.toLocaleTimeString();
    console.log(timestamp, msg, obj);
}
app.controller('AppCtrl', [function() {
    
}]);
app.service('authenticationInterceptor', ['userSession','$state', function(userSession, $state) {
    this.request = function(request) {
        if (request.url.match('/api/') && !userSession.loggedIn) {
            $state.go('login');
        }
        return request;
    };
}]);
app.service('userSession', function() {
    this.loggedIn = false;
});
app.config(['$stateProvider', function($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'components/home/home.html',
        controller: 'HomeCtrl as home'
    });
}]);

app.controller('HomeCtrl', [function() {
    this.text = "Home text";
}]);
app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './app/components/login/login.html',
        controller: 'LoginCtrl as ctrl'
    });
}]);

app.controller('LoginCtrl', ['userSession', '$state', function (userSession, $state) {
    var ctrl = this;
    ctrl.previousPage = $state.previous;
    ctrl.login = function (username, password) {
        if (username == 'user' && password == 'password') {
            userSession.loggedIn = true;
            $state.go(ctrl.previousPage || 'home');
        }
    };
}]);
angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("components/home/home.html","<h1>Home</h1><p>{{ ::home.text }}</p>");
$templateCache.put("components/login/login.html","<h1>Login</h1><form name=\"loginForm\" ng-submit=\"loginForm.$valid && ctrl.login(username, password)\"><div class=\"field\"><label>Username:</label><input type=\"text\" ng-model=\"username\" name=\"username\"></div><div class=\"field\"><label>Password:</label><input type=\"password\" ng-model=\"password\" name=\"password\"></div></form>");}]);