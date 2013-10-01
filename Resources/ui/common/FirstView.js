//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	
	var container = Ti.UI.createView({
		top: 10,
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
		font: {fontSize:'45sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 100,
		width: Ti.UI.SIZE
	});
	container.add(labelHeadLine);
	
	// var labelKey = Ti.UI.createLabel({
		// color:'#000',
		// text: 'Enter Key',
		// height: 60,
		// width: 200
	// });
	// container.add(labelKey);
	
	var textAreaKey = Ti.UI.createTextField({
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		value: 'Enter Key',
		width: 200,
		height: 30,
		font: {fontSize: '16sp'}
	});
	textAreaKey.addEventListener('focus', function(e) {
		textAreaKey.value = '';
	});
	container.add(textAreaKey);
	
	// var labelText = Ti.UI.createLabel({
		// color:'#000',
		// text: 'Enter Text',
		// height: 60,
		// width: 200
	// });
	// container.add(labelText );
	
	var spacer = Ti.UI.createView({
		height: 20
	});
	container.add(spacer);
	
	var textAreaText = Ti.UI.createTextField({
		borderWidth: 2,
		borderColor: '#bbb',
		borderRadius: 5,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		value: 'Enter Text',
		width: 200,
		height: 30,
		font: {fontSize: '16sp'}
	});
	textAreaText.addEventListener('focus', function(e) {
		textAreaText.value = '';
	});
	container.add(textAreaText);
	
	var btnCrypt = Ti.UI.createButton({
		title: 'Crypt',
		top: 20,
		center: {x: '50%', y: '50%'},
		width: 60,
		height: 30,
		font: {fontSize: '16sp'}
	});
	container.add(btnCrypt);
	btnCrypt.addEventListener('singletap', function (e) {
		alert('encrypted: '+encrypt(textAreaText.value, textAreaKey.value)+' decrypted : '+decrypt(encrypt(textAreaText.value, textAreaKey.value), textAreaKey.value));
	});
	
	var lowerCase = 'abcdefghijklmnopqrstuvwxyz';
	var upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var germanSpecific = 'öäüÖÄÜß';
	var numbers = '1234567890'
	var varChars = ' !"§$%&/()=?*+#_-:.;,'
	var alphaNumCharList = lowerCase + upperCase + germanSpecific + numbers + varChars;
	var keyList = '';
	
	function reverse(text) {
		var reversed = '';
		for(var i=text.length,j=0;i>j;i--){
			reversed += text[i];
		}
		return reversed;
	}
	
	function popStr(text, index) {
		var before = text.slice(0, index);
		var after = text.slice( (index+1), text.length );
		return before+after;
	}
	
	function encrypt(text, key) {
		// encrypt function
		var result;
		keyList = '';
		var outputText = '';
		var cryptIndex = 0;
		cryptIndexList = [];
		keyList = key + alphaNumCharList;
		// for(var i=0,j=text.length; i<j; i++){
			// var revKeyList = reverse(keyList);
			// revKeyList = popStr( revKeyList, revKeyList.indexOf(text[i]) );
			// keyList = reverse(keyList);
		// };
		for(var i=0,j=text.length; i<j; i++){
			result = keyList[alphaNumCharList.indexOf(text[i])];
			outputText += result;
		};
		return outputText;
	}
	
	function decrypt(text, key) {
		// decrypt function
		keyList = '';
		var outputText = '';
		keyList = key + alphaNumCharList;
		// for(var i=0,j=text.length; i<j; i++){
			// var revKeyList = reverse(keyList);
			// revKeyList = popStr( revKeyList, revKeyList.indexOf(text[i]) );
			// keyList = reverse(keyList);
		// };
		for(var i=0,j=text.length; i<j; i++){
			outputText += alphaNumCharList[keyList.indexOf(text[i])];
		};
		return outputText;
	}
	
	return self;
}

module.exports = FirstView;
