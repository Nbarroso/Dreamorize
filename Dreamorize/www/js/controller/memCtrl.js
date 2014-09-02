function memCtrl($scope, questionnaireFactory) {

    var couleurs = new Array();
    $scope.pageLevel = 0;
    $scope.nbPersonnage = 0;
    $scope.activePersonnage = "";
    $scope.x = {
        activePersonnage: "default"
    };

    $scope.numero_question = 5;

    $scope.header = {name: "partials/header.html", url: "partials/header.html"};
    $scope.footer = {name: "partials/footer.html", url: "partials/footer.html"};


    $scope.updateNumeroQuestion = function(new_numero_question){
        
        $scope.numero_question = new_numero_question;
        
    }


    $scope.increaseLevel = function() {
        $scope.pageLevel++;
        //console.log($scope.pageLevel);
        //console.log("page level après click :  + $scope.pageLevel);
    };


    $scope.addDate = function(date) {

        $scope.$parent.$parent.date = date;

        if(date == "lastNight"){
            var today = new Date();
            var dd = today.getDate()-1;
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10) {
                dd='0'+dd
            } 
            if(mm<10) {
                mm='0'+mm
            } 
            today = yyyy+'-'+mm+'-'+dd;
            $scope.$parent.$parent.date = today;
        }
        console.log($scope.$parent.$parent.date);
        
    };


    $scope.addType = function(type) {
        $scope.$parent.$parent.type = type;
        console.log($scope.$parent.$parent.type);
    };


    $scope.addCouleur = function(code_couleur) {
        var addColor = true;

        // Si la couleur cliquée est déjà sélectionnée, on la supprime de la liste
        for (var i = 0; i < questionnaireFactory.colorsArray.length; i++) {
            if (questionnaireFactory.colorsArray[i] == code_couleur) {
                questionnaireFactory.colorsArray.splice(i, 1);
                addColor = false;
            }
        }
        if (addColor) {
            questionnaireFactory.addColor(code_couleur);
        }

        console.log(questionnaireFactory.colorsArray);

    };


    $scope.addEmotion = function(joie, attirance, peur, surprise, tristesse, degout, colere) {
        $scope.$parent.$parent.joie = joie;
        $scope.$parent.$parent.attirance = attirance;
        $scope.$parent.$parent.peur = peur;
        $scope.$parent.$parent.surprise = surprise;
        $scope.$parent.$parent.tristesse = tristesse;
        $scope.$parent.$parent.degout = degout;
        $scope.$parent.$parent.colere = colere;
    };


    $scope.addLieu = function(categorie_lieu) {
        questionnaireFactory.active_location_category = categorie_lieu;
    };

    $scope.addEntireLocation = function(nom_lieu) {
        var categorie_lieu = questionnaireFactory.active_location_category;
        questionnaireFactory.addCompleteLocation(nom_lieu, categorie_lieu);
    };

    $scope.addPersonnage = function(categorie_personnage, sous_categorie_personnage) {
        questionnaireFactory.active_categorie_personnage = categorie_personnage;
        questionnaireFactory.active_sous_categorie_personnage = sous_categorie_personnage;
    };


    $scope.addPersonnageData = function(nom_personnage) {
        var cat = questionnaireFactory.active_categorie_personnage;
        var sous_cat = questionnaireFactory.active_sous_categorie_personnage;
        questionnaireFactory.addPersonnage(cat, sous_cat, nom_personnage);
        console.log(questionnaireFactory.personnagesArray);
    }


    $scope.addAction = function(action) {
        var actionDoesntExist = true;

        questionnaireFactory.actionsArray.forEach(function(entry) {
            if(action == entry){
                actionDoesntExist = false;
            }
        });
        
        if(actionDoesntExist){
            questionnaireFactory.addAction(action);
        }
    }

    $scope.addCategorieAction = function(categorie_action) {
        var nbAction = questionnaireFactory.actionsArray.length;
        var lastAction = questionnaireFactory.actionsArray[nbAction-1];

        questionnaireFactory.addCompleteAction(lastAction, categorie_action);
        console.log(questionnaireFactory.completeActionsArray);
    }

    $scope.addTag = function(tag) {
        var tagDoesntExist = true;

        questionnaireFactory.tagsArray.forEach(function(entry) {
            if(tag == entry){
                tagDoesntExist = false;
            }
        });
        

        if(tagDoesntExist){
            questionnaireFactory.addTag(tag);
        }
        console.log(questionnaireFactory.tagsArray);   
    }


    $scope.addTitre = function(titre) {
        $scope.$parent.$parent.titre = titre;
        
    };


    $scope.postReve = function() {


        if ($scope.$parent.$parent.date != null 
            && $scope.$parent.$parent.type != null 
            && $scope.$parent.$parent.titre != null) {

            var date_reve = $scope.$parent.$parent.date;
            var type_reve = $scope.$parent.$parent.type;
            var titre_reve = $scope.$parent.$parent.titre;

            var emotion_joie = $scope.$parent.$parent.joie;
            var emotion_attirance = $scope.$parent.$parent.attirance;
            var emotion_peur = $scope.$parent.$parent.peur;
            var emotion_surprise = $scope.$parent.$parent.surprise;
            var emotion_tristesse = $scope.$parent.$parent.tristesse;
            var emotion_degout = $scope.$parent.$parent.degout;
            var emotion_colere = $scope.$parent.$parent.colere;

            var jsonLieux = JSON.stringify(questionnaireFactory.locationsArray);

            var jsonColors = JSON.stringify(questionnaireFactory.colorsArray);

            var jsonPersonnages = JSON.stringify(questionnaireFactory.personnagesArray);

            var jsonActions = JSON.stringify(questionnaireFactory.completeActionsArray);

            var jsonTags = JSON.stringify(questionnaireFactory.tagsArray);

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
                    lieux: jsonLieux,
                    personnagestab: jsonPersonnages,
                    actions: jsonActions,
                    tags: jsonTags
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
            var erreur = "";
            if($scope.$parent.$parent.date == null){
                erreur += "La date n'est pas renseignée. ";
            }
            if($scope.$parent.$parent.type == null){
                erreur += "Le type n'est pas renseigné. ";
            }
            if($scope.$parent.$parent.titre == null){
                erreur += "Le titre n'est pas renseigné. ";
            }


            alert(erreur);
        }

        $scope.$parent.$parent.date = "";
        $scope.$parent.$parent.type = "";
        $scope.$parent.$parent.titre = "";
        $scope.$parent.$parent.joie = 0;
        $scope.$parent.$parent.attirance = 0;
        $scope.$parent.$parent.peur = 0;
        $scope.$parent.$parent.surprise = 0;
        $scope.$parent.$parent.tristesse = 0;
        $scope.$parent.$parent.degout = 0;
        $scope.$parent.$parent.colere = 0;


        //var categorie_lieu = $scope.$parent.$parent.categorie_lieu;
        //var lieu = "";
        //questionnaireFactory.resetPersonnages();
        //$scope.$parent.couleurs.clear();
    }
}