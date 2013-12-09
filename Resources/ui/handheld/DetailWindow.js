
function DetailWindow(args) {
	//load component dependencies
	var DetailView = require('ui/common/DetailView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor: '#ffffff',
		navBarHidden: true,
		fullscreen: false,
		exitOnClose: false
	});
		
	//construct UI
	var detailView = new DetailView(args, self);
	self.add(detailView);
	
	return self;
}

module.exports = DetailWindow;
