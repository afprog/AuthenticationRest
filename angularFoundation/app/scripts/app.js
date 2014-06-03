'use strict';

var app = angular.module('angularFoundationApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'views/login.html', controller: 'LoginCtrl'})
	$routeProvider.otherwise({redirectTo: '/'});
})
.factory('httpResponseInterceptor',['$q','$location', '$http', function($q,$location, $http){
    return {
        response: function(response){
            if (response.status === 200) {
                console.log("Response 200");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 200) {
                console.log("Response Error 200",rejection);
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        },
        request: function(request){
        	$http.defaults.headers.common['token'] = 'token';
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    $httpProvider.interceptors.push('httpResponseInterceptor');
}]);