'use strict';

var btnAdd = $('.btnadd'),	
	forminput = $('.forminput'),
	tdllist = $('.tdllist'),
	elValue,
	template;

	(function showWords() {
		var lengthLocalSt = localStorage.length,
			lengthOfArray = (typeof localStorage.vocabluary == "undefined") ? 0 : JSON.parse(localStorage.vocabluary);

		if (lengthLocalSt > 0) {
			for (var i=0; i < lengthOfArray.length; i++) {
				for (var j in localStorage) {
					var parseToJSON = JSON.parse(localStorage.getItem(j)),
						parseObjToJson = JSON.parse(parseToJSON[i]);
					
					template = '<div class="page-header">';
					template += '<h2>' + parseObjToJson.word + ' <small>';
					template += parseObjToJson.translate + '</small></h2>';
					template += '</div>';
					$(template).attr('data-mask', 'tdmask_'+i).appendTo(tdllist);
				}
			}
		}
	})();

btnAdd.on('click', function(e) {
		var tbAray = [];
		var elValue = JSON.stringify({
			word : $('#word').val(),
			translate : $('#translate').val()
		});

		tbAray.push(elValue);
		var jsonParse = JSON.parse(elValue);

		template = '<div class="page-header">';
		template += '<h2>' + jsonParse.word + ' <small>';
		template += jsonParse.translate + '</small></h2>';
		template += '</div>';
		$(template).appendTo(tdllist);

		var getItems = (typeof localStorage.vocabluary == "undefined") ? tbAray : (JSON.parse(localStorage.vocabluary)).concat(tbAray);
		localStorage.setItem("vocabluary", JSON.stringify(getItems));
		// clear forminput
		forminput.val('')
	


	return false;
});


$('.tdllist').on('dblclick', '.page-header', function(e) {
	var thisMask = $(this).attr('data-mask').substring(7),
		removeFromObj = JSON.parse(localStorage.vocabluary),
		curRemove = removeFromObj[thisMask],
		newArr = removeFromObj;
	
	removeFromObj.splice(thisMask, 1);
	localStorage.vocabluary = JSON.stringify(removeFromObj);

	$(this).remove();
});








