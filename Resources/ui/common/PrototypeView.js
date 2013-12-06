//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView();
	
	var Blowfish = require('/lib/Blowfish');
	
	var container = Ti.UI.createView({
		top: 0,
		center: {x:'50%'},
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		layout: 'vertical',
		bubbleParent: false
	});
	self.add(container);
	self.addEventListener('singletap', function (e) {
		textAreaKey.blur();
		textAreaText.blur();
	});
	
	var labelHeadLine = Ti.UI.createLabel({
		color:'#999',
		text: 'NoteCryption',
		font: {fontSize:'30sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 100,
		width: Ti.UI.SIZE
	});
	container.add(labelHeadLine);
	
	var textAreaKey = Ti.UI.createTextField({
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: 'Enter Key',
		autocapitalization: false,
		autocorrect: false,
		value: '',
		width: 200,
		height: Ti.UI.SIZE,
		font: {fontSize: '16sp'}
	});
	container.add(textAreaKey);
	
	var buttonContainer = Ti.UI.createView({
		top: 20,
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		center: {x: '50%'},
		layout: 'horizontal'
	});
	container.add(buttonContainer);
	
	var btnEncrypt = Ti.UI.createButton({
		title: 'Encrypt',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize: '16sp'}
	});
	buttonContainer.add(btnEncrypt);
	btnEncrypt.addEventListener('singletap', function (e) {
		var encrypted = Blowfish.encrypt(textAreaText.value, textAreaKey.value);
		textAreaText.value = encrypted;
	});
	
	var btnDecrypt = Ti.UI.createButton({
		title: 'Decrypt',
		width: Ti.UI.SIZE,
		height: Ti.UI.SIZE,
		font: {fontSize: '16sp'}
	});
	buttonContainer.add(btnDecrypt);
	btnDecrypt.addEventListener('singletap', function (e) {
		var decrypted = Blowfish.decrypt(textAreaText.value, textAreaKey.value);
		textAreaText.value = decrypted;
	});
	
	var textAreaText = Ti.UI.createTextArea({
		top: 20,
		textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: 'Enter Text',
		autocapitalization: false,
		autocorrect: false,
		horizontalWrap: true,
		value: '',
		width: 200,
		height: 200,
		font: {fontSize: '16sp'}
	});
	container.add(textAreaText);
	
	return self;
}

module.exports = FirstView;
