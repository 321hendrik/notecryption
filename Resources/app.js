(function() {
	// Blowfish Encryption Module
	Ti.App.Blowfish = require('/lib/Blowfish');
	
	//render appropriate components based on the platform and form factor
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	Window = require('ui/handheld/ApplicationWindow');
	// if (isTablet) {
		// Window = require('ui/tablet/ApplicationWindow');
	// }
	// else {
		// // Android uses platform-specific properties to create windows.
		// // All other platforms follow a similar UI pattern.
		// if (osname === 'android') {
			// Window = require('ui/handheld/android/ApplicationWindow');
		// }
		// else {
			// Window = require('ui/handheld/ApplicationWindow');
		// }
	// }
	new Window().open();
})();
