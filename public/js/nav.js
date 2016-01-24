$(function() {
	$('.nav-item').on('mouseover', function() {
		$(this).css('background-color', 'yellow');
	}).on('mouseout', function() {
		$(this).css('background-color', 'pink');
	})
})