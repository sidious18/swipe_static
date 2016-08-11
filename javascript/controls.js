(function($){

	$(document).ready(function(){

		var controlCheckInput = ".control-checkbox-cont input";
		var categoryChecker = ".main-container-category-checker";
		var subcategoryChecker = ".main-container-subcategory-checker";
		var categoryBox = '.main-container-menu-category';
		var categorySwitcher ='.main-container-menu-switcher';

		function checkControlCheckbox(){
			for(i=0; i<$(controlCheckInput).length; i++){
				if($(controlCheckInput).eq(i)[0].checked){
					$(controlCheckInput).eq(i).next('label').addClass('enabled');
				}
				else{
					$(controlCheckInput).eq(i).next('label').addClass('disabled');
				}
			}
		}

		checkControlCheckbox();

		$(controlCheckInput).click(function(e){
			if($(this)[0].checked){
				$(this).next('label').removeClass('disabled');
				$(this).next('label').addClass('enabled');
			}
			else{
				$(this).next('label').addClass('disabled');
				$(this).next('label').removeClass('enabled');
			}
		})

		$(subcategoryChecker).click(function(){
			for(i=0; i < $(this).closest(categoryBox).find(subcategoryChecker).length; i++){
				if(!$(this).closest(categoryBox).find(subcategoryChecker).eq(i)[0].checked){
					$(this).closest(categoryBox).find(categoryChecker)[0].checked = false;
					$(this).closest(categoryBox).find(categoryChecker).next('label').removeClass('enabled');
					$(this).closest(categoryBox).find(categoryChecker).next('label').addClass('disabled');
					return
				}
			}
			$(this).closest(categoryBox).find(categoryChecker)[0].checked = true;
			$(this).closest(categoryBox).find(categoryChecker).next('label').removeClass('disabled');
			$(this).closest(categoryBox).find(categoryChecker).next('label').addClass('enabled');
		})

		$(categoryChecker).click(function(){
			for(i=0; i<$(this).closest(categoryBox).find(subcategoryChecker).length;i++){
				if($(this)[0].checked){
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i)[0].checked = true;
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i).next('label').addClass('enabled');
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i).next('label').removeClass('disabled');
				}
				else{
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i)[0].checked = false;
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i).next('label').addClass('disabled');
					$(this).closest(categoryBox).find(subcategoryChecker).eq(i).next('label').removeClass('enabled');
				}
			}

		});

		function rememberAccordHeight(){
			for (i=0; i < $(categoryBox).length; i++){
				$(categoryBox).eq(i)[0].boxHeight = $(categoryBox).eq(i).outerHeight();
			}
		}

		rememberAccordHeight()


		$(categorySwitcher).click(function(){

			if(!$(this).hasClass("minified")){
				  $(this).closest(categoryBox).animate({
				    height: $(categorySwitcher).parent().outerHeight(true) + 10
				  }, 200, function() {
				  	$(this).find(categorySwitcher).addClass('minified');
				  	$(this).find('.main-containter-menu-subcategory').hide();
				    
				  });
				  
			  }
			else{
				$(this).closest('.main-container-menu-category').find('.main-containter-menu-subcategory').show()
			  	$(this).closest(categoryBox).animate({
				    height: $(this).closest(categoryBox)[0].boxHeight
				  }, 200, function() {
				    $(this).find(categorySwitcher).removeClass('minified');
				  });
			}
		})

	});

})($)
