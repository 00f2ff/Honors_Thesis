
var etsy = new Etsy();
etsy.getRequest('listings', 'listings/trending', {'limit': 30});
etsy.getRequest('categories', 'taxonomy/categories', {});
// etsy.getRequest('listings', 'listings/active', {'limit': 30, 'category': 'candles'});
// etsy.getRequest('listings', 'listings/active', {'limit': 30, 'keywords': 'birthday%20cards'}); // search will just replace spaces %20 and remove all other non-alphabetical characters
// etsy.getRequest('sub-categories', 'taxonomy/categories/accessories', {});

// Keycode arrays. Index of key corresponds with index of cell in hover-row
var linkListKeyCodes = [49,50,51,52,53,54];
var tableFirstColumnKeyCodes = [81,87,69,82,84,89];
var tableSecondColumnKeyCodes = [65,83,68,70,71,72];
var tableThirdColumnKeyCodes = [90,88,67,86,66,78];

// Note: I don't think I need to preventDefault on keypresses since I'm not using special keys


// Assigns click handler to cells (effect differs based on cell type)
// $('body').on('click', '.cell', function(e) {
$('body').keydown(function(e) {
	// find which hover-row had a cell pressed
	var kc = e.keyCode;
	// find out whether UI is showing Table or ProductTable (because no arrow control / activation on latter)
	// AND is located on select conditionals (does not apply to LinkList)
	var isTable = $('.hover-row:nth-child(3)').children().length;
	console.log(isTable);
	console.log(kc);		
	if (linkListKeyCodes.indexOf(kc) > -1) {
		activateCategoryCell(kc);
	} else if (tableFirstColumnKeyCodes.indexOf(kc) > -1 && isTable) {
		activateTableCell(kc, 2);
	} else if (tableSecondColumnKeyCodes.indexOf(kc) > -1 && isTable) {
		activateTableCell(kc, 3);
	} else if (tableThirdColumnKeyCodes.indexOf(kc) > -1 && isTable) {
		activateTableCell(kc, 4);
	} else if (kc === 37) { // left arrow
		// Find which row is currently hovered over
		// participants will need instruction on how hovering + arrow keys work
		if ($('.hover-row:first-child:hover').length > 0) {
			linkList.left();
		} else if ($('.hover-row:not(:first-child):hover').length > 0 && isTable) { // table
			table.left();
		}
	} else if (kc === 39) { // right arrow
		if ($('.hover-row:first-child:hover').length > 0) {
			linkList.right();
		} else if ($('.hover-row:not(:first-child):hover').length > 0 && isTable) {
			table.right();
		}
	} else if (kc === 192) { // grave accent (back button)
		// reset categories in base case (from first page) or going back to first page
		if (etsy.requestHistory.length === 1 || etsy.requestHistory.length === 2) {
			// reset categories
			while (linkList.previouslyActiveQueue.length > 0) {
				linkList.left();
			}
		}
		if (etsy.requestHistory.length > 1) {
			// last element of etsy.requestHistory is the current call, so pop it
			etsy.requestHistory.pop();
			// previous call from this page is now last element, so send new request with popped element
			var previousRequest = etsy.requestHistory.pop();
			// this request will add it back into history again; next back call will remove it
			etsy.getRequest(previousRequest.purpose, previousRequest.uri, previousRequest.parameters);
		}
	}
	// cancel speech because cell won't contain same content
	speechSynthesis.cancel();
});

function activateTableCell(kc, nthChild) {
	var ckc;
	if (nthChild === 2) {
		ckc = tableFirstColumnKeyCodes;
	} else if (nthChild === 3) {
		ckc = tableSecondColumnKeyCodes;
	} else if (nthChild === 4) {
		ckc = tableThirdColumnKeyCodes;
	}
	var cell = $('.hover-row:nth-child('+nthChild+') .cell:nth-child('+(1+ckc.indexOf(kc))+')');
	console.log(cell);
	etsy.getRequest('product', 'listings/'+cell.data('listing_id'), {});
}

/*
 * Moving logic to external function to make keydown handler less awful
 */
function activateCategoryCell(kc) {
	var cell = $('.hover-row:first-child .cell:nth-child('+(1+linkListKeyCodes.indexOf(kc))+')');
	etsy.getRequest('listings', 'listings/active', {'limit': 30, 'category': cell.data('name')});
}