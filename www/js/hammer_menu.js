(function(s){

	var $page = $('#sp-page');
	var sidebar = 0;
	
	$page.hammer()
		.on('swiperight', function(e){
			if(sidebar){
				return true;
			}
			$page.css({transform: 'translateX(150px)'});
			sidebar = 1;
		})
		.on('swipeleft', function(e){
			if(!sidebar){
				return true;
			}
			$page.css({transform: 'translateX(0px)'});
			sidebar = 0;
		})
		.on('drag', function(e){
			if(e.gesture.deltaX > 150){
				return false;
			}
			
			if(e.gesture.direction == "right" && !sidebar){
				$page.css({transform: 'translateX(' + e.gesture.deltaX + 'px)'}, 0);
			}
			if(e.gesture.direction == "left" && sidebar){
				$page.css({transform: 'translateX(' + 150 - e.gesture.deltaX + 'px)'}, 0);
			}
			
			
		}).on('dragend', function(e){
			if(e.gesture.direction == "right" && !sidebar){
				if(e.gesture.deltaX <= 75){
					$page.css({transform: 'translateX(0px)'}, 0);
					sidebar = 0;
				}else{
					$page.css({transform: 'translateX(150px)'}, 0);
					sidebar = 1;
				}
			}

			if(e.gesture.direction == "left" && sidebar){
				if(e.gesture.deltaX <= -75){
					$page.css({transform: 'translateX(0px)'}, 0);
					sidebar = 0;
				}else{
					$page.css({transform: 'translateX(150px)'}, 0);
					sidebar = 1;
				}
			}
		})



})(jQuery);

