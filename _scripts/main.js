window.addEventListener('load', onLoad);

function onLoad(){
	// scrolls page bacl to top on reload
	$('html').animate({scrollTop:0}, 1);
    $('body').animate({scrollTop:0}, 1);
    // fades out loading screen
	var loading = document.querySelector('#loading');
	loading.classList.add('fadeOut');
	setTimeout(function(){
		document.querySelector('body').removeChild(loading);
	},800);
};

//splits query selected list into parts and creates new array (in order to concat later)
var bounceUp = Array.prototype.slice.call(document.querySelectorAll('.bounce-up'));
var bounceLeft = Array.prototype.slice.call(document.querySelectorAll('.bounce-left'));
var bounceRight = Array.prototype.slice.call(document.querySelectorAll('.bounce-right'));
var rotate = Array.prototype.slice.call(document.querySelectorAll('.rotate'));

//creates one array of all elements to be targeted
var animateElements = bounceUp.concat(bounceLeft, bounceRight, rotate);

// removes scrolling effects if client width is less than 700px
if (document.documentElement.clientWidth < 700) {
	for (var i=0; i<animateElements.length; i++){
		element = animateElements[i];
		element.classList.add('in-view');
	}; //end for loop
} else {

	window.addEventListener('scroll', respondToScroll);

	// var positionElements = document.querySelectorAll('.main-section');
	// for( var i = 0; i < positionElements.length; i++ ) {
	// 	positionElements[i].setAttribute( 'data-top', positionElements[i].offsetTop );
	// };

	var links = document.querySelectorAll('a');
	var hash, element, elementHeight, elementTop, elementBottom, start, finish;

////// SMOOTH SCROLL (to point on page when link clicked)
	for (var i = 0; i < links.length; i++){
		links[i].addEventListener('click', function(ev){
			//checks if anchor is on current page and hash value is present
			if ((ev.target.pathname === window.location.pathname)&&(ev.target.hash != "")){ 
				//stops default behaviour
				ev.preventDefault();

				//store hash
				hash = ev.target.hash;
				start = window.pageYOffset;
				finish = document.querySelector(hash).getBoundingClientRect().top
				console.log(hash)

				console.log(start, finish);

				$('html, body').animate({
			        scrollTop: $(hash).offset().top
			      	}, 800, function(){
					//adds hash to browser location
						window.location.hash = hash;
					});
			}; //end else/if
		}); //end event listener
	}; //end loop over links

	function respondToScroll(){

		//defines total distance scrolled and height of document
		var windowHeight = window.innerHeight;
		var topScroll = window.pageYOffset;
		var bottomScroll = topScroll+windowHeight;
		var totalHeight = document.querySelector('body').offsetHeight;

		var perScroll = topScroll/(totalHeight-windowHeight) * 100;

//////// Applies the class in-view to each element visible on the screen
		for (var i=0; i<animateElements.length; i++){
			element = animateElements[i];
			elementHeight = element.offsetHeight;
			elementTop = element.getBoundingClientRect().top; //relative to viewport
			elementBottom  = elementTop + elementHeight;

			//defines topInView as an element with its top position being greater than 
			//the top of the window and less than the bottom of the window (similar for bottomInView)
			var topInView = ((elementTop+topScroll >= topScroll) && (elementTop+topScroll <= bottomScroll));
			var bottomInView = ((elementBottom+topScroll >= topScroll) && (elementBottom+topScroll <= bottomScroll));

			//checks if top or bottom of element is in view
			//adds class in-view if visible, removes class if it is not
			if (topInView || bottomInView) {
				element.classList.add('in-view');
			};
		}; //end for loop

		var nav = document.querySelector('#nav-bar');
		var navHeight = nav.offsetHeight;

		if (topScroll < windowHeight/2){
			nav.classList.add('hidden');
			nav.classList.remove('in-view');
		} else {
			nav.classList.remove('hidden');
			nav.classList.add('in-view');
		};


////// Highlights main section that is currently in view
		var mainSection = document.querySelectorAll('.main-section');
		var prevMid = false;
		for( var i = 1; i < mainSection.length; i++ ) {
			element = mainSection[i];
			elementHeight = element.offsetHeight;
			elementTop = element.getBoundingClientRect().top; //relative to viewport
			elementBottom  = elementTop + elementHeight;
			var midPoint = (elementTop + elementBottom)/2;

			//defines topInView as an element with its top position being greater than 
			//the top of the window and less than the bottom of the window (similar for bottomInView)
			var midInView = ((midPoint+topScroll >= topScroll) && (midPoint+topScroll <= bottomScroll));

			//checks if top or bottom of element is in view
			//adds class in-view if visible, removes class if it is not
			if (midInView && !prevMid) {
				document.querySelectorAll('.nav-' + element.id)[0].style.color = '#a62929';
				document.querySelectorAll('.nav-' + element.id)[1].style.color = '#a62929';
				document.querySelectorAll('.nav-' + element.id)[0].style.borderBottom = '2px solid';
				document.querySelectorAll('.nav-' + element.id)[0].style.paddingBottom = '2px';
			} else {
				document.querySelectorAll('.nav-' + element.id)[0].style.color = '#000';
				document.querySelectorAll('.nav-' + element.id)[1].style.color = '#000';
				document.querySelectorAll('.nav-' + element.id)[0].style.borderBottom = '0px';
			};

			prevMid = midInView;
			
		}; //end for loop


	}; // end respondToScroll

}; // end else > 900px

//// Google Analytics //////
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-89881513-1', 'auto');
ga('send', 'pageview');




