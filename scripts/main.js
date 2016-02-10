
var etsy = new Etsy();
etsy.getRequest('listings', 'listings/trending', {'limit': 30});


$('body').keydown(function(e) {
	var kc = e.keyCode;
	
	var isSearch = $('#search input:focus').length;

	// all key functionality doesn't hold for typing in search box
	if (!isSearch) {
		if (kc === 192) { // grave accent (back button)
			// reset categories in base case (from first page) or going back to first page
			if (etsy.requestHistory.length > 1) {
				// last element of etsy.requestHistory is the current call, so pop it
				etsy.requestHistory.pop();
				// previous call from this page is now last element, so send new request with popped element
				var previousRequest = etsy.requestHistory.pop();
				// this request will add it back into history again; next back call will remove it
				etsy.getRequest(previousRequest.purpose, previousRequest.uri, previousRequest.parameters);
			}
		} else if (kc === 16) { // press shift to set focus to search bar
			$('#search input').focus();
		}
	} else {
		if (kc === 13) { // enter to search
			var searchString = $('#search input').val().replace(/\s+/g, '%20');
			console.log(searchString);
			$('#search input').val('');
			etsy.getRequest('listings', 'listings/active', {'limit': 30, 'keywords': searchString});
			// remove focus from input so user can use site again
			$('#search input').blur();
		}
	}
	
	// cancel speech because cell won't contain same content
	speechSynthesis.cancel();
});


// Search //
$('#search input').focus(function() {
	// Message about turning off Fingers
});
$('#search form').submit(function(e) {
	e.preventDefault();
})



