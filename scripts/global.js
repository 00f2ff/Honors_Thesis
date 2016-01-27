function Global() {

}

Global.prototype.createCell = function(attributes) {
	var cell = $('<div class="cell"></div>');
	// assumes attributes come in prefixed with 'data-'
	cell.attr(attributes)
		.on('mouseover', function() {
			$(this).css('background-color', 'yellow');
			console.log($(this).data());
			console.log('-----');
		}).on('mouseout', function() {
			$(this).css('background-color', 'blue');
		});
	return cell;
}
