var linkList = new LinkList();
var table = new Table();
var productTable = new ProductTable();

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
				switch (purpose) {
					case 'listings':
						table.populate(data.results);
						break;
					case 'categories':
						linkList.populate(data.results);
						break;
					case 'product':
						productTable.populate(data.results[0]); // comes in array
						break;
					default:
						console.log('Not a valid purpose');
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


