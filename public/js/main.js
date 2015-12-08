$(function() {

	// somehow I'll get an array of objects from Etsy (maybe stick it in HTML) and then turn into object array here
	var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quod autem satis est, eo quicquid accessit, nimium est; Sed ut iis bonis erigimur, quae expectamus, sic laetamur iis, quae recordamur. Ita fit cum gravior, tum etiam splendidior oratio. Animum autem reliquis rebus ita perfecit, ut corpus; Verum hoc idem saepe faciamus. Tu enim ista lenius, hic Stoicorum more nos vexat. Duo Reges: constructio interrete. Ex ea difficultate illae fallaciloquae, ut ait Accius, malitiae natae sunt.Piso igitur hoc modo, vir optimus tuique, ut scis, amantissimus. Qualem igitur hominem natura inchoavit? Terram, mihi crede, ea lanx et maria deprimet. Summus dolor plures dies manere non potest? Quae in controversiam veniunt, de iis, si placet, disseramus. ALIO MODO. Amicitiam autem adhibendam esse censent, quia sit ex eo genere, quae prosunt. Nondum autem explanatum satis, erat, quid maxime natura vellet. Negat enim summo bono afferre incrementum diem. Itaque eos id agere, ut a se dolores, morbos, debilitates repellant. Quae contraria sunt his, malane? Sapientem locupletat ipsa natura, cuius divitias Epicurus parabiles esse docuit.";
	lorem = lorem.replace(/[,;.:?]/g,'').split(' ');

	var mainView = [[]];
	var rowIndex = 0;
	for (var i = 0; i < lorem.length; i++) {
		if (mainView[rowIndex].length === 6) {
			rowIndex++;
			mainView.push([])
		} 
		mainView[rowIndex].push(lorem[i]);
	}
	
	var topIndex = 0;

	function refreshCells() {
		// repopulate cells with current row information
		for (var i = 0; i < 6; i++) {
			$($('.first-row .cell')[i]).text(mainView[topIndex][i]);
			$($('.second-row .cell')[i]).text(mainView[topIndex+1][i]);
			$($('.third-row .cell')[i]).text(mainView[topIndex+2][i]);
		}
	}

	refreshCells()

	// keyboard navigation handler
	$('body').keydown(function(e) {
		// exceptions: (I need to make sure this doesn't hold true for when search is activated)
		if (e.keyCode !== 9 && e.keyCode !== 32) { // tab and space
			e.preventDefault();
		}

		if (e.keyCode === 38) {
			// up
			if (topIndex > 0) {
				topIndex--;
				refreshCells();
			}
		} else if (e.keyCode === 40) {
			// down
			if (topIndex + 2 < mainView.length-2) { // can't make lowest row go out of bounds
				topIndex++;
				refreshCells();
			}
		}
	});

	$('.cell').mouseover(function() {
		$(this).css('background-color','yellow');
	}).mouseout(function() {
		$(this).css('background-color','blue');
	})


})