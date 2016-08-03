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
				scrollInertia: 300
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

		$(articleTop).click(function(){

			if(!$(this).next(articleSlide).hasClass('opened')){
				$(this).addClass('opened');
				$(this).next(articleSlide).animate({
					height: $(this).next(articleSlide)[0].articleHeigth
				},300,function(){
					$(this).addClass('opened');
				})
			}
			else{
				$(this).removeClass('opened');
				$(this).next(articleSlide).animate({
					height: 0
				},300,function(){
					$(this).removeClass('opened');
				})
			}
		})

		makeSliders();
		rememberArticleHeight();
		setArticleBlockHeight();

	})
})()