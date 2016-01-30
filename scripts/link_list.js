// initialize helper class
var global = new Global();

function LinkList() {
	
}

LinkList.prototype.populate = function(categories) {
	// Convert all categories into cells
	for (var i = 0; i < categories.length; i++) {
		var attributes = {
			'data-name': categories[i].long_name
		}
		var cell = global.cell(attributes);
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
		var rightCell = $('.hover-row').first().children(":last").detach();
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
		var leftCell = $('.hover-row').first().children(":first").detach();
		$('#link_list ul li:first-child').remove();
		// move cells between queues
		this.previouslyActiveQueue.push(leftCell);
		var rightCell = this.inactiveQueue.shift()
		// add cell and li to end of hover-row and <ul>
		$('.hover-row').first().append(rightCell);
		$('#link_list ul').append(this.createLi(rightCell.data('name')));
	}
}

/*
 * Adds a 'Popular Products' cell and line in first category index
 */
LinkList.prototype.addPopularProducts = function() {
	// move last child into inactive
	var lastCell = $('.hover-row').first().children(':last').detach();
	$('#link_list ul li:last-child').remove();
	this.inactiveQueue.unshift(lastCell);
	var attributes = {
			'data-name': '/'
		}
	var firstCell = global.cell(attributes);
	// insert cell as first child
	$('.hover-row').first().prepend(firstCell);
	$('#link_list ul').prepend(this.createLi('Popular Products'));
}

/*
 * Removes the 'Popular Products' cell and line
 */
LinkList.prototype.removePopularProducts = function() {
	// remove first cell and line
	$('.hover-row').first().children(':first').detach();
	$('#link_list ul li:first-child').remove();
	// effectively perform a 'left' command without changing the previously active queue
	var rightCell = this.inactiveQueue.shift();
	console.log(rightCell);
	// add cell and li to end of hover-row and <ul>
	$('.hover-row').first().append(rightCell);
	$('#link_list ul').append(this.createLi(rightCell.data('name')));
}
