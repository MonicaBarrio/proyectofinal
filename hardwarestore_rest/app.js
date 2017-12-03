/*global angular, $http */
(function () {

	"use strict";
	
	// ANGULAR MODULE/APP (gemStore):
	var app = angular.module("ferStore", ["store-products"])

		// CONTROLLERS:
		// para uso GET y mostrar lista 
		.controller("StoreController", ["$http", function ($http) {
			
			var store = this;
			store.products = [];
			
			//$http.get("products.json").success(function (data) {
			$http.get("http://localhost:3001/api/fprod").success(function (data) {	
				store.products = data;
				console.log(store.products);
			});

			store.deleteProduct = function (id) {

				console.log(id);
				
			   var retVal = confirm("Do you want to continue ?");
               if( retVal == true ){

                console.log("delete gem....");
				$http.delete("http://localhost:3001/api/fprod/"+id)
                .then(function success(response){
                    document.location.reload();
                    console.log(response);
                },
                function err(err){
                    console.log(err);
                })
               }
               else{
               
                  return false;
               } 
			};

			    store.editProduct = function(indice) {

			$http.get("http://localhost:3001/api/fprod/"+indice).success(function (data) {	
				
				console.log(data);
			});  
		    };
		}])

	    .controller("NewProduct", ["$http", function ($http)  {
        var url = 'http://localhost:3001/api/fprod';
        this.product = {
			name:  '',
			description: '',
			price: 0,
			Available: 0,
			images:[""]                
        };
        this.newGem = function(product) {
                console.log("posting data....");
                console.log(product);
                // JSON.stringify(data)
                $http.post(url, this.product)
                .then(function success(response){
                    document.location.reload();
                    console.log(response);
                },
                function err(err){
                    console.log(err);
                })
        };
    }])




    .controller("getids",["$http","$scope", function($http,$scope){
        var store = this;
        this.product = {
			name:  '',
			description: '',
			price: 0,
			Available: 0,
			images:[""]                
        };
        
        store.obetenerid = function (id) {
          
           
            console.log(id);

            console.log("searching gem....");
            $http.get("http://localhost:3001/api/fprod/"+id).then(function success(response){
                console.log(response.data);
                return response.data;
                console.log(response);
            },
            function(rejection) {
                console.log(rejection.data);
            });
           
        };
    }])






.controller("EditProduct", [ "$scope","$http", function ($scope, $http)  {     
    var url = 'http://localhost:3001/api/fprod';
     $scope.products = {
			name:  '',
			description: '',
			price: 0,
			stock: 0,
			images:[""]                
        };
    //GET para llenar select con productos
    $http.get(url).then(function success(response){
        console.log(response);
        $scope.products = response.data.products;
    });
    console.log("cosa:");

    this.editGem = function() {
        console.log($scope.myproduct);   
        var id = $scope.myproduct['_id'];
        console.log(id);
             
    	$http.put(url+"/"+id, $scope.myproduct)
             .then(function success(response){
                document.location.reload();
                 console.log(response);
                 console.log("posting data....");
             },
             function err(err){
                 console.log(err);
             })
    }
}])
}());