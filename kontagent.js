function KtParameterException(message)
{
	this.name = "KtParameterException";
	this.message = (message) ? message : "";
}

KtParameterException.prototype = new Error();


function Kontagent(apiKey, secretKey, useTestServer, validateParams)
{
	this._baseApiUrl = "http://api.geo.kontagent.net/api/v1/";
	this._baseTestServerUrl = "http://test-server.kontagent.net/api/v1/";

	this._apiKey = apiKey;
	this._secretKey = secretKey;
	this._useTestServer = (useTestServer) ? useTestServer : false;
	this._validateParams = (validateParams) ? validateParams : true;
}

Kontagent.prototype._sendMessageViaImgTag = function(messageType, params, callback)
{
	if (this._validateParams) {
		var result;

		for (var paramKey in params) {
			result = KtValidator.validateParameter(messageType, paramKey, params[paramKey]);

			if (result != true) {
				throw new KtParameterException(result);
			}
		}
	}

 	var img = new Image();
	
	img.onerror = callback;
	img.onload = callback;
	
	if (this._useTestServer == true) {
		img.src = this._baseTestServerUrl + this._apiKey + "/" + messageType + "/?" + this._httpBuildQuery(params);
	} else {
		img.src = this._baseApiUrl + this._apiKey + "/" + messageType + "/?" + this._httpBuildQuery(params);
	}
}

Kontagent.prototype._httpBuildQuery = function(data) 
{
	var query, key, val;
	var tmpArray = [];

	for(key in data) {
		val = encodeURIComponent(decodeURIComponent(data[key].toString()));
		key = encodeURIComponent(decodeURIComponent(key));

		tmpArray.push(key + "=" + val);  
	}

	return tmpArray.join("&");
}

Kontagent.prototype._s4 = function() 
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

/* Helper Methods */

Kontagent.prototype.genUniqueTrackingTag = function()
{
	var uniqueTrackingTag = "";
	
	for(i=0; i<4; i++) {
		uniqueTrackingTag += this._s4();
	}
	
	return uniqueTrackingTag;
}

Kontagent.prototype.genShortUniqueTrackingTag = function()
{
	var shortUniqueTrackingTag = "";
	
	for(i=0; i<2; i++) {
		shortUniqueTrackingTag += this._s4();
	}
	
	return shortUniqueTrackingTag;
}

/* Tracking Methods */

Kontagent.prototype.trackInviteSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	

	this._sendMessageViaImgTag("ins", apiParams, callback);
}

Kontagent.prototype.trackInviteResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("inr", apiParams, callback);
}

Kontagent.prototype.trackNotificationSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("nts", apiParams, callback);
}

Kontagent.prototype.trackNotificationResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("ntr", apiParams, callback);
}

Kontagent.prototype.trackNotificationEmailSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	

	this._sendMessageViaImgTag("nes", apiParams, callback);
}

Kontagent.prototype.trackNotificationEmailResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }
	
	this._sendMessageViaImgTag("nei", apiParams, callback);
}

Kontagent.prototype.trackStreamPost = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		u : params.uniqueTrackingTag,
		tu : params.type
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }

	this._sendMessageViaImgTag("pst", apiParams, callback);
}

Kontagent.prototype.trackStreamPostResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag,
		tu : params.type
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }

	this._sendMessageViaImgTag("psr", apiParams, callback);
}

Kontagent.prototype.trackEvent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		n : params.eventName
	};
	
	if (params.value) { apiParams.v = params.value; }
	if (params.level) { apiParams.l = params.level; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	

	this._sendMessageViaImgTag("evt", apiParams, callback);
}

Kontagent.prototype.trackApplicationAdded = function(params, callback)
{
	var apiParams = {s : params.userId};
	
	if (params.uniqueTrackingTag) { apiParams.u = params.uniqueTrackingTag; }
	if (params.shortUniqueTrackingTag) { apiParams.su = params.shortUniqueTrackingTag; }

	console.log(apiParams);

	this._sendMessageViaImgTag("apa", apiParams, callback);
}

Kontagent.prototype.trackApplicationRemoved = function(params, callback)
{
	var apiParams = {s : params.userId};
	
	this._sendMessageViaImgTag("apr", apiParams, callback);
}

Kontagent.prototype.trackThirdPartyCommClick = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		tu : params.type,
		su : params.shortUniqueTrackingTag
	};
	
	if (params.userId) { apiParams.s = params.userId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }
	
	this._sendMessageViaImgTag("ucc", apiParams, callback);
}

Kontagent.prototype.trackPageRequest = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		ts : Math.round(new Date().getTime() / 1000)
	};
	
	if (params.ipAddress) { apiParams.ip = params.ipAddress; }
	if (params.pageAddress) { apiParams.u = params.pageAddress; }

	this._sendMessageViaImgTag("pgr", apiParams, callback);
}

Kontagent.prototype.trackUserInformation = function (params, callback)
{
	var apiParams = {s : params.userId};
	
	if (params.birthYear) { apiParams.b = params.birthYear; }
	if (params.gender) { apiParams.g = params.gender; }
	if (params.country) { apiParams.lc = params.country; }
	if (params.friendCount) { apiParams.f = params.friendCount; }
	
	this._sendMessageViaImgTag("cpu", apiParams, callback);
}

Kontagent.prototype.trackGoalCount = function(params, callback)
{
	var apiParams = {s : params.userId};
	
	if (params.goalCount1) { apiParams.gc1 = params.goalCount1; }
	if (params.goalCount2) { apiParams.gc2 = params.goalCount2; }
	if (params.goalCount3) { apiParams.gc3 = params.goalCount3; }
	if (params.goalCount4) { apiParams.gc4 = params.goalCount4; }

	this._sendMessageViaImgTag("gci", apiParams, callback);
}

Kontagent.prototype.trackRevenueTracking = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		v : params.value
	};
	
	if (params.type) { apiParams.tu = params.type; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }

	this._sendMessageViaImgTag("mtu", apiParams, callback);
}

// Kontagent Validator

function KtValidator()
{
}

KtValidator.validateParameter = function(messageType, paramName, paramValue) 
{
	return KtValidator['_validate' + KtValidator._upperCaseFirst(paramName)](messageType, paramName, paramValue);
}

KtValidator._upperCaseFirst = function(stringVal)
{
	return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
}

KtValidator._validateB = function(messageType, paramName, paramValue) 
{
	// birthyear param (cpu message)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue) 
		|| paramValue < 1900 || paramValue > 2011
	) {
		return 'Invalid birth year.';
	} else {
		return true;
	}

}

KtValidator._validateF = function(messageType, paramName, paramValue) 
{
	// friend count param (cpu message)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue) || paramValue < 0) {
		return 'Invalid friend count.'
	} else {
		return true;
	}
}

KtValidator._validateG = function(messageType, paramName, paramValue) 
{	
	// gender param (cpu message)
	var regex = /^[mfu]$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid gender.';
	} else {
		return true;
	}
}

KtValidator._validateGc1 = function(messageType, paramName, paramValue) 
{
	// goal count param (gc1, gc2, gc3, gc4 messages)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue) 
		|| paramValue < -16384 || paramValue > 16384
	) {
		return 'Invalid goal count value.';
	} else {
		return true;
	}
}

KtValidator._validateGc2 = function(messageType, paramName, paramValue) 
{
	return KtValidator._validateGc1(messageType, paramName, paramValue);
}

KtValidator._validateGc3 = function(messageType, paramName, paramValue) 
{
	return KtValidator._validateGc1(messageType, paramName, paramValue);
}

KtValidator._validateGc4 = function(messageType, paramName, paramValue) 
{
	return KtValidator._validateGc1(messageType, paramName, paramValue);
}

KtValidator._validateI = function(messageType, paramName, paramValue) 
{
	// isAppInstalled param (inr, psr, ner, nei messages)
	var regex = /^[01]$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid isAppInstalled value.';
	} else {
		return true;
	}
}

KtValidator._validateIp = function(messageType, paramName, paramValue) 
{
	// ip param (pgr messages)
	var regex = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\.\d{1,3})?$/; 

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid IP address value.';
	} else {
		return true;
	}
}

KtValidator._validateL = function(messageType, paramName, paramValue) 
{
	// level param (evt messages)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue) || paramValue < 0) {
		return 'Invalid level value.';
	} else {
		return true;
	}
}

KtValidator._validateLc = function(messageType, paramName, paramValue) 
{
	// country param (cpu messages)
	var regex = /^[A-Z]{2}$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid country value.';
	} else {
		return true;
	}
}

KtValidator._validateLp = function(messageType, paramName, paramValue) 
{
	// postal/zip code param (cpu messages)
	// this parameter isn't being used so we just return true for now
	return true;
}

KtValidator._validateLs = function(messageType, paramName, paramValue) 
{
	// state param (cpu messages)
	// this parameter isn't being used so we just return true for now
	return true;
}

KtValidator._validateN = function(messageType, paramName, paramValue) 
{
	// event name param (evt messages)
	var regex = /^[A-Za-z0-9-_]{1,32}$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid event name value.';
	} else {
		return true;
	}
}

KtValidator._validateR = function(messageType, paramName, paramValue) 
{
	// Sending messages include multiple recipients (comma separated) and
	// response messages can only contain 1 recipient UID.
	if (messageType == 'ins' || messageType == 'nes' || messageType == 'nts') {
		// recipients param (ins, nes, nts messages)
		var regex = /^[0-9]+(,[0-9]+)*$/;

		if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
			return 'Invalid recipient user ids.';
		}
	} else if (messageType == 'inr' || messageType == 'psr' || messageType == 'nei' || messageType == 'ntr') {
		// recipient param (inr, psr, nei, ntr messages)
		if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue)) {
			return 'Invalid recipient user id.';
		}
	}

	return true;
}

KtValidator._validateS = function(messageType, paramName, paramValue) 
{
	// userId param
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue)) {
		return 'Invalid user id.';
	} else {
		return true;
	}
}

KtValidator._validateSt1 = function(messageType, paramName, paramValue) 
{
	// subtype1 param
	var regex = /^[A-Za-z0-9-_]{1,32}$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid subtype value.';
	} else {
		return true;
	}
}

KtValidator._validateSt2 = function(messageType, paramName, paramValue) 
{
	return KtValidator._validateSt1(messageType, paramName, paramValue);
}

KtValidator._validateSt3 = function(messageType, paramName, paramValue) 
{
	return KtValidator._validateSt1(messageType, paramName, paramValue);
}

KtValidator._validateSu = function(messageType, paramName, paramValue) 
{
	// short tracking tag param
	var regex = /^[A-Fa-f0-9]{8}$/;

	if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
		return 'Invalid short unique tracking tag.';
	} else {
		return true;
	}
}

KtValidator._validateTs = function(messageType, paramName, paramValue) 
{
	// timestamp param (pgr message)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue)) {
		return 'Invalid timestamp.';
	} else {
		return true;
	}
}

KtValidator._validateTu = function(messageType, paramName, paramValue) 
{
	// type parameter (mtu, pst/psr, ucc messages)
	// acceptable values for this parameter depends on the message type
	var regex;

	if (messageType == 'mtu') {
		regex = /^(direct|indirect|advertisement|credits|other)$/;
	
		if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
			return 'Invalid monetization type.';
		}
	} else if (messageType == 'pst' || messageType == 'psr') {
		regex = /^(feedpub|stream|feedstory|multifeedstory|dashboard_activity|dashboard_globalnews)$/;

		if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
			return 'Invalid stream post/response type.';
		}
	} else if (messageType == 'ucc') {
		regex = /^(ad|partner)$/;

		if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
			return 'Invalid third party communication click type.';
		}
	}
	
	return true;
}

KtValidator._validateU = function(messageType, paramName, paramValue) 
{
	// unique tracking tag parameter for all messages EXCEPT pgr.
	// for pgr messages, this is the "page address" param
	if (messageType != 'pgr') {
		var regex = /^[A-Fa-f0-9]{16}$/;

		if (typeof paramValue == "undefined" || !regex.test(paramValue)) {
			return 'Invalid unique tracking tag.';
		}
	}
	
	return true;
}

KtValidator._validateV = function(messageType, paramName, paramValue) 
{
	// value param (mtu, evt messages)
	if (typeof paramValue == "undefined" || paramValue != parseInt(paramValue)) {
		return 'Invalid value.';
	} else {
		return true;
	}
}
