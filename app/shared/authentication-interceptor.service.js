app.service('authenticationInterceptor', ['userSession','$injector', function(userSession, $injector) {
    this.request = function(request) {
        if (request.url.match('/api/') && !userSession.loggedIn) {
            $injector.get('$state').go('login');
        }
        return request;
    };
}]);