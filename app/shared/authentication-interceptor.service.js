app.service('authenticationInterceptor', ['userSession','$state', function(userSession, $state) {
    this.request = function(request) {
        if (request.url.match('/api/') && !userSession.loggedIn) {
            $state.go('login');
        }
        return request;
    };
}]);