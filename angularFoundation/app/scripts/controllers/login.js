'use strict';

angular.module('angularFoundationApp')
  .controller('LoginCtrl', function ($scope) {
    $scope.credential = {
        username: '',
        password: ''
    };
        $scope.login = function (credential){
            console.log(credential);
            var jws = new KJUR.jws.JWS();
            var heder = '{"alg":"RS256"}';
            var sResult = null;
            var payload = '{"iss":"joe5", "exp":1300819380, "http://example.com/is_root":true}';
            var RSAKey = "-----BEGIN RSA PRIVATE KEY-----" +
                "MIIEogIBAAKCAQEA4qiw8PWs7PpnnC2BUEoDRcwXF8pq8XT1/3Hc3cuUJwX/otNe" +
                "fr/Bomr3dtM0ERLN3DrepCXvuzEU5FcJVDUB3sI+pFtjjLBXD/zJmuL3Afg91J9p" +
                "79+Dm+43cR6wuKywVJx5DJIdswF6oQDDzhwu89d2V5x02aXB9LqdXkPwiO0eR5s/" +
                "xHXgASl+hqDdVL9hLod3iGa9nV7cElCbcl8UVXNPJnQAfaiKazF+hCdl/syrIh0K" +
                "CZ5opggsTJibo8qFXBmG4PkT5YbhHE11wYKILwZFSvZ9iddRPQK3CtgFiBnXbVwU" +
                "5t67tn9pMizHgypgsfBoeoyBrpTuc4egSCpjsQIDAQABAoIBAF2sU/wxvHbwAhQE" +
                "pnXVMMcO0thtOodxzBz3JM2xThhWnVDgxCPkAhWq2X0NSm5n9BY5ajwyxYH6heTc" +
                "p6lagtxaMONiNaE2W7TqxzMw696vhnYyL+kH2e9+owEoKucXz4QYatqsJIQPb2vM" +
                "0h+DfFAgUvNgYNZ2b9NBsLn9oBImDfYueHyqpRGTdX5urEVtmQz029zaC+jFc7BK" +
                "Y6qBRSTwFwnVgE+Td8UgdrO3JQ/0Iwk/lkphnhls/BYvdNC5O8oEppozNVmMV8jm" +
                "61K+agOh1KD8ky60iQFjo3VdFpUjI+W0+sYiYpDb4+Z9OLOTK/5J2EBAGim9siyd" +
                "gHspx+UCgYEA9+t5Rs95hG9Q+6mXn95hYduPoxdFCIFhbGl6GBIGLyHUdD8vmgwP" +
                "dHo7Y0hnK0NyXfue0iFBYD94/fuUe7GvcXib93heJlvPx9ykEZoq9DZnhPFBlgIE" +
                "SGeD8hClazcr9O99Fmg3e7NyTuVou+CIublWWlFyN36iamP3a08pChsCgYEA6gvT" +
                "pi/ZkYI1JZqxXsTwzAsR1VBwYslZoicwGNjRzhvuqmqwNvK17dnSQfIrsC2VnG2E" +
                "UbE5EIAWbibdoL4hWUpPx5Tl096OjC3qBR6okAxbVtVEY7Rmv7J9RwriXhtD1DYp" +
                "eBvo3eQonApFkfI8Lr2kuKGIgwzkZ72QLXsKJiMCgYBZXBCci0/bglwIObqjLv6e" +
                "zQra2BpT1H6PGv2dC3IbLvBq7hN0TQCNFTmusXwuReNFKNq4FrB/xqEPusxsQUFh" +
                "fv2Il2QoI1OjUE364jy1RZ7Odj8TmKp+hoEykPluybYYVPIbT3kgJy/+bAXyIh5m" +
                "Av2zFEQ86HIWMu4NSb0bHQKBgETEZNOXi52tXGBIK4Vk6DuLpRnAIMVl0+hJC2DB" +
                "lCOzIVUBM/VxKvNP5O9rcFq7ihIEO7SlFdc7S1viH4xzUOkjZH2Hyl+OLOQTOYd3" +
                "kp+AgfXpg8an4ujAUP7mu8xaxns7zsNzr+BCgYwXmIlhWz2Aiz2UeL/IsfOpRwuV" +
                "801xAoGADQB84MJe/X8xSUZQzpn2KP/yZ7C517qDJjComGe3mjVxTIT5XAaa1tLy" +
                "T4mvpSeYDJkBD8Hxr3fB1YNDWNbgwrNPGZnUTBNhxIsNLPnV8WySiW57LqVXlggH" +
                "vjFmyDdU5Hh6ma4q+BeAqbXZSJz0cfkBcBLCSe2gIJ/QJ3YJVQI=" +
                "-----END RSA PRIVATE KEY-----";
            var cert = "-----BEGIN CERTIFICATE-----" +
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

//            sResult = jws.generateJWSByP1PrvKey(heder, payload, RSAKey);
//            var hJWSHSPass = "";
//            sResult = KJUR.jws.JWS.sign(null, '{"alg":"HS256", "cty":"JWT"}', '{"age": 21}', hJWSHSPass);
//            console.log(sResult);
            var token = "eyJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiV2VsY29tZSB0byB0aGUgd29ybGQgb2YgQUVTIn0=.OTg5NGRiMWRjYjQ3NjY0ZTljOTA3ZjUwMTQzODNmOWI2Yzg5MmI3OTg2YWZkM2M3Y2FjMWZiZDI1ODRlZjFkMQ=="
            var info = jws.verifyJWSByPemX509Cert(token,cert);
            console.log(info);
//            var certResult = jws.verifyJWSByPemX509Cert(sResult,cert);
//            console.log(certResult);
            console.log(angular.fromJson(jws.parsedJWS.payloadS).data);
//            try {

//            } catch (ex) {
//                console.log("Error: " + ex);
//            }
        };
  });
