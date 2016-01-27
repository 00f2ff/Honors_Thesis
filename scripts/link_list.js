function LinkList(categories) {
	// Convert all categories into cells
	for (var i = 0; i < categories.length; i++) {
		cell = this.createCell(categories[i].long_name, categories[i].category_id);
		categories[i] = cell;
	}
	// Distribute cells between activeQueue and inactiveQueue
	this.inactiveQueue = categories.splice(6); // all cells past index 5
	this.activeQueue = categories;
	this.previouslyActiveQueue = [];
}

// NOTE: Create a cell class that takes an object parameter and works for both Table and LinkList
LinkList.prototype.createCell = function(name, category_id) {
	var cell = $('<div class="cell"></div>');
	// add click handler to proper route here
	cell.attr({
		'data-name': name,
		'data-category_id': category_id
	}).on('mouseover', function() {
		$(this).css('background-color', 'yellow');
		console.log($(this).data('name'));
		console.log($(this).data('category_id'));
		console.log('-----');
	}).on('mouseout', function() {
		$(this).css('background-color', 'blue');
	});
	return cell;
}

// This exists because the path to name is pretty huge and the code looks bad when it's all in one place
LinkList.prototype.createLi = function(name) {
	return $('<li>'+name+'</li>');
}

LinkList.prototype.generateUI = function() {
	// Loop through activeQueue, appending cells to hover-row and cell name to <ul> (within <li>)
	for (var i = 0; i < this.activeQueue.length; i++) {
		$('.hover-row').first().append(this.activeQueue[i]);
		// add name to <ul>
		$('#link_list ul').append(this.createLi(this.activeQueue[i].data('name')));
	}
}

/*
 * Pops first <li> and cell elements and pushes new ones
 * React might work well here but I'm not going to use it for simplicity's sake
 */
LinkList.prototype.left = function() {
	// check if there are more inactive cells
	if (this.inactiveQueue.length > 0) {
		// remove first cell and li
		$('.hover-row').first().children(":first").remove();
		$('#link_list ul').children(":first").remove();
		// move cells between queues (right now this just keeps data accurate; I don't need a full refresh option)
		this.previouslyActiveQueue.push(this.activeQueue.shift());
		this.activeQueue.push(this.inactiveQueue.shift());
		// add cell and li to end of hover-row and <ul>
		$('.hover-row').first().append(this.activeQueue[this.activeQueue.length-1]);
		$('#link_list ul').append(this.createLi(this.activeQueue[this.activeQueue.length-1].data('name')));
	}
}

// NOTE: there's probably some nifty way to do abstract left and right, but I'm not quite sure how to do that
LinkList.prototype.right = function() {
	// check if there are more previously active cells
	if (this.previouslyActiveQueue.length > 0) {
		// remove last cell and li
		$('.hover-row').first().children(":last").remove();
		$('#link_list ul li:last-child').remove();
		// move cells between queues
		this.activeQueue.unshift(this.previouslyActiveQueue.pop());
		this.inactiveQueue.unshift(this.activeQueue.pop());
		// add cell and li to beginning of hover-row and <ul>
		$('.hover-row').first().prepend(this.activeQueue[0]);
		$('#link_list ul').append(this.createLi(this.activeQueue[0].data('name')));
	}
}

// TODO: figure out how to properly link to categories such that I can access their featured products or whatever. 
// TODO: add title to each page. Maybe an h1 or something. access could be through `
// NOTE: links are not real; they will just trigger an AJAX call in Etsy.js to repopulate the LinkList and Table
// TODO: consider cutting off listing titles after 5 words since they go on forever and it might harm the study

