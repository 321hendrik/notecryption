//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createScrollView();
	
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
		var encrypted = encrypt(textAreaText.value, textAreaKey.value);
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
		var decrypted = decrypt(textAreaText.value, textAreaKey.value);
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
	
	// use ECB Blowfish plugin
	var Blowfish = require("com.dmrsolutions.blowfish").Blowfish;
	function encrypt(text, key) {
		zeros = 0;
		for (i = text.length; i--;) {
			if (text[i] == '0') {
				zeros++;
			} else {
				break;
			}
		}
		Ti.App.Properties.setInt('zeros', zeros);
		var bfEnc = new Blowfish(key);
		var encryptedText = bfEnc.encrypt(text);
		return encryptedText;
	}
	
	function decrypt(text, key) {
		var bfDec = new Blowfish(key);
		var decryptedText = bfDec.decrypt(text);
		var zeros = Ti.App.Properties.getInt('zeros');
		var decryptLeftoverZeros = 0;
		for (i = decryptedText.length; i--;) {
			if (decryptedText[i] == '0') {
				decryptLeftoverZeros++;
			} else {
				break;
			}
		}
		if (decryptLeftoverZeros > zeros) {
			decryptedText = decryptedText.slice(0, (decryptLeftoverZeros - zeros)*-1);
		}
		return decryptedText;
	}
	
	return self;
}

module.exports = FirstView;
