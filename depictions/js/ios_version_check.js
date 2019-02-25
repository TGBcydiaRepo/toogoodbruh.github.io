/*
I saw some parts of this code on the internet. I forgot where. If it's yours
let me know and I'll credit you.
*/

// changed const to var for IE9/10 compatibity.
var VERSION_CHECK_SUPPORTED = "Your iOS version is supported! &#x1f60a;";
var VERSION_CHECK_NEEDS_UPGRADE = "Requires at least iOS %s &#x1f615;";
var VERSION_CHECK_UNCONFIRMED = "Not yet tested on iOS %s &#x1f601;";
var VERSION_CHECK_UNSUPPORTED = "Only compatible with iOS %s to %s &#x1f61e;";

/* ADDED
  [ Detect iOS Version ]
  supports iOS 2.0 or later
  call iOSversion() function will get:
    status: boolean;  -- get iOS version: true, none: false
    version: int; -- ex 11
    info: string; -- ex IOS 11.2.6
*/

function iOSversion() {
  let d, v;
  if (/iP(hone|od|ad)/.test(navigator.platform)) {
    v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
    d = {
      status: true,
      version: parseInt(v[1], 10) ,
      info: parseInt(v[1], 10)+'.'+parseInt(v[2], 10)+'.'+parseInt(v[3] || 0, 10)
    };
  }else{
    d = {status:false, version: false, info:''}
  }
  return d;
}

let iosVer = iOSversion();
if (iosVer.status) {
  alert('iOS : '+iosVer.info+', version : '+iosVer.version);
  //ex. IOS 11.2.6, version 11

}else{
  console.log('not iPhone or iPad');
} //END ADDED


function ios_version_check(minIOS,maxIOS,otherIOS,callBack) {
	"use strict";


	function parseVersionString(version) {
		var bits = version.split(".");
		return [ bits[0], bits[1] ? bits[1] : 0, bits[2] ? bits[2] : 0 ];
	}

	function compareVersions(one, two) {
		// https://gist.github.com/TheDistantSea/8021359
		for (var i = 0; i < one.length; ++i) {
			if (two.length == i) {
				return 1;
			}

			if (one[i] == two[i]) {
				continue;
			} else if (one[i] > two[i]) {
				return 1;
			} else {
				return -1;
			}
		}

		if (one.length != two.length) {
			return -1;
		}

		return 0;
	}

//navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/
	//var version = navigator.appVersion.match(/CPU( iPhone)? OS (\d+)_(\d+)(_(\d+))? like/i); original line
  var version = var version = navigator.appVersion.match(/CPU( iPhone)? OS (\d+)_(\d+)(_(\d+))? like/i); like/i);
	if (!version) {
		return 0;
	}

	var osVersion = [ version[2], version[3], version[4] ? version[5] : 0 ],

		osString = osVersion[0] + "." + osVersion[1] + (osVersion[2] && osVersion[2] != 0 ? "." + osVersion[2] : ""),
		minString = minIOS,
		maxString = maxIOS,

		minVersion = parseVersionString(minString),
		maxVersion = maxString ? parseVersionString(maxString) : null,

		message = VERSION_CHECK_SUPPORTED,
		isBad = false;

	if (compareVersions(minVersion, osVersion) == 1) {
		message = VERSION_CHECK_NEEDS_UPGRADE.replace("%s", minString);
		isBad = true;
	} else if (maxVersion && compareVersions(maxVersion, osVersion) == -1) {
		if ("unsupported" == otherIOS) {
			message = VERSION_CHECK_UNSUPPORTED.replace("%s", minString).replace("%s", maxString);
		} else {
			message = VERSION_CHECK_UNCONFIRMED.replace("%s", osString);
		}

		isBad = true;
	}
	callBack(message,isBad);

	return (isBad?-1:1);
}
