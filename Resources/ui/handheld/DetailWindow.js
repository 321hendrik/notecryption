
function DetailWindow(args) {
	//load component dependencies
	var DetailView = require('ui/common/DetailView');
		
	//create component instance
	var detailWindow = Ti.UI.createWindow({
		backgroundColor: '#ffffff',
		navBarHidden: true,
		fullscreen: false,
		modal: false,
		exitOnClose: false
	});

	var windowCloseAnimation;
	if (Ti.App.isAndroid) {
		windowCloseAnimation = {
			animated: false
		};
	} else {
		windowCloseAnimation = {
			transition: Titanium.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT
		};
	}

	detailWindow.shouldClose = function () {
		detailWindow.close(windowCloseAnimation);
	};
	
	//construct UI
	var detailView = new DetailView(args, detailWindow);
	detailWindow.add(detailView);
	
	return detailWindow;
}

module.exports = DetailWindow;
