(function(s) {

    var $page = $('#sp-page');
    var sidebar = 0;

    $page.hammer()

    .on('drag', function(e) {


        if (e.gesture.deltaX > 150) {
            return false;
        }
        //if (e.gesture.deltaX < -153) {
          //  return false;
        //}

        if (e.gesture.direction == "right" && !sidebar) {
            $page.css({
                transitionDuration: '0s',
                transform: 'translate3d(' + e.gesture.deltaX + 'px, 0, 0)'
            });
        }
        if (e.gesture.direction == "left" && sidebar) {
            $page.css({
                transitionDuration: '0s',
                transform: 'translate3d(' + (150 + e.gesture.deltaX) + 'px, 0, 0)'
            });
        }
    })


    .on('dragend', function(e) {
        if (e.gesture.direction == "right" && !sidebar) {
            if (e.gesture.deltaX <= 75) {

                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translate3d(0px, 0, 0)'
                })
                sidebar = 0;
            } else {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translate3d(150px, 0, 0)'
                });
                sidebar = 1;
            }
        }
        if (e.gesture.direction == "left" && sidebar) {
            if (e.gesture.deltaX <= -75) {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translate3d(0px, 0, 0)'
                });
                sidebar = 0;
            } else {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translate3d(150px, 0, 0)'
                });
                sidebar = 1;
            }
        }
    })

    $("#dont_detect_swipe_gesture").hammer().on('drag', function(e) {
        e.stopPropagation();
    })
    .on('swipeleft', function(e) {
        e.stopPropagation();
    })
    .on('swiperight', function(e) {
        e.stopPropagation();
    });



    $("#header_container").load("partials/header.html", function(data) {

        $('#sidemenu-button').click(function(event) {
            console.log('lol');
            
            if (sidebar) {
                $page.css({
                    transform: 'translate3d(0px, 0, 0)'
                });
                sidebar = 0;


            } else if (!sidebar) {
                $page.css({
                    transform: 'translate3d(150px, 0, 0)'
                });
                sidebar = 1;
            }
        });
    });



})(jQuery);