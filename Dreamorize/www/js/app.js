document.addEventListener('deviceready', function() {

    //Ici du code au lancement de l'appli

}, false);

var app = angular.module('app', []);


app.directive('jqdatepicker', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModelCtrl) {
            element.datepicker({
                dateFormat: 'yy-mm-dd',
                onSelect: function(date) {
                    scope.date = date;
                    scope.$apply();
                }
            });
        }
    };
});

app.directive('staticInclude', function($http, $templateCache, $compile) {
    return function(scope, element, attrs) {
        var templatePath = attrs.staticInclude;
        $http.get(templatePath, { cache: $templateCache }).success(function(response) {
            var contents = element.html(response).contents();
            $compile(contents)(scope);
        });
    };
});

app.factory('questionnaireFactory', function(){

    var ListService = {};


    var date;
    var type;
    var titre;

    var active_categorie_personnage;
    var active_sous_categorie_personnage;
    var personnages = {
        datas: []
    };

    var active_location_category;
    var completeLocations = {
        datas: []
    };

    var numero_question;
    var tags = new Array();
    var actions = new Array();
    var colors = new Array();
    
    var completeActions = {
        datas: []
    };


    ListService.titre = titre;
    ListService.date = date;
    ListService.type = type;
    ListService.active_categorie_personnage = active_categorie_personnage;
    ListService.active_sous_categorie_personnage = active_sous_categorie_personnage;
    ListService.personnagesArray = personnages.datas;

    ListService.active_location_category = active_location_category;
    ListService.locationsArray = completeLocations.datas;

    ListService.colorsArray = colors;

    ListService.actionsArray = actions;
    ListService.completeActionsArray = completeActions.datas;

    ListService.tagsArray = tags;

    ListService.numeroQuestion = numero_question;


    ListService.GetNumeroQuestion = function(){
        return "numero question";
    }

    // Personnages
    ListService.addPersonnage = function(cat, sous_cat, nom_personnage) { 
        personnages.datas.push({
            "categorie_personnage": cat,
            "sous_categorie_personnage": sous_cat,
            "nom_personnage": nom_personnage
        });
    }
    ListService.resetPersonnages = function(){
        personnages.datas.clear();
    }
    // ListService.getPersonnages = function() { 
    //     return personnages.datas; 
    // }


    // Actions
    ListService.addColor = function(action){
        colors.push(action);
    }
    ListService.resetColors = function() { 
        colors.clear();
    }

    // Actions completes (avec categorie)
    ListService.addCompleteLocation = function(location, location_category){
        completeLocations.datas.push({
            "location_name": location,
            "location_category": location_category
        });
    }
    ListService.resetCompleteLocation = function() { 
        completeActions.datas.clear();
    }

    
    // Actions
    ListService.addAction = function(action){
        actions.push(action);
    }
    ListService.resetActions = function() { 
        actions.clear();
    }

     // Actions completes (avec categorie)
    ListService.addCompleteAction = function(action, categorie_action){
        completeActions.datas.push({
            "nom_action": action,
            "categorie_action": categorie_action
        });
    }
    ListService.resetCompleteActions = function() { 
        completeActions.datas.clear();
    }

    // Tags
    ListService.addTag = function(tag){
        tags.push(tag);
    }
    ListService.resetTags = function() { 
        tags.clear();
    }

    return ListService;
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'partials/home.html'
        })
        .when('/intro', {
            templateUrl: 'partials/intro.html'
        })
        .when('/sidebar', {
            templateUrl: 'partials/sidebar.html'
        })
        .when('/memoriser', {
            templateUrl: 'partials/memoriser.html'
        })
        .when('/vocal', {
            templateUrl: 'partials/vocal.html'
        })
        .when('/vocal_2', {
            templateUrl: 'partials/vocal_2.html'
        })
        .when('/vocal_3', {
            templateUrl: 'partials/vocal_3.html'
        })
        .when('/vocal_4', {
            templateUrl: 'partials/vocal_4.html'
        })
        .when('/vocal_5', {
            templateUrl: 'partials/vocal_5.html'
        })
        .when('/questions_date', {
            templateUrl: 'partials/questions/questions_date.html',
            controller: 'memCtrl',
            header: 'partials/header.html', 
            footer: 'partials/footer.html'
        })
        .when('/questions_type', {
            templateUrl: 'partials/questions/questions_type.html',
            controller: 'memCtrl'
        })
        .when('/questions_couleur', {
            templateUrl: 'partials/questions/questions_couleur.html',
            controller: 'memCtrl'
        })
        .when('/questions_emotion', {
            templateUrl: 'partials/questions/questions_emotion.html',
            controller: 'memCtrl'
        })
        .when('/questions_lieu', {
            templateUrl: 'partials/questions/questions_lieu.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage', {
            templateUrl: 'partials/questions/questions_personnage.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_humain', {
            templateUrl: 'partials/questions/questions_personnage_humain.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_animal', {
            templateUrl: 'partials/questions/questions_personnage_animal.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_autre', {
            templateUrl: 'partials/questions/questions_personnage_autre.html',
            controller: 'memCtrl'
        })
        .when('/questions_action', {
            templateUrl: 'partials/questions/questions_action.html',
            controller: 'memCtrl'
        })
        .when('/questions_keywords', {
            templateUrl: 'partials/questions/questions_keywords.html',
            controller: 'memCtrl'
        })
        .when('/questions_titre', {
            templateUrl: 'partials/questions/questions_titre.html',
            controller: 'memCtrl'
        })
        .when('/valider_reve', {
            templateUrl: 'partials/questions/valider_reve.html',
            controller: 'memCtrl'
        })
        .when('/visualiser', {
            templateUrl: 'partials/visualiser.html',
            controller: 'explorationCtrl'
        })
        .when('/partager', {
            templateUrl: 'partials/partager.html'
        })
        .when('/explorer', {
            templateUrl: 'partials/explorer.html'
        })


        .otherwise({
            redirectTo: '/home'
        })

}).run(function($rootScope, $route) {
    $rootScope.layoutPartial = function(partialName) { 
        return $route.current[ partialName ]
    };
});