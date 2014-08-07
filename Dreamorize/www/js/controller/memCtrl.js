function memCtrl($scope) {

    var couleurs = new Array();

    $scope.pageLevel = 0;
    $scope.nbPersonnage = 0;
    $scope.activePersonnage = "";

    $scope.sous_categorie_personnage = 0;

    var personnage = {
        datas: []
    };


    $scope.x = {
        activePersonnage: "default"
    };


    //console.log("page level : " + $scope.pageLevel);
    $scope.increaseLevel = function() {
        $scope.pageLevel++;
        console.log($scope.pageLevel);
        //console.log("page level après click : " + $scope.pageLevel);
    };


    $scope.addDate = function(date) {
        $scope.$parent.date = date;
        console.log(date);
    };


    $scope.addType = function(type) {
        $scope.$parent.type = type;
    };


    $scope.addCouleur = function(code_couleur) {

        var addColor = true;
        for (var i = 0; i < couleurs.length; i++) {
            if (couleurs[i] == code_couleur) {
                couleurs.splice(i, 1);
                addColor = false;
            }
        }
        if (addColor) {
            couleurs.push(code_couleur);
        }
        console.log(couleurs.length + " couleurs :")
        for (var i = 0; i < couleurs.length; i++) {
            console.log(couleurs[i]);
        }
        $scope.$parent.couleurs_liste = couleurs;
    };


    $scope.addEmotion = function(joie, attirance, peur, surprise, tristesse, degout, colere) {
        $scope.$parent.joie = joie;
        $scope.$parent.attirance = attirance;
        $scope.$parent.peur = peur;
        $scope.$parent.surprise = surprise;
        $scope.$parent.tristesse = tristesse;
        $scope.$parent.degout = degout;
        $scope.$parent.colere = colere;
    };


    $scope.addLieu = function(categorie_lieu) {
        $scope.$parent.categorie_lieu = categorie_lieu;
    };


    $scope.addPersonnage = function(categorie_personnage, sous_categorie_personnage) {
        $scope.$parent.categorie_personnage = categorie_personnage;
        $scope.sous_categorie_personnage = sous_categorie_personnage;
        $scope.nbPersonnage++;
        $scope.sous_categorie_personnage++;
        console.log("sous categorie avant : " + $scope.sous_categorie_personnage);

    };

    $scope.addPersonnageData = function(categorie_personnage, sous_categorie_personnage, nom_personnage) {

        personnage.datas.push({
            "categorie_personnage": categorie_personnage,
            "sous_categorie_personnage": sous_categorie_personnage,
            "nom_personnage": nom_personnage
        });
        console.log($scope.sous_categorie_personnage);
        console.log(personnage.datas);
    }


    $scope.addTitre = function(titre) {
        $scope.$parent.titre = titre;
    };

    $scope.postReve = function() {

        if ($scope.date != null && $scope.type != null && $scope.titre != null) {

            var date_reve = $scope.$parent.date;
            var type_reve = $scope.$parent.type;
            var titre_reve = $scope.$parent.titre;
            //var couleur_reve = $scope.$parent.couleur;

            var emotion_joie = $scope.$parent.joie;
            var emotion_attirance = $scope.$parent.attirance;
            var emotion_peur = $scope.$parent.peur;
            var emotion_surprise = $scope.$parent.surprise;
            var emotion_tristesse = $scope.$parent.tristesse;
            var emotion_degout = $scope.$parent.degout;
            var emotion_colere = $scope.$parent.colere;

            var categorie_lieu = $scope.$parent.categorie_lieu;
            var lieu = "";
            var jsonColors = JSON.stringify($scope.$parent.couleurs_liste);

            jQuery.ajax({

                type: "GET",
                url: "http://dreamorize.meximas.com/back_office/app/insertFromMobile.php",
                data: {
                    date: date_reve,
                    type: type_reve,
                    titre: titre_reve,
                    couleurs: jsonColors,
                    joie: emotion_joie,
                    attirance: emotion_attirance,
                    peur: emotion_peur,
                    surprise: emotion_surprise,
                    tristesse: emotion_tristesse,
                    degout: emotion_degout,
                    colere: emotion_colere,
                    categorie_lieu: categorie_lieu,
                    lieu: lieu
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

        var categorie_lieu = $scope.$parent.categorie_lieu;
        var lieu = "";
        //$scope.$parent.couleurs.clear();
    }
}