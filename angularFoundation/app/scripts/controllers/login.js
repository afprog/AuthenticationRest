'use strict';

angular.module('angularFoundationApp').controller('LoginCtrl', function ($scope, $cookies, $http) {
	
	$scope.credenciales = {
        username: '',
        password: ''
    };
        
	$scope.login = function (credenciales){
        console.log(credenciales);
        var jws = new KJUR.jws.JWS();
        
        var certificado = "-----BEGIN CERTIFICATE-----" +
                	"MIIDMjCCAhqgAwIBAgIJAKMfG/B2MKd5MA0GCSqGSIb3DQEBBQUAMBoxCzAJBgNV" +
	                "BAYTAkpQMQswCQYDVQQKEwJ6MzAeFw0xMDA1MzEwNjE4MDhaFw0yMDA1MjgwNjE4" +
	                "MDhaMBoxCzAJBgNVBAYTAkpQMQswCQYDVQQKEwJ6MzCCASIwDQYJKoZIhvcNAQEB" +
	                "BQADggEPADCCAQoCggEBAOKosPD1rOz6Z5wtgVBKA0XMFxfKavF09f9x3N3LlCcF" +
	                "/6LTXn6/waJq93bTNBESzdw63qQl77sxFORXCVQ1Ad7CPqRbY4ywVw/8yZri9wH4" +
	                "PdSfae/fg5vuN3EesLissFSceQySHbMBeqEAw84cLvPXdlecdNmlwfS6nV5D8Ijt" +
	                "HkebP8R14AEpfoag3VS/YS6Hd4hmvZ1e3BJQm3JfFFVzTyZ0AH2oimsxfoQnZf7M" +
	                "qyIdCgmeaKYILEyYm6PKhVwZhuD5E+WG4RxNdcGCiC8GRUr2fYnXUT0CtwrYBYgZ" +
	                "121cFObeu7Z/aTIsx4MqYLHwaHqMga6U7nOHoEgqY7ECAwEAAaN7MHkwHQYDVR0O" +
	                "BBYEFKO4NcUDh3J5c7XD7j4pVXnzIfALMEoGA1UdIwRDMEGAFKO4NcUDh3J5c7XD" +
	                "7j4pVXnzIfALoR6kHDAaMQswCQYDVQQGEwJKUDELMAkGA1UEChMCejOCCQCjHxvw" +
	                "djCneTAMBgNVHRMEBTADAQH/MA0GCSqGSIb3DQEBBQUAA4IBAQC8JdiwJF22/3nB" +
	                "IxJT/gXXN10cub6O+x9q64ls7dpGpBvbi4/lJgZOsZqoJiswU5WOKZ4MTOmMHe4W" +
	                "e/MHuhcjsgf9EHHYZQ1reBYi/l9mBBbYFGs0zSv1CyjbwkyF36nr/8sWdYf4ZtXQ" +
	                "nzTGvoa6oTOOTmmj3Bwl3CHwonvgAJUCHY/UmWFzH8Sf0dDW7iJBj+ZWfjuSlSQe" +
	                "2ninrEpfA4v2V1p3LOH+layZLDMJHkNCq8eoU1MbJi07cHxLWtlwliNOiRboaiYl" +
	                "1wtWR7ZY4HZCPeyb0tanf58rBQAXElaCF3fmfHrlpxoJBsQP1NbFrBs2haOIEZ4E" +
	                "K3V9/Bpi" +
	                "-----END CERTIFICATE-----";	
        
        $http.defaults.headers.common['Usuario'] = credenciales.username;
        $http.defaults.headers.common['Password'] = credenciales.password;
        
        $http.post('http://192.168.2.175:9400/autenticacion')
        .success(function (data) {
        	console.log("datos: " + data);
        	var info = jws.verifyJWSByPemX509Cert(data.token, certificado);
	        console.log(info);
	        console.log(angular.fromJson(jws.parsedJWS.payloadS).perfil);
        	$cookies.token = data.token; 
        })
        .error(function (data, status, headers, config) {
        	$scope.status = status;
        });
	};
});
