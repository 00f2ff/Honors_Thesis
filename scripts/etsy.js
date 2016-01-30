var linkList = new LinkList();
var table = new Table();

function Etsy() {
	this.queryBase = 'https://openapi.etsy.com/v2/';
}

Etsy.prototype.getRequest = function(purpose, uri, parameters) {
	// format parameters as ampersand-separated string
	var params = '';
	for (var key in parameters) {
		if (parameters.hasOwnProperty(key)) {
			params = params + key + '=' + parameters[key] + '&';
		}
	}
	var query = this.queryBase + uri + '.js?' + params + 'api_key=' + api_key;
	$.ajax({
		url: query,
		type: 'GET',
		dataType: 'jsonp',
		success: function(data) {
			if (data.ok) {
				console.log(data.results);
				if (purpose === 'listings') {
					table.populate(data.results);
				} else if (purpose === 'categories') {
					linkList.populate(data.results);
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


