app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
            url: '/login',
            templateUrl: './app/components/login/login.html',
            controller: 'LoginCtrl as ctrl'
        })
        .state('logout', {
            url: '/logout',
            controller: ['userSession', '$state', function (userSession, $state) {
                userSession.loggedIn = false;
                $state.go('login');
            }]
        });
}]);

app.controller('LoginCtrl', ['userSession', '$state', function (userSession, $state) {
    var ctrl = this;
    ctrl.previousPage = function () {
        var previousState;
        if ($state.previous.name === 'logout' || !$state.previous.name) {
            previousState = 'home';
        } else {
            previousState = $state.previous;
        }
        return previousState;
    };
    ctrl.login = function (username, password) {
        ctrl.loginFailed = null;
        if (username == 'user' && password == 'password') {
            userSession.loggedIn = true;
            $state.go(ctrl.previousPage());
        } else {
            ctrl.loginFailed = true;
        }
    };
}]);