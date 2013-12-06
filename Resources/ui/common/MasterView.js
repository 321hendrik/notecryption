//FirstView Component Constructor
function FirstView() {
	var DetailWindow = require('/ui/handheld/DetailWindow');
	var key = '';
	
	//create app directory
	var appDir = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'entries');
	if ( !appDir.exists() ) {
		appDir.createDirectory();
	}
	
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
			//var rowText = Ti.App.Blowfish.encrypt( e.row.value.text, key );
			var rowTitle = ( e.row.title == L('newEntry') ) ? '' : e.row.title;
			var detailWindow = new DetailWindow({title: rowTitle, text: e.row.value.text, key: key, fileObject: e.row.fileObject});
			detailWindow.addEventListener('close', function () {
				updateTableView();
			});
			detailWindow.open();
		} else {
			alert(L('keyAlert'));
		}
	});
	scrollView.add(tableView);
	
	function updateTableView() {
		// load files and parse entries
		var appDirFiles = appDir.getDirectoryListing();
		var entries = [];
		for (i = 0; i < appDirFiles.length; i++) {
			var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'entries', appDirFiles[i]);
			if ( file.exists() ) {
				var entry = JSON.parse(file.read());
				entries.push({title: entry.title, text: entry.text, fileObject: file.nativePath});
			}
		}
		
		// clear tableView
		tableView.setData([]);
		
		// generate tableView rows
		var newEntryRow = Ti.UI.createTableViewRow({
			backgroundColor: '#883AC23F',
			title: L('newEntry'),
			font: {fontSize: '18sp'},
			color: '#000000',
			value: {title: '', text: '', path: ''},
			height: 40,
			backgroundSelectedColor: '#829FB8',
			selectedColor: '#829FB8',
			fileObject: null
		});
		tableView.appendRow(newEntryRow);
		
		for (var i = 0; i < entries.length; i++) {
			var row = Ti.UI.createTableViewRow({
				backgroundColor: '#88ffffff',
				title: entries[i].title,
				font: {fontSize: '18sp'},
				color: '#000000',
				value: entries[i],
				height: 40,
				backgroundSelectedColor: '#829FB8',
				selectedColor: '#829FB8',
				fileObject: entries[i].fileObject
			});
			tableView.appendRow(row);
		}
	}
	updateTableView();
	
	return self;
}

module.exports = FirstView;
