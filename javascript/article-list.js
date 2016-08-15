(function(){
	$(document).ready(function(){
		var articleSlide = ".article-slider-cont";
		var articleTop = ".article-top";
		var articleSlider = '.article-slider';
		var mainMenu = ".main-container-menu";
		var articleBox = ".main-container-article";
		var articleTitle = '.main-container-article-title';
		var articleDescription = ".main-container-article-description"
		var articleContList = ".article-cont-list";
		var articleHeader = ".main-container-header";
		var mainMenuHeight = $(mainMenu).outerHeight();
		var topTextHeight;
		var articleHeight;

		function setArticleBlockHeight(){
			topTextHeight = $(articleTitle).outerHeight(true)+$(articleDescription).outerHeight(true);
			articleHeight = $(mainMenu).outerHeight()-topTextHeight;
			$(articleContList).css('height',articleHeight);
			$(articleContList).mCustomScrollbar({
				theme:'light-thick',
				scrollInertia: 300,
				alwaysShowScrollbar: 2,
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
			$(articleHeader).eq(0)[0].articleHeigth = $(articleHeader).eq(0).outerHeight(true) + 15;
			$(articleHeader).eq(0).css('height', $(articleHeader).eq(0)[0].articleHeigth+'px');
		}

		function customAnimation(elem, value, finalFunc, finalFuncElem){

			var animateStep = value / 30;
			var slider = $(articleContList);
			var callCount = 0;
			var repeater = setInterval(function () {
			if (callCount < 30) {
				
			  	var thisStep = elem.next(articleSlide)[0].articleHeigth - (animateStep*callCount);
			    elem.next(articleSlide).css('height', thisStep+'px');
				callCount += 1;
				slider.mCustomScrollbar("update");	 
			} else {
				
			  	elem.next(articleSlide).css('height', 0);
			  	elem.removeClass('opened');
			  	elem.next(articleSlide).removeClass('opened');
			  	slider.mCustomScrollbar("update");
			  	if(finalFunc != undefined && finalFuncElem != undefined){
			  		finalFunc(finalFuncElem);
			  	}
			    clearInterval(repeater);
			    }
			}, 1);
		}

		function articleListAnimation(elem, value, finalFunc, finalFuncVal){
			var animateStep = (value - articleHeight) / 12;
			var slider = $(articleContList);
			var callCount = 0;
			var repeater = setInterval(function () {
			if (callCount < 12) {
			  	var thisStep = articleHeight + (animateStep*callCount);
			  	slider.mCustomScrollbar("update");
			    elem.closest(slider).css('height',thisStep+'px');
				callCount += 1;
			} else {
				slider.mCustomScrollbar("update");
			  	elem.closest(slider).css('height',thisStep+'px');
			  	clearInterval(repeater);
			  	slider.addClass('opened');
			  	finalFunc(finalFuncVal);
			    }
			}, 1);
		}

		function animateSlider(elem, finalFunc,finalFuncElem ){
			if(!elem.hasClass('opened')){
				elem.next(articleSlide).animate({
					height: elem.next(articleSlide)[0].articleHeigth
				},
				{
					duration:300,
					progress:function(){
						$(articleContList).mCustomScrollbar("scrollTo",elem,{
							scrollInertia: 45
						});
					},
					done:function(){
						elem.addClass('opened');
					}
				})
				
			}
			else{
				customAnimation(elem, elem.next(articleSlide)[0].articleHeigth, closeAllAnimation, elem);
			}
		}

		function closeAllAnimation(elem){
			for (i=0; i<elem.closest(articleBox).find(articleTop).length; i++){
				console.log(elem.closest(articleBox).find(articleTop).eq(i).hasClass('opened'));
				if(elem.closest(articleBox).find(articleTop).eq(i).hasClass('opened')){
					break;
				}
				if((i+1)==elem.closest(articleBox).find(articleTop).length){
					console.log("HELLO");
					elem.closest(articleBox).find(articleHeader).css("height", $(articleHeader).eq(0)[0].articleHeigth + 'px');
					elem.closest(articleContList).animate({
						height: articleHeight},
						1, function() {
							$(this).removeClass('opened');
					});
				}
			}
		}

		$(articleTop).click(function(){
			var ifHeaderTextShowed;
			var clickedObj = $(this);
			for (i=0; i<$(this).closest(articleBox).find(articleTop).length; i++){
				ifHeaderTextShowed = true;
				if($(articleTop).eq(i).hasClass('opened')){
					ifHeaderTextShowed = false;
					break;
				}
			}
			if(ifHeaderTextShowed){
				if(!$(articleContList).hasClass('opened')){
					$(this).closest(articleBox).find(articleHeader).css("height", 0);
					articleListAnimation($(this), mainMenuHeight,animateSlider,clickedObj);
				}
			}
			else{
				animateSlider(clickedObj);
			}		
			
		})


		makeSliders();
		rememberArticleHeight();
		setArticleBlockHeight();
	
	})
})()