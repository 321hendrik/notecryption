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
module.exports = {
	encrypt: encrypt,
	decrypt: decrypt
}
