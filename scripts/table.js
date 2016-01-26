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

/*
 * Generate visible grid
 */
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
	// this.generateHoverGrid();
}

/*
 * Generate hover grid
 * I could refactor this to have generateGrid() do both actions to save some time, but the code would look gross.
 *
 * Hover grid is rotated version of grid.
 * Grid: [ [1,2,3], [4,5,6], [7,8,9], [10,11,12], [13,14,15] ]
 * Hover grid: [ [1,4,7,10,13], [2,5,8,11,14], [3,6,9,12,15] ]
 */
Table.prototype.generateHoverGrid = function() {
	for (var r = 0; r < this.products.length; r++) {
		for (var c = 0; c < this.products[r].length; c++) {
			var cell = $('<div class="cell"></div>');
			cell.attr({
				'data-title': this.products[r][c].title,
				'data-price': '$'+this.products[r][c].price,
				'data-listing_id': this.products[r][c].listing_id
			}).on('mouseover', function() {
				$(this).css('background-color', 'yellow');
				console.log($(this).data('title'));
				console.log($(this).data('price'));
				console.log($(this).data('listing_id'));
				console.log('-----');
			}).on('mouseout', function() {
				$(this).css('background-color', 'blue');
			});
			// make some cells transparent if the number of product rows exceeds 6
			if (r > 5) {
				cell.addClass('invisible');
			}
			// perform rotation (add 1 to hover-row index to preserve number row)
			$($('.hover-row')[c+1]).append(cell);

		}
	}
}



