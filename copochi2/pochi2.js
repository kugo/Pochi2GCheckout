function performClick(button) {
	var myevent = document.createEvent('MouseEvents');
	myevent.initEvent('click', false, true);
	button.dispatchEvent(myevent);
}

function autoArchive() {
	var archiveButtons = document.getElementsByName('archiveButton');
	if(0 < archiveButtons.length) {
		performClick(archiveButtons[0]);
		return;
	}

	var cancelButtons = document.getElementsByName('canceledOrderButtonCCDeclined');
	if(0 < cancelButtons.length) {
		performClick(cancelButtons[0]);
		return;
	}
}

autoArchive();
