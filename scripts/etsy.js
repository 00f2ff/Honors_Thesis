$(function() {

	// NOTE: I could limit queries to 18, and when arrow key goes all the way to right, have it activate another call
	// however, new cells would need to all be invisible, so perhaps make generateHoverGrid have an optional parameter
	function findActiveListings() {
		var query = 'https://openapi.etsy.com/v2/listings/active.js?limit=30&api_key=' + api_key;
		$.ajax({
			url: query,
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				if (data.ok) {
					console.log(data);
					var table = new Table(data.results);
					table.generateGrid();
					table.generateHoverGrid();
				} else {
					console.log(data.error);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	// NOTE: refactor this whole file so that there's a general ajax wrapper that takes a URI and arguments
	// no limit
	function findTopCategories() {
		var query = 'https://openapi.etsy.com/v2/taxonomy/categories.js?api_key=' + api_key;
		$.ajax({
			url: query,
			type: 'GET',
			dataType: 'jsonp',
			success: function(data) {
				if (data.ok) {
					console.log(data);
					var linkList = new LinkList(data.results);
					linkList.generateList();
					linkList.generateHoverList();
				} else {
					console.log(data.error);
				}
			},
			error: function(err) {
				console.log(err);
			}
		})
	}

	findActiveListings();
	findTopCategories();

	/* 
To Do:


- Keep everything in a class-based system, including etsy.js. Have the window.ready stuff in a main file that is loaded last
- Style the product windows inside table
- Look at old app master code to determine where I need the parser to put hover positions
- Develop code to generate hover positions based on product data
- Update control code to handle table manipulation as it pertains to hovering
- Add Etsy categories and figure out how sub-categories work
- Add search capability and info changing

*/


});