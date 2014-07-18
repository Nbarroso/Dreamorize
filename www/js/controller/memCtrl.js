function memCtrl($scope) {
    $scope.pageLevel = 0;
    //console.log("page level : " + $scope.pageLevel);

    $scope.increaseLevel = function() {
        $scope.pageLevel++;
        console.log($scope.pageLevel);
        //console.log("page level après click : " + $scope.pageLevel);
    };

    //$scope.date = 0;
    //$scope.type = 0;
    //$scope.titre = 0;

    $scope.addDate = function(date) {
        $scope.$parent.date = date;
        console.log($scope.$parent.date + " // " + $scope.$parent.type + " // " + $scope.$parent.titre);
    };

    $scope.addType = function(type) {
        $scope.$parent.type = type;
        console.log($scope.$parent.date + " // " + $scope.$parent.type + " // " + $scope.$parent.titre);
    };

    $scope.addEmotion = function(joie, attirance, peur, surprise, tristesse, degout, colere) {


        $scope.$parent.joie = joie;
        $scope.$parent.attirance = attirance;
        $scope.$parent.peur = peur;
        $scope.$parent.surprise = surprise;
        $scope.$parent.tristesse = tristesse;
        $scope.$parent.degout = degout;
        $scope.$parent.colere = colere;
        //console.log($scope.$parent.date + " // " + $scope.$parent.type + " // " + $scope.$parent.titre);
    };

    $scope.addTitre = function(titre) {
        $scope.$parent.titre = titre;
        console.log($scope.$parent.date + " // " + $scope.$parent.type + " // " + $scope.$parent.titre);
    };

    $scope.postReve = function() {

        console.log($scope.date + " // " + $scope.type + " // " + $scope.titre);
        if ($scope.date != null && $scope.type != null && $scope.titre != null) {

            var date_reve = $scope.$parent.date;
            var type_reve = $scope.$parent.type;
            var titre_reve = $scope.$parent.titre;
            var emotion_joie = $scope.$parent.joie;
            var emotion_attirance = $scope.$parent.attirance;
            var emotion_peur = $scope.$parent.peur;
            var emotion_surprise = $scope.$parent.surprise;
            var emotion_tristesse = $scope.$parent.tristesse;
            var emotion_degout = $scope.$parent.degout;
            var emotion_colere = $scope.$parent.colere;


            //console.log("joie : " + emotion_joie);

            jQuery.ajax({

                type: "GET",
                url: "http://dreamorize.meximas.com/back_office/app/insertFromMobile.php",
                data: {
                    date: date_reve,
                    type: type_reve,
                    titre: titre_reve,
                    joie : emotion_joie,
                    attirance : emotion_attirance,
                    peur : emotion_peur,
                    surprise : emotion_surprise,
                    tristesse : emotion_tristesse,
                    degout : emotion_degout,
                    colere : emotion_colere
                },
                error: function(xhr, status, error) {
                    alert("Erreur : le rêve n'a pas pu s'enregistrer.");
                },
                success: function(data, status, XHR) {
                    console.log("requête réussie");
                    console.log(data['responseText']);
                }
            });
        } else {
            alert("Les informations sur le rêve ne sont pas renseignées.");
        }

        $scope.$parent.date = "";
        $scope.$parent.type = "";
        $scope.$parent.titre = "";
        $scope.$parent.joie = 0;
        $scope.$parent.attirance = 0;
        $scope.$parent.peur = 0;
        $scope.$parent.surprise = 0;
        $scope.$parent.tristesse = 0;
        $scope.$parent.degout = 0;
        $scope.$parent.colere = 0;

    }
}