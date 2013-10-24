//FirstView Component Constructor
function FirstView(args) {
	
	var text = args.text;
	var parent = args.parent;
	
	var self = Ti.UI.createView({
		layout: 'vertical'
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
	
	var scrollView = Ti.UI.createScrollView({
		backgroundColor: '#dedede'
	});
	self.add(scrollView);
	
	var label = Ti.UI.createLabel({
		text: 'DetailWindow '+text,
	});
	scrollView.add(label);
	
	var btnClose = Ti.UI.createButton({
		bottom: 10,
		width: 100,
		height: 40,
		title: 'close'
	});
	btnClose.addEventListener('click', function () {
		parent.close();
	});
	scrollView.add(btnClose);
	
	return self;
}

module.exports = FirstView;
