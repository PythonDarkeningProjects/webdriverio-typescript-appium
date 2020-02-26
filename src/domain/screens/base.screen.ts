import shell = require('shelljs');

export default class Screen {

	public static IDNumberforEmployeeIDScreen: string = '27';
	public static IDNumberforPinScreen: string = '8';
	public static costCodeListItem: number = 0;
	public static customerID_1: string = 'itexicosandbox';
	public static customerID_2: string = 'itexicosandbox2';
	public static customerID_Host_1: string = 'itexicosandbox.tcplusondemand.com';
	public static customerID_Host_2: string = 'itexicosandbox2.tcplusondemand.com';
	public static defaultCompanyName: string = 'iTexico Sandbox  1'
	public static defaultNamespace: string = ''
	public static defaultEmployeeID: string = '1'
	public static jobCodeListItem: number = 1;
	public static packageName = 'com.timeclockplus.MobileClock';
	public static selectCompanyListItem: number = 0;

	createScreenshotsFolder() {
		shell.mkdir('-p', './screenshots');
	}
}
