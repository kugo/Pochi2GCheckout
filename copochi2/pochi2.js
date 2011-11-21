/**
 * 指定されたIDのelementを有効にします。
 */
function enableById(id){
	document.getElementById(id).disabled = false;
}

/**
 * 指定されたidのelementを無効にします。
 */
function disableById(id){
	document.getElementById(id).disabled = true;	
}

/**
 * オートアーカイブフラグを設定します
 */
function setAutoArchiveRunning(flag) {
	localStorage['autoArchiveRunning'] = flag;
}

/**
 * オートアーカイブフラグを取得します
 */
function isAutoArchiveRunning() {
	var flag = localStorage['autoArchiveRunning'];
	if( typeof flag === "undefined") {
		setAutoArchiveRunning(false);
		return false;
	}
	return flag == 'true';
}

/**
 * 渡されたelementをクリックします
 */
function performClick(element) {
	var myevent = document.createEvent('MouseEvents');
	myevent.initEvent('click', false, true);
	element.dispatchEvent(myevent);
}

/**
 * 注文をアーカイブします。
 * 請求ボタンには対応していません。
 */
function performArchive() {
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

	stopAutoArchive();
	alert(' completed archive at all order.');
}

/**
 * オートアーカイブを開始します
 */
function startAutoArchive() {
	disableById('startAutoArchiveButton');
	enableById('stopAutoArchiveButton');
	setAutoArchiveRunning(true);

	performArchive();
}

/**
 * オートアーカイブを停止します
 */
function stopAutoArchive() {
	enableById('startAutoArchiveButton');
	disableById('stopAutoArchiveButton');
	setAutoArchiveRunning(false);
}

/**
 * 初期化
 * オートアーカイブ開始ボタンと、オートアーカイブ停止ボタンを追加します。
 */
function init() {
	var parent = document.getElementById('searchField').parentNode;
	var isRunning = isAutoArchiveRunning();
	
	// divider
	var divider = document.createElement('label');
	divider.textContent = '|';
	parent.appendChild(divider);
	
	// オートアーカイブ開始ボタン
	var startAutoArchiveButton = document.createElement('input');
	startAutoArchiveButton.id = 'startAutoArchiveButton';
	startAutoArchiveButton.value = 'start auto archive';
	startAutoArchiveButton.type = 'button';
	startAutoArchiveButton.disabled = isRunning;
	startAutoArchiveButton.style.marginLeft = 7;
	startAutoArchiveButton.onclick = startAutoArchive;
	parent.appendChild(startAutoArchiveButton);

	// オートアーカイブ停止ボタン
	var stopAutoArchiveButton = document.createElement('input');
	stopAutoArchiveButton.id = 'stopAutoArchiveButton';
	stopAutoArchiveButton.value = 'stop auto archive';
	stopAutoArchiveButton.type = 'button';
	stopAutoArchiveButton.disabled = !isRunning;
	stopAutoArchiveButton.onclick = stopAutoArchive;
	parent.appendChild(stopAutoArchiveButton);
}

// 初期化
init();

// オートアーカイブを停止させる余地を作るため、delayを待ってからアーカイブします。
// オートアーカイブフラグにfalseを設定しているのは、delayの間にタブを閉じた場合にオートアーカイブが無効になるようにするためです。
if(isAutoArchiveRunning()) {
	setAutoArchiveRunning(false);
	setTimeout(startAutoArchive(), 3 * 1000);
}