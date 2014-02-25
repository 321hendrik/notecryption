//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies
	var MasterView = require('ui/common/MasterView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#dedede',
		navBarHidden:true,
		fullscreen: false,
		modal: false,
		exitOnClose: true
	});
		
	//construct UI
	var masterView = new MasterView(self);
	self.add(masterView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
