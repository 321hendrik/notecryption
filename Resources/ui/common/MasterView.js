//FirstView Component Constructor
function FirstView() {
	var DetailWindow = require('/ui/handheld/DetailWindow');
	var key = '';
	
	var self = Ti.UI.createView({
		layout: 'vertical'
	});
	
	// HEADER
	var headerContainer = Ti.UI.createView({
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL
	});
	self.add(headerContainer);
	var labelHeadLine = Ti.UI.createLabel({
		top: 5,
		color:'#999',
		text: 'NoteCryption',
		font: {fontSize:'30sp', fontWeight:'bold'},
		center: {x: '50%'},
		height: 40,
		width: Ti.UI.SIZE
	});
	headerContainer.add(labelHeadLine);
	
	var lockerIcon = Ti.UI.createView({
		width: 30,
		height: 30,
		right: 10,
		bottom: -50,
		opacity: 0.0
	});
	lockerIcon.addEventListener('click', function () {
		key = '';
		lockerIcon.animate({bottom: -50, opacity: 0.0, duration: 300});
		keybox.opacity = 1.0;
		keybox.height = 40;
		//keybox.animate({opacity: 1.0, height: 40, duration: 200});
	});
	headerContainer.add(lockerIcon);
	var lockerBar = Ti.UI.createView({
		top: 0,
		width: 26,
		height: 26,
		borderRadius: 13,
		backgroundColor: '#dedede'
	});
	lockerIcon.add(lockerBar);
	var lockerHole = Ti.UI.createView({
		top: 6,
		width: 20,
		height: 20,
		borderRadius: 10,
		backgroundColor: '#ffffff'
	});
	lockerIcon.add(lockerHole);
	var lockerBody = Ti.UI.createView({
		bottom: 0,
		width: 30,
		height: 17,
		borderRadius: 5,
		backgroundColor: '#dedede'
	});
	lockerIcon.add(lockerBody);
	var lockerKeyHole = Ti.UI.createView({
		bottom: 5,
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#ffffff'
	});
	lockerIcon.add(lockerKeyHole);
	
	// KEY-BOX
	var keybox = Ti.UI.createView({
		width: Ti.UI.FILL,
		height: 40,
		backgroundColor: '#88829FB8'
	});
	self.add(keybox);
	
	var keyField = Ti.UI.createTextField({
		passwordMask: true,
		left: 5,
		right: 65,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		color: '#fff',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: 'Enter Key',
		autocapitalization: false,
		autocorrect: false,
		clearOnEdit: true,
		value: '',
		font: {fontSize: '16sp'}
	});
	keybox.add(keyField);
	
	var btnSet = Ti.UI.createView({
		width: 60,
		right: 5,
		height: Ti.UI.FILL,
		backgroundColor: 'transparent'
	});
	var btnLbl = Ti.UI.createLabel({
		center: {x:'50%',y:'50%'},
		text: L('setKey'),
		font: {fontSize: '14sp'},
		color: '#000',
		touchEnabled: false
	});
	btnSet.add(btnLbl);
	btnSet.addEventListener('click', function () {
		key = keyField.value.toString();
		keyField.value = '';
		keyField.blur();
		keybox.animate({height: 1, opacity: 0.0, duration: 300});
		lockerIcon.animate({bottom: 5, opacity: 1.0, duration: 300});
	});
	keybox.add(btnSet);
	
	// CONTENT
	var scrollView = Ti.UI.createScrollView({
		height: Ti.UI.FILL,
		width: Ti.UI.FILL,
		backgroundColor: '#dedede'
	});
	self.add(scrollView);
	
	var tableView = Ti.UI.createTableView({
		top: 5,
		backgroundColor: scrollView.backgroundColor,
		width: Ti.UI.FILL,
		height: Ti.UI.SIZE,
		separatorStyle: (Ti.Platform.osname != 'android') ? Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE : '',
		separatorColor: 'transparent'
	});
	tableView.addEventListener('click', function(e) {
		if ( key.length ) {
			var rowTitle = e.row.title;
			var rowText = Ti.App.Blowfish.encrypt( e.row.value.text, key );
			var detailWindow = new DetailWindow({title: rowTitle, text: rowText, key: key}).open();
		} else {
			alert(L('keyAlert'));
		}
	});
	scrollView.add(tableView);
	
	var testData = [
		{title: 'test 0', text: 'text 0'},
		{title: 'test 1', text: 'text 1'},
		{title: 'test 2', text: 'text 2'},
		{title: 'test 3', text: 'text 3'},
		{title: 'test 4', text: 'text 4'},
		{title: 'test 5', text: 'text 5'},
		{title: 'test 6', text: 'text 6'}
	];
	
	for (var i = 0; i < testData.length; i++) {
		var row = Ti.UI.createTableViewRow({
			backgroundColor: '#88ffffff',
			title: testData[i].title,
			font: {fontSize: '18sp'},
			color: '#000000',
			value: testData[i],
			height: 50,
			backgroundSelectedColor: '#829FB8',
			selectedColor: '#829FB8'
		});
		tableView.appendRow(row);
	}
	
	return self;
}

module.exports = FirstView;
