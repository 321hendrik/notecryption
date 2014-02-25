//FirstView Component Constructor
function FirstView(parent) {
	var DetailWindow = require('/ui/handheld/DetailWindow');
	var key = '';
	var detailLaunch = false;

	var windowOpenAnimation;
	if (Ti.App.isAndroid) {
		windowOpenAnimation = {
			animated: false
		};
	} else {
		windowOpenAnimation = {
			transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_RIGHT
		};
	}

	function colorNotify (viewObj, highlightColor) {
		var baseColor = viewObj.backgroundColor;
		viewObj.animate({
			backgroundColor: baseColor,
			duration: 200
		}, function () {
			viewObj.animate({
				backgroundColor: highlightColor,
				duration: 200
			});
		});
	}
	
	//create app directory
	var appDir = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'entries');
	if ( !appDir.exists() ) {
		appDir.createDirectory();
	}
	
	var self = Ti.UI.createView({
		top: (Ti.App.iOS7) ? 20 : 0,
		layout: 'vertical'
	});
	
	// HEADER
	var headerContainer = Ti.UI.createView({
		top: 0,
		height: Ti.UI.SIZE,
		width: Ti.UI.FILL,
		backgroundColor: '#fff'
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
		opacity: 0.0,
		active: false
	});
	lockerIcon.addEventListener('click', function () {
		if (lockerIcon.active){
			key = '';
			lockerIcon.animate({bottom: -50, opacity: 0.0, duration: 300});
			lockerIcon.active = false;
			if (Ti.App.isAndroid) {
				tableView.animate({top: 90, duration: 200});
				keybox.animate({opacity: 1.0, height: 40, duration: 200});
			} else {
				keybox.opacity = 1.0;
				keybox.height = 40;
			}
		}
	});
	headerContainer.add(lockerIcon);
	var lockerBar = Ti.UI.createView({
		top: 0,
		width: 26,
		height: 26,
		borderRadius: (Ti.App.isAndroid) ? 26 : 13,
		backgroundColor: '#dedede'
	});
	lockerIcon.add(lockerBar);
	var lockerHole = Ti.UI.createView({
		top: 6,
		width: 20,
		height: 20,
		borderRadius: (Ti.App.isAndroid) ? 20 : 10,
		backgroundColor: '#ffffff'
	});
	lockerIcon.add(lockerHole);
	var lockerBody = Ti.UI.createView({
		bottom: 0,
		width: 30,
		height: 17,
		borderRadius: (Ti.App.isAndroid) ? 10 : 5,
		backgroundColor: '#dedede'
	});
	lockerIcon.add(lockerBody);
	var lockerKeyHole = Ti.UI.createView({
		bottom: 5,
		width: 8,
		height: 8,
		borderRadius: (Ti.App.isAndroid) ? 8 : 4,
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
		right: 85,
		width: Ti.UI.FILL,
		height: Ti.UI.FILL,
		color: '#fff',
		keyboardType: Ti.UI.KEYBOARD_DEFAULT,
		returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
		textAlign: 'center',
		hintText: L('enterKey'),
		autocapitalization: false,
		autocorrect: false,
		clearOnEdit: true,
		value: '',
		font: {fontSize: '16sp'}
	});
	keybox.add(keyField);
	
	var btnSet = Ti.UI.createView({
		width: Ti.UI.SIZE,
		right: 5,
		height: Ti.UI.FILL,
		backgroundColor: 'transparent'
	});
	var btnLbl = Ti.UI.createLabel({
		center: {x:'50%',y:'50%'},
		text: L('setKey'),
		font: {fontSize: '14sp'},
		color: '#ffffff',
		touchEnabled: false
	});
	btnSet.add(btnLbl);
	btnSet.addEventListener('click', function () {
		key = keyField.value.toString();
		keyField.value = '';
		keyField.blur();
		if (Ti.App.isAndroid) {
			tableView.animate({top: 50, duration: 300});
		}
		keybox.animate({height: 1, opacity: 0.0, duration: 300, backgroundColor: '#88829FB8'});
		lockerIcon.active = true;
		lockerIcon.animate({bottom: 5, opacity: 1.0, duration: 300});
	});
	keybox.add(btnSet);
	
	// CONTENT
	var tableView = Ti.UI.createTableView({
		top: 5,
		width: Ti.UI.FILL,
		height: '110%',
		backgroundColor: '#dedede',
		bottom: 0,
		separatorStyle: (Ti.Platform.osname != 'android') ? Ti.UI.iPhone.TableViewSeparatorStyle.SINGLE_LINE : '',
		separatorColor: 'transparent'
	});
	tableView.addEventListener('click', function(e) {
		if ( key.length ) {
			//var rowText = Ti.App.Blowfish.encrypt( e.row.value.text, key );
			var rowTitle = ( e.row.title == ' ' + L('newEntry') ) ? '' : e.row.title;

			var detailWindow = new DetailWindow({
				title: rowTitle.slice(1),
				text: e.row.value.text,
				key: key,
				filePath: e.row.value.filePath,
				update: updateTableView
			});

			if (Ti.App.isAndroid) {
				detailLaunch = true;
				detailWindow.addEventListener('close', function() {
					detailLaunch = false;
				});
			}

			detailWindow.open(windowOpenAnimation);
		} else {
			colorNotify(keybox, '#88D44E4E');
			// '#88D44E4E' <-red '#88829FB8' <-blue
		}
	});
	self.add(tableView);
	
	function updateTableView(callback) {
		// load files and parse entries
		var appDirFiles = appDir.getDirectoryListing();
		var entries = [];
		for (i = 0; i < appDirFiles.length; i++) {
			var file = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'entries', appDirFiles[i]);
			if ( file.exists() ) {
				var entry = JSON.parse(file.read());
				entries.push({title: entry.title, text: entry.text, filePath: file.getNativePath()});
			}
		}
		
		var tableData = [];
		
		// generate tableView rows
		var newEntryRow = Ti.UI.createTableViewRow({
			backgroundColor: '#3AC23F',
			title: ' ' + L('newEntry'),
			font: {fontSize: '18sp'},
			color: '#000000',
			value: {title: '', text: '', filePath: null},
			height: 40,
			backgroundSelectedColor: '#829FB8',
			selectedColor: '#829FB8',
		});
		tableData.push(newEntryRow);
		
		for (var i = 0; i < entries.length; i++) {
			Ti.API.log(entries[i].filePath);
			var row = Ti.UI.createTableViewRow({
				backgroundColor: (i % 2) ? '#99ffffff' : '#77ffffff',
				title: ' ' + entries[i].title,
				font: {fontSize: '18sp'},
				color: '#000000',
				value: entries[i],
				height: 40,
				backgroundSelectedColor: '#829FB8',
				selectedColor: '#829FB8'
			});
			tableData.push(row);
		}
		
		// update tableView
		tableView.setData(tableData);

		callback();
	}
	updateTableView(function () {});

	if (Ti.App.isAndroid) {
		parent.addEventListener('open', function () {
			var activity = parent.getActivity();
			activity.addEventListener('pause', function() {
				if (!detailLaunch) {
					lockerIcon.fireEvent('click');
					Ti.API.info("paused and left");
				} else {
					Ti.API.info("paused");
				}
			});
		});
	} else {
		Ti.App.addEventListener('pause', function(e) {
			lockerIcon.fireEvent('click');
		});
	}
		
	
	return self;
}

module.exports = FirstView;
