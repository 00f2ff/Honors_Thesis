function Table(unformattedProducts) {
	var products = [];
	for (var i = 0; i < unformattedProducts.length; i++) {
		if (i % 3 === 0) {
			products.push([]);
		}
		products[products.length-1].push(unformattedProducts[i]);
	}
	this.products = products;
	console.log(this.products);
}

Table.prototype.generateGrid = function() {
	for (var r = 0; r < this.products.length; r++) {
		var row = $('<div class="row"></div>');
		for (var c = 0; c < this.products[r].length; c++) {
			/* image is a placeholder at the moment; I'm not going to add a real image for bandwidth concerns */
			var product = $('<div class="product"> \
								<div class="product-image"></div> \
								<div class="product-name">'+this.products[r][c].title+'</div> \
								<div class="product-price">$'+this.products[r][c].price+'</div> \
							</div>');
			product.data('listing_id', this.products[r][c].listing_id);
			row.append(product);
		}
		$('#table').append(row);
	}
}