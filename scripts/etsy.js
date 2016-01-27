function Etsy() {
	this.queryBase = 'https://openapi.etsy.com/v2/';
}

Etsy.prototype.getRequest = function(purpose, uri, arguments) {
	// format arguments as ampersand-separated string
	var args = '';
	for (var key in arguments) {
		if (arguments.hasOwnProperty(key)) {
			args = args + key + '=' + arguments[key] + '&';
		}
	}
	var query = this.queryBase + uri + '.js?' + args + 'api_key=' + api_key;
	$.ajax({
		url: query,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if (data.ok) {
				console.log(data.results);
				if (purpose === 'listings') {
					var table = new Table(data.results);
				} else if (purpose === 'categories') {
					var linkList = new LinkList(data.results);
				} else if (purpose === 'sub-categories') {
					// NOTE: should I make sub-categories clickable? I guess I can, but it will probably require different requests
					// remove '>' from long_name
					// for (var i = 0; i < data.results.length; i++) {
					// 	data.results[i].long_name 
					// }
					var linkList = new LinkList(data.results);
				}
				
			} else {
				console.log(data.error);
			}
		},
		error: function(err) {
			console.log(err);
		}
	});
}


$(function() {

	var etsy = new Etsy();
	etsy.getRequest('listings', 'listings/active', {'limit': 30});
	etsy.getRequest('categories', 'taxonomy/categories', {});
	// etsy.getRequest('sub-categories', 'taxonomy/categories/accessories', {});

	/* 
To Do:

- Figure out how I'm going to handle Table updates when user wants to look at even more products. Should I just limit the available
  products to 30 or so? That would be a lot simpler
- Update control code to handle table manipulation as it pertains to hovering
- Add Etsy categories and figure out how sub-categories work
- Add search capability and info changing

*/


});