(function(s) {

    var $page = $('#sp-page');
    var sidebar = 0;

    $page.hammer()

    .on('swiperight', function(e) {
        if (sidebar) {
            return true;
        }
        $page.css({
            transform: 'translateX(150px)'
        });
        sidebar = 1;
    })


    .on('swipeleft', function(e) {
        if (!sidebar) {
            return true;
        }
        $page.css({
            transform: 'translateX(0px)'
        });
        sidebar = 0;
    })


    .on('drag', function(e) {


        if (e.gesture.deltaX > 153) {
            return false;
        }

        if (e.gesture.direction == "right" && !sidebar) {
            $page.css({
                transitionDuration: '0s',
                transform: 'translateX(' + e.gesture.deltaX + 'px)'
            });
        }
        if (e.gesture.direction == "left" && sidebar) {
            $page.css({
                transitionDuration: '0s',
                transform: 'translateX(' + (150 + e.gesture.deltaX) + 'px)'
            });
        }
    })


    .on('dragend', function(e) {
        if (e.gesture.direction == "right" && !sidebar) {
            if (e.gesture.deltaX <= 75) {

                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translateX(0px)'
                })
                sidebar = 0;
            } else {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translateX(150px)'
                });
                sidebar = 1;
            }
        }
        if (e.gesture.direction == "left" && sidebar) {
            if (e.gesture.deltaX <= -75) {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translateX(0px)'
                });
                sidebar = 0;
            } else {
                $page.css({
                    transitionDuration: '0.3s',
                    transform: 'translateX(150px)'
                });
                sidebar = 1;
            }
        }
    })


    $("#header").load("partials/header.html", function(data) {

        $('#sidemenu-button').click(function(event) {
            if (sidebar) {
                $page.css({
                    transform: 'translateX(0px)'
                });
                sidebar = 0;


            } else if (!sidebar) {
                $page.css({
                    transform: 'translateX(150px)'
                });
                sidebar = 1;
            }
        });
    });

})(jQuery);