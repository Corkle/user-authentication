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