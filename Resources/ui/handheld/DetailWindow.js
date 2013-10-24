
function DetailWindow(text) {
	//load component dependencies
	var DetailView = require('ui/common/DetailView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff',
		navBarHidden:true
	});
		
	//construct UI
	var detailView = new DetailView({text: text, parent: self});
	self.add(detailView);
	
	return self;
}

module.exports = DetailWindow;
