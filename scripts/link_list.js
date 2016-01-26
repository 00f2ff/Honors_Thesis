function LinkList(categories) {
	this.categories = categories;
}

// TODO: figure out how to properly link to categories such that I can access their featured products or whatever. 
// TODO: add title to each page. Maybe an h1 or something. access could be through `
// Note that this isn't a real link; it will just trigger an AJAX call in Etsy.js to repopulate the LinkList and Table
LinkList.prototype.generateList = function() {
	for (var i = 0; i < this.categories.length; i++) {
		var link = $('<li>'+this.categories[i].long_name+'</li>');
		
		if (i > 5) {
			link.addClass('invisible');
		}
		$('#link_list ul').append(link);
	}
}

LinkList.prototype.generateHoverList = function() {
	for (var i = 0; i < this.categories.length; i++) {
		var cell = $('<div class="cell"></div>');
		// add click handler to proper route here
		cell.attr({
			'data-name': this.categories[i].long_name,
			'data-category_id': this.categories[i].category_id
		}).on('mouseover', function() {
			$(this).css('background-color', 'yellow');
			console.log($(this).data('name'));
			console.log($(this).data('category_id'));
			console.log('-----');
		}).on('mouseout', function() {
			$(this).css('background-color', 'blue');
		});
		// make some cells transparent if the number of categories exceeds 6
		if (i > 5) {
			cell.addClass('invisible');
		}
		// add cells to first hover-row (reserved for numbers);
		$($('.hover-row')[0]).append(cell);

	}
}			


/*
Right now the entire screen layout gets messed up because I'm loading in too many categories. Even though they're invisible, 
they still occupy space on the screen. A better method may be to stick those DOM elements (including table ones too) into a 
queue and sometimes pops onto the visible list. I could also design it as a circular linked list, but
that could potentially be weird since users would be able to lose their place. I could fix that problem by creating a stack
that stores links popped off the other side (would that be a stack? draw this)
*/