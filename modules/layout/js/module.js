"use strict";

var layout = (function () {

	var setupHandlers = function () {
		$('#layout li').off().click(function (e) {
			router.routeToModuleId($(e.currentTarget).attr('id'));
		});
	};

	var renderMenu = function () {
		var menu = document.createElement('section');
		menu.id = 'layout';
		menu.innerHTML = '<ul><li id="module-1">Module 1</li><li id="module-2">Module 2</li></ul>';
		document.body.appendChild(menu);
	};

	return {
		show: function () {
			// render
			renderMenu();
			// handlers
			setupHandlers();
		}
	};
})();