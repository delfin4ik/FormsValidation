var validatorMethods = {
	notEmpty: function(el){
		if(el.value == ''){
			return false;
		}
		return true;
	},
	pattern: function(el, pattern){
		return pattern.test(el.value);
	},
	contains: function(el, el2){
		if (el.value == el2.value){
			return true;
		}
		return false;
	}
}

function Validator(setting) {
	var formEl = document.getElementById(setting.id);
	var formFields = formEl.elements;
	var error = [];
	var rulesPattern = {
		email: /^\w{1,}@\w{1,}\.\w{2,}$/,
		quotes: /[^\'\"]/,
	}

	var showError = function(el){
		el.parentNode.classList.remove('success');
		el.parentNode.classList.add('error');
		el.nextElementSibling.innerHTML = el.dataset.error;
	}
	var showSuccess = function(el){
		el.parentNode.classList.remove('error');
		el.parentNode.classList.add('success');
		el.nextElementSibling.innerHTML = '';
	}
	var isValid = function(el){
		var methods = setting.methods[el.getAttribute('id')];
		if(methods !== undefined){
			for(var i = 0; i < methods.length; i++){
				if(!validatorMethods[methods[i][0]](el, methods[i][1])){
					error.push({el: el});
				}
			}
			for(var i = 0; i < error.length; i ++){
				if(error[i].el  == el){
					return false;
				}
			}
		}
		return true;
	}


	var checkIt =function(){
		// define validation rules
		if(isValid(this)){
			showSuccess(this);
			for(var i = 0; i < error.length; i++){
				if(error[i].el == this){
					//delete element from array
					error.splice(i, 1);
					
				}
			}
		}else{
			showError(this);
			error.push({
				el: this,

			})
		}
	}
	//init here
	for (var i = 0; i < formFields.length; i++) {
		if(formFields[i].tagName == 'BUTTON'){
			continue;
		}
		formFields[i].addEventListener('change', checkIt);
	}
	for(var prop in setting.pattern){
		rulesPattern[prop] = setting.pattern[prop]
	}
}