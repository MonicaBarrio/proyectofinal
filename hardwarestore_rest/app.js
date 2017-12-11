/*global angular, $http */
(function () {

    "use strict";

// ANGULAR MODULE/APP (gemStore):

var app = angular.module("ferStore", [])

// CONTROLLERS:
// para uso GET y mostrar lista 
.controller("StoreController", ["$http", function ($http) {

    var store = this;
    var url = 'http://localhost:3001/api/fprod';

    store.users = [];

    store.userId = '';
    store.username = '';
    store.password = '';

    store.user = 'admin';
    store.status = '';

    store.products   = [];
    store.product    = [];

    store.actions = [];

    store.newProduct =  {
        name:  '',
        description: '',
        price: 0,
        Available: 0,
        images:'images/imagen20.jpg'                
    };

    store.newUserData =  {
        username:  '',
        password: '',
        tipo: 'user'               
    };

    store.buyData =  {
        prodId: '',
        quantity:  0,
        creditCard: '',
        ccCode: '',
        date: ''               
    };


//$http.get("products.json").success(function (data) {
    $http.get("http://localhost:3001/api/fprod").success(function (data) {	
        store.products = data;
        //res.json({msg: 'This is CORS-enabled for all origins!'})
        console.log(store.products);
    });

    $http.get("http://localhost:3001/api/sadmin/actions").success(function (data) {  
        store.actions = data;     
        console.log(store.actions);     
    });

    $http.get("http://localhost:3001/api/login").success(function (data) {  
        store.users = data;     
        console.log(store.users);     
    });

    store.login = function () {
        console.log('login '+ store.username + ' '+ store.password);
        console.log(store.users);

        var found = '';//store.users[0].username;
        console.log(store.users[0]['username']+" "+store.users.length);
        var i =0;
        for (i = 0; i < store.users.length; i++) { 
            console.log("i "+i);
            console.log(store.users[i]['username']+" "+store.username);
            if(store.users[i]['username'] == store.username && store.users[i]['password'] == store.password){

                found += store.users[i]['tipo'];
                console.log("found "+found);

                if(store.users[i]['tipo']=='sadmin'){
                    store.status = 'saList';
                }else{
                    store.status = 'list';
                }

                store.user = store.users[i]['tipo'];
                store.username = store.users[i]['username'];
                store.userId = store.users[i]['_id'];

                console.log('status:',store.status);
                break; 
            }
        }
    };

    store.addUser = function() {
        store.status = 'reguser';
    };     

    store.newUser = function() {

        console.log(store.newUserData);
        // JSON.stringify(data)
        $http.post('http://localhost:3001/api/login', store.newUserData)
        .then(function success(response){
            store.status='list';
            store.user = 'user';

            store.user = response.data.tipo;
            store.username = response.data.username;
            store.userId = response.data._id;

            console.log(response);

        },
        function err(err){
            console.log(err);
        })
    };

    store.deleteProduct = function (id) {

        console.log(id);

        var retVal = confirm("Do you want to continue ?");
        if( retVal == true ){

            console.log("delete gem....");
            $http.delete("http://localhost:3001/api/fprod/"+id+"/"+store.username+"/"+store.userId)
            .then(function success(response){

                console.log(response);
                store.status='list';
                $http.get("http://localhost:3001/api/fprod").success(function (data) {  
                    store.products = data;
                });
            },
            function err(err){
                console.log(err);
            })
        }
        else{
            //document.write ("User does not want to continue!");
            return false;
        } 
    };

    store.editProduct = function(indice) {

        $http.get("http://localhost:3001/api/fprod/"+indice).success(function (data) {	

            console.log(data);
            store.status = 'edit';
            store.product = data;
        });  
    };

    store.editItem = function(product) {

        var id = product;
        console.log(id);

        $http.put(url+"/"+id+"/"+store.username+"/"+store.userId, store.product)
        .then(function success(response){

            console.log(response);
            console.log("posting data....");
            store.status='list';
            $http.get("http://localhost:3001/api/fprod").success(function (data) {  
                store.products = data;
                console.log(store.products);
            });
        },
        function err(err){
            console.log(err);
        })
    };



    store.addProduct = function() {



        store.status = 'add';
    //store.product = [];

    };

    store.newItem = function() {
        console.log("posting data TO: "+url);
        console.log(store.newProduct);
        // JSON.stringify(data)
        $http.post(url+"Add/"+store.username+"/"+store.userId, store.newProduct)
        .then(function success(response){

            console.log(response);
        store.status='list'; //?username=' + user.name + '&password=' + user.password;
        $http.get("http://localhost:3001/api/fprod").success(function (data) {  
            store.products = data;
        });

        },
        function err(err){
            console.log(err);
        })
    };


    store.buyProduct = function(product) {    

        $http.get("http://localhost:3001/api/fprod/"+product).success(function (data) {  
            store.newProduct = data;
        });

        store.buyData.prodId = product;
        store.status = 'buy';

    //store.product = [];
    };

    store.newBuy= function() {

    // JSON.stringify(data)

    store.buyData.date = new Date();
    $http.post(url+"AddBuy/"+store.username+"/"+store.userId, store.buyData)
    .then(function success(response){
        store.status='list'; //?username=' + user.name + '&password=' + user.password;
        $http.get("http://localhost:3001/api/fprod").success(function (data) {  
            store.products = data;
        });

    },
    function err(err){
        console.log(err);
    })
    };

}])
}());