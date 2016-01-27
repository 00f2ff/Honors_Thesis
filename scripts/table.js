// initialize helper class
var global = new Global();

function Table(unformattedProducts) {
	var products = [];
	for (var i = 0; i < unformattedProducts.length; i++) {
		if (i % 3 === 0) {
			products.push([]);
		}
		products[products.length-1].push(unformattedProducts[i]);
	}
	this.products = products;
	// cell queues
	this.inactiveQueue = [ [], [], [] ];
	this.previouslyActiveQueue = [ [], [], [] ];
	this.generateUI();
}

Table.prototype.createProduct = function(title, price) {
	return $('<div class="product"> \
				<div class="product-image"></div> \
				<div class="product-name">'+title+'</div> \
				<div class="product-price">$'+price+'</div> \
			</div>');
}

/*
 * Generate visible and hover grids
 * Hover grid is rotated version of grid.
 * Grid: [ [1,2,3], [4,5,6], [7,8,9], [10,11,12], [13,14,15] ]
 * Hover grid: [ [1,4,7,10,13], [2,5,8,11,14], [3,6,9,12,15] ]
 */
Table.prototype.generateUI = function() {
	for (var r = 0; r < this.products.length; r++) {
		var row = $('<div class="row"></div>');
		for (var c = 0; c < this.products[r].length; c++) {
			/* image is a placeholder at the moment; I'm not going to add a real image for bandwidth concerns */
			// Create product
			var product = this.createProduct(this.products[r][c].title, this.products[r][c].price);
			// Create cell	
			var attributes = {
				'data-title': this.products[r][c].title,
				'data-price': '$'+this.products[r][c].price,
				'data-listing_id': this.products[r][c].listing_id
			}
			var cell = global.createCell(attributes);

			// perform rotation (add 1 to hover-row index to preserve number row)
			// move cells into inactiveQueue if number of product rows exceeds 6
			if (r > 5) {
				this.inactiveQueue[c].push(cell);
			} else {
				// match number of visible products with number of visible cells.
				// this is a semi-arbitrary decision that mainly helps with debugging.
				// while real UIs will incorporate lazy-loading, they don't remove previous content from the screen
				row.append(product);
				$($('.hover-row')[c+1]).append(cell);
			}	
		}
		$('#table').append(row);
	}
}

Table.prototype.right = function() {
	// check if there are more inactive cells
	if (this.inactiveQueue.length > 0) {
		// pop cell from each hover-row and product row from DOM
		var leftCells = $('.hover-row:not(:first-child) .cell:first-child').remove();
		$('#table .row:first-child').remove();
		var row = $('<div class="row"></div>');
		for (var i = 0; i < 3; i++) {
			// move cells between queues
			this.previouslyActiveQueue[i].push(leftCells[i]);
			var rightCell = this.inactiveQueue[i].shift();
			// add cell to end of hover-row and product to row
			$($('.hover-row')[i+1]).append(rightCell);
			row.append(this.createProduct(rightCell.data('title'), rightCell.data('price')));
		}
		// add row to dom
		$('#table').append(row);
	}
}

Table.prototype.left = function() {
	// check if there are more previously active cells
	if (this.previouslyActiveQueue.length > 0) {
		// pop cell from each hover-row and product row from DOM
		var rightCells = $('.hover-row:not(:first-child) .cell:last-child').remove();
		$('#table .row:last-child').remove();
		var row = $('<div class="row"></div>');
		for (var i = 0; i < 3; i++) {
			// move cells between queues
			this.inactiveQueue[i].unshift(rightCells[i]); // unshift inserts element in first index
			var leftCell = this.previouslyActiveQueue[i].pop();
			// add cell to beginning of hover-row and product to row
			$($('.hover-row')[i+1]).prepend(leftCell);
			row.append(this.createProduct(leftCell.data('title'), leftCell.data('price')));
		}
		// add row to dom
		$('#table').prepend(row);
	}
}

