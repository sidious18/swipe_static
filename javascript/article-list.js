(function(){
	$(document).ready(function(){
		var articleSlide = ".article-slider-cont";
		var articleTop = ".article-top";
		var articleSlider = '.article-slider';
		var mainMenu = ".main-container-menu";
		var articleTitle = '.main-container-article-title';
		var articleDescription = ".main-container-article-description"
		var articleContList = ".article-cont-list";

		function setArticleBlockHeight(){
			var topTextHeight = $(articleTitle).outerHeight(true)+$(articleDescription).outerHeight(true);
			var artileHeight = $(mainMenu).outerHeight()-topTextHeight;

			$(articleContList).css('height',artileHeight);
			$(articleContList).mCustomScrollbar({
				theme:'light-thick',
				scrollInertia: 300,
				advanced:{ updateOnContentResize: true },
				live: "on"
			});

		}

		function makeSliders(){
			for(i=0; i < $(articleSlider).length; i++){
				$(articleSlider).eq(i).bxSlider();
			}
		}

		function rememberArticleHeight(){
			for(i=0; i< $(articleSlide).length; i++){
				$(articleSlide).eq(i)[0].articleHeigth = $(articleSlide).eq(i).outerHeight();
				$(articleSlide).eq(i).css('height','0');	
			}
		}

		makeSliders();
		rememberArticleHeight();
		setArticleBlockHeight();

		$(articleTop).click(function(){
			
			if(!$(this).next(articleSlide).hasClass('opened')){
				

				$(this).addClass('opened');
				$(this).next(articleSlide).animate({
					height: $(this).next(articleSlide)[0].articleHeigth
				},
				{
					duration:300,
					progress:function(){
						$(articleContList).mCustomScrollbar("scrollTo",$(this).prev(articleTop),{
							scrollInertia: 45
						});
					},
					done:function(){
						$(this).addClass('opened');
					}
				})
				
			}
			else{
				var accordButton = $(this);
				var animateStep = accordButton.next(articleSlide)[0].articleHeigth / 30;
				var slider = $(articleContList);
				var callCount = 0;
				var repeater = setInterval(function () {
				  if (callCount < 30) {
				  	console.log(accordButton.position().top);
				  	thisStep = accordButton.next(articleSlide)[0].articleHeigth - (animateStep*callCount);
				    accordButton.next(articleSlide).css('height', thisStep+'px');
				    slider.mCustomScrollbar("update");
				    
				    callCount += 1;
				  } else {
				  	accordButton.next(articleSlide).css('height', 0);
				  	accordButton.removeClass('opened');
				  	accordButton.next(articleSlide).removeClass('opened');
				  	slider.mCustomScrollbar("update");
				    clearInterval(repeater);
				  }
				}, 1);

			}
		})

	
	})
})()