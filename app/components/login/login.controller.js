app.config(['$stateProvider', function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './app/components/login/login.html',
        controller: 'LoginCtrl as ctrl'
    });
}]);

app.controller('LoginCtrl', ['userSession', '$state', function (userSession, $state) {
    var ctrl = this;    
    ctrl.previousPage = $state.previous.name !== '' ? $state.previous : 'home';
    ctrl.login = function (username, password) {
        ctrl.loginFailed = null;
        if (username == 'user' && password == 'password') {
            userSession.loggedIn = true;
            $state.go(ctrl.previousPage);
        } else {
            ctrl.loginFailed = true;
        }
    };
}]);