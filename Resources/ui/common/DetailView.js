//FirstView Component Constructor
function FirstView(args, parent) {
	
	var title = args.title;
	var encryptedText = args.text;
	var key = args.key;
	
	var self = Ti.UI.createView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL
	});
	
	var labelHeadLine = Ti.UI.createLabel({
		top: 5,
		color:'#999',
		text: 'NoteCryption',
		font: {fontSize:'30sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 40,
		width: Ti.UI.SIZE
	});
	self.add(labelHeadLine);
	
	var titleFieldContainer = Ti.UI.createView({
		top: 45,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		backgroundColor: '#dedede'
	});
	var titleField = Ti.UI.createTextField({
		top: 2,
		left: 5,
		right: 5,
		width: Ti.UI.FILL,
		height: 30,
		color: '#000',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'left',
		hintText: 'Enter Title',
		autocapitalization: false,
		autocorrect: false,
		value: title,
		font: {fontSize: '18sp'},
		ellipsize: true,
		zIndex: 1
	});
	titleFieldContainer.add(titleField);
	self.add(titleFieldContainer);
	
	var scrollView = Ti.UI.createScrollView({
		backgroundColor: '#dedede',
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		bottom: 40,
		top: 75
	});
	self.add(scrollView);
	
	var textArea = Ti.UI.createTextArea({
		hintText: 'Enter Text',
		value: Ti.App.Blowfish.decrypt( encryptedText, key ),
		textAlign: 'left',
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		top: 5,
		bottom: 5,
		left: 5,
		right: 5,
		backgroundColor: '#fff',
		borderWidth: 0,
		borderRadius: 5
	});
	scrollView.add(textArea);
	
	var btnContainer = Ti.UI.createView({
		backgroundColor: '#22dedede',
		bottom: 0,
		width: Ti.UI.FILL,
		height: 40,
	});
	var lblSave = Ti.UI.createLabel({
		text: 'Save',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font: {fontSize: '16sp'},
		color: '#3AC23F',
		left: 0,
		width: '50%'
	});
	lblSave.addEventListener('click', function () {
		// do save
		parent.close();
	});
	btnContainer.add(lblSave);
	var lblCancel = Ti.UI.createLabel({
		text: 'Cancel',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
		font: {fontSize: '14sp'},
		color: '#EB2A2A',
		right: 0,
		width: '50%'
	});
	lblCancel.addEventListener('click', function () {
		parent.close();
	});
	btnContainer.add(lblCancel);
	
	self.add(btnContainer);
	
	return self;
}

module.exports = FirstView;
