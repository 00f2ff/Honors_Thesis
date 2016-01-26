$(function() {

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
				} else {
					console.log(data.error);
				}
			},
			error: function(err) {
				console.log(err);
			}
		});
	}

	findActiveListings();

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