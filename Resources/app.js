(function() {
	// Blowfish Encryption Module
	Ti.App.Blowfish = require('/lib/Blowfish');
	
	// iOS Version
	function isiOS7Plus() {
		if (Titanium.Platform.name == 'iPhone OS')
		{
			var version = Titanium.Platform.version.split(".");
			var major = parseInt(version[0],10);
			
			if (major >= 7)
			{
				return true;
			}
		}
		return false;
	}

	Ti.App.colorNotify = function colorNotify (viewObj, highlightColor) {
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
	};
	
	Ti.App.iOS7 = isiOS7Plus();
	Ti.App.isAndroid = Ti.Platform.getOsname() == 'android';
	
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	Window = require('ui/' + ((isTablet) ? 'tablet' : 'handheld') + '/ApplicationWindow');
	new Window().open();
})();
