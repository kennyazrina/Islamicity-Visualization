$(window).scroll(function(){
		var scrolledX = $(window).scrollTop();
//		console.log(scrolledX);
                if (scrolledX > 2400 && scrolledX < 3030){
                    $('header.info').css({ "top": scrolledX - 2400 + 'px'});
                }
                
		$('#position_marker').css({ "left": 'calc(' + (scrolledX / 47.2) + '% - 5px)',});

		$('.cloud_01').css({ "top": (150 + scrolledX*0.6) + 'px'});
		$('.cloud_02').css({ "top": (400 + scrolledX*0.4) + 'px'});
		$('.cloud_03').css({ "top": (1000 + scrolledX*0.3) + 'px'});
		$('.cloud_04').css({ "top": (1500 + scrolledX*0.8) + 'px'});
		$('.cloud_05').css({ "top": (2000 + scrolledX*0.09) + 'px'});
		
		$('#disgrace_of_a_bird_01').css({ "top": (600 + scrolledX*0.3) + 'px'});
		$('#disgrace_of_a_bird_02').css({ "top": (800 + scrolledX*0.6) + 'px'});
		$('#disgrace_of_a_bird_03').css({ "top": (1000 + scrolledX*0.4) + 'px'});
		
		$('#details').html('scrolledX=' + scrolledX)
		
		//intro parallax
	  $('.intro > h1').css('opacity',((scrolledX-200)*.00175));
		$('.first > h1').css('opacity',((scrolledX-1000)*.00175));
		if (scrolledX<788){
			$('#hot_air_balloon_1').css({ "left": (80 - scrolledX*0.1) + '%'});
			$('#hot_air_balloon_2').css({ "left": (0 + scrolledX*0.1) + '%'});
		}
	  if ( $.fn.makisu.enabled ) {

	      var $maki = $( '.maki' );

	      // Create Makisus

	      $maki.makisu({
	          selector: 'dd',
	          overlap: 0.6,
	          speed: 0.85
	      });


	      // Toggle on click

	      $( '.toggle' ).on( 'click', function() {
	          $( '.list' ).makisu( 'toggle' );
	      });

	      // Disable all links

	      $( '.outro dt a' ).click( function( event ) {
	          event.preventDefault();
	      });


		  } else {

		      $( '.warning' ).show();
		  }
	});
	/*
	guiders.createGuider({
		 id: "guider1",
	   attachTo: ".stem",
	   buttons: [{name: "Close", onclick: guiders.next()}],
		 title : null,
	   description: "Click on stem to disperse the florets!",
	   position: 3,
	   width: 200
	 }).show();*/
 

	