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
            templateUrl: 'partials/questions_date.html',
            controller: 'memCtrl',
            header: 'partials/header.html', 
            footer: 'partials/footer.html'
        })
        .when('/questions_type', {
            templateUrl: 'partials/questions_type.html',
            controller: 'memCtrl'
        })
        .when('/questions_couleur', {
            templateUrl: 'partials/questions_couleur.html',
            controller: 'memCtrl'
        })
        .when('/questions_emotion', {
            templateUrl: 'partials/questions_emotion.html',
            controller: 'memCtrl'
        })
        .when('/questions_lieu', {
            templateUrl: 'partials/questions_lieu.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage', {
            templateUrl: 'partials/questions_personnage.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_humain', {
            templateUrl: 'partials/questions_personnage_humain.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_animal', {
            templateUrl: 'partials/questions_personnage_animal.html',
            controller: 'memCtrl'
        })
        .when('/questions_personnage_autre', {
            templateUrl: 'partials/questions_personnage_autre.html',
            controller: 'memCtrl'
        })
        .when('/questions_action', {
            templateUrl: 'partials/questions_action.html',
            controller: 'memCtrl'
        })
        .when('/questions_keywords', {
            templateUrl: 'partials/questions_keywords.html',
            controller: 'memCtrl'
        })
        .when('/questions_titre', {
            templateUrl: 'partials/questions_titre.html',
            controller: 'memCtrl'
        })
        .when('/visualiser', {
            templateUrl: 'partials/visualiser.html'
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