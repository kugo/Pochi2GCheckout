// alert('1');
var archiveButtons = document.getElementsByName('archiveButton');
if (0 < archiveButtons.length) {
	// alert('2');
	var myevent = document.createEvent('MouseEvents');
	myevent.initEvent('click', false, true);	
	archiveButtons[0].dispatchEvent(myevent);
} else {
	var cancelButtons = document.getElementsByName('canceledOrderButtonCCDeclined');
	if (0 < cancelButtons.length) {
		var myevent = document.createEvent('MouseEvents');
		myevent.initEvent('click', false, true);	
		cancelButtons[0].dispatchEvent(myevent);
	}
}
// alert('3');
