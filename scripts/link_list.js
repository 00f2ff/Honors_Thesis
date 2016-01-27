// initialize helper class
var global = new Global();

function LinkList(categories) {
	// Convert all categories into cells
	for (var i = 0; i < categories.length; i++) {
		var attributes = {
			'data-name': categories[i].long_name,
			'data-category_id': categories[i].category_id
		}
		cell = global.createCell(attributes);
		categories[i] = cell;
	}
	// Distribute cells between activeQueue and inactiveQueue
	this.inactiveQueue = categories.splice(6); // all cells past index 5
	// Generate the UI
	this.generateUI(categories); // remaining 6 or less
	this.previouslyActiveQueue = [];
}

// This only exists because the path to name is pretty huge and the code looks bad when it's all in one place
LinkList.prototype.createLi = function(name) {
	return $('<li>'+name+'</li>');
}

LinkList.prototype.generateUI = function(activeCells) {
	$('#link_list ul').empty();
	$('.hover-row').first().empty();
	// Loop through activeQueue, appending cells to hover-row and cell name to <ul> (within <li>)
	for (var i = 0; i < activeCells.length; i++) {
		$('.hover-row').first().append(activeCells[i]);
		// add name to <ul>
		$('#link_list ul').append(this.createLi(activeCells[i].data('name')));
	}
}

LinkList.prototype.left = function() {
	// check if there are more previously active cells
	if (this.previouslyActiveQueue.length > 0) {
		// pop cell and li from DOM
		var rightCell = $('.hover-row').first().children(":last").remove();
		$('#link_list ul li:last-child').remove();
		// move cells between queues
		this.inactiveQueue.unshift(rightCell);
		var leftCell = this.previouslyActiveQueue.pop();
		// add cell and li to beginning of hover-row and <ul>
		$('.hover-row').first().prepend(leftCell);
		$('#link_list ul').append(this.createLi(leftCell.data('name')));
	}
}

/*
 * Pops first <li> and cell elements and pushes new ones
 * React might work well here but I'm not going to use it for simplicity's sake
 * Also, this class uses arrays of DOM elements instead of shuffling data in and out of a set DOM
 */
LinkList.prototype.right = function() {
	// check if there are more inactive cells
	if (this.inactiveQueue.length > 0) {
		// unshift cell and li from DOM
		var leftCell = $('.hover-row').first().children(":first").remove();
		$('#link_list ul:first-child').remove();
		// move cells between queues
		this.previouslyActiveQueue.push(leftCell);
		var rightCell = this.inactiveQueue.shift()
		// add cell and li to end of hover-row and <ul>
		$('.hover-row').first().append(rightCell);
		$('#link_list ul').append(this.createLi(rightCell.data('name')));
	}
}

// TODO: figure out how to properly link to categories such that I can access their featured products or whatever. 
// TODO: add title to each page. Maybe an h1 or something. access could be through `
// NOTE: links are not real; they will just trigger an AJAX call in Etsy.js to repopulate the LinkList and Table


