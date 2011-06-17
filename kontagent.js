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

Kontagent.prototype.genTrackingTag = function()
{
	var trackingTag = "";
	
	for(i=0; i<8; i++) {
		trackingTag += this._s4();
	}
	
	return trackingTag;
}

Kontagent.prototype.genShortTrackingTag = function()
{
	var shortTrackingTag = "";
	
	for(i=0; i<8; i++) {
		shortTrackingTag += this._s4();
	}
	
	return shortTrackingTag;
}

/* Tracking Methods */

Kontagent.prototype.trackInviteSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	

	this._sendMessageViaImgTag("ins", apiParams, callback);
}

Kontagent.prototype.trackInviteResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	
	
	this._sendMessageViaImgTag("inr", apiParams, callback);
}

Kontagent.prototype.trackNotificationSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	
	
	this._sendMessageViaImgTag("nts", apiParams, callback);
}

Kontagent.prototype.trackNotificationResponse = function(params, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	
	
	this._sendMessageViaImgTag("ntr", apiParams, callback);
}

Kontagent.prototype.trackNotificationEmailSent = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	

	this._sendMessageViaImgTag("nes", apiParams, callback);
}

Kontagent.prototype.trackNotificationEmailResponse = functionparams, callback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	
	
	this._sendMessageViaImgTag("nei", apiParams, callback);
}

Kontagent.prototype.trackStreamPost = function(params, callback)
{
	var apiParams = {
		s : params.userId,
		u : params.uniqueTrackingTag,
		tu : params.type
	};
	
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	

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
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }

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
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	

	this._sendMessageViaImgTag("evt", apiParams, callback);
}

Kontagent.prototype.trackApplicationAdded = function(params, callback)
{
	var apiParams = {s : params.userId};
	
	if (params.uniqueTrackingTag) { apiParams.u = params.uniqueTrackingTag; }
	if (params.shortUniqueTrackingTag) { apiParams.su = params.shortUniqueTrackingTag; }

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
		tu : params.type
	};
	
	if (params.shortUniqueTrackingTag) { apiParams.su = params.shortUniqueTrackingTag; }
	if (params.userId) { apiParams.s = params.userId; }
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }	
	
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
	if (params.st1) { apiParams.st1 = params.st1; }
	if (params.st2) { apiParams.st2 = params.st2; }
	if (params.st3) { apiParams.st3 = params.st3; }

	this._sendMessageViaImgTag("mtu", apiParams, callback);
}


function KtValidator()
{
}

KtValidator.validateParameter = function(messageType, paramName, paramValue) 
{
	var funcName = 'KtValidator._validate' + KtValidator._upperCaseFirst(paramName);
	return eval(funcName + '()');
}

KtValidator._upperCaseFirst = function(stringVal)
{
	return stringVal.charAt(0).toUpperCase() + stringVal.slice(1);
}

KtValidator._validateB(messageType, paramValue)
{
	// birthyear param (cpu message)
	if (paramValue != parseInt(paramValue) || paramValue < 1900 || paramValue > 2011) {
		return 'Invalid birth year.';
	} else {
		return true;
	}

}

KtValidator._validateF(messageType, paramValue)
{
	// friend count param (cpu message)
	if (paramValue != parseInt(paramValue) || paramValue < 0) {
		return 'Invalid friend count.'
	} else {
		return true;
	}
}

KtValidator._validateG(messageType, paramValue)
{
	// gender param (cpu message)
	if (paramvalue.match(/^[mfu]$/) == null) {
		return 'Invalid gender.';
	} else {
		return true;
	}
}

KtValidator._validateGc1(messageType, paramValue)
{
	// goal count param (gc1, gc2, gc3, gc4 messages)
	if (paramValue != parseInt(paramValue) || paramValue < -16384 || paramValue > 16384) {
		return 'Invalid goal count value.';
	} else {
		return true;
	}
}

KtValidator._validateGc2(messageType, paramValue)
{
	return KtValidator._validateGc1(messageType, paramValue);
}

KtValidator._validateGc3(messageType, paramValue)
{
	return KtValidator._validateGc1(messageType, paramValue);
}

KtValidator._validateGc4(messageType, paramValue)
{
	return KtValidator._validateGc1(messageType, paramValue);
}

KtValidator._validateI(messageType, paramValue)
{
	// isAppInstalled param (inr, psr, ner, nei messages)
	if (paramValue.match(/^(0|1)$/) == null) {
		return 'Invalid isAppInstalled value.';
	} else {
		return true;
	}
}

KtValidator._validateIp(messageType, paramValue)
{
	// ip param (pgr messages)
	if (paramValue.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(\.\d{1,3})?$/) == null) {
		return 'Invalid IP address value.';
	} else {
		return true;
	}
}

KtValidator._validateL(messageType, paramValue)
{
	// level param (evt messages)
	if (paramValue != parseInt(paramValue) || paramValue < 0) {
		return 'Invalid level value.';
	} else {
		return true;
	}
}

KtValidator._validateLc(messageType, paramValue)
{
	// country param (cpu messages)
	if (paramValue.match(/^[A-Z]{2}$/) == null) {
		return 'Invalid country value.';
	} else {
		return true;
	}
}

KtValidator._validateLp(messageType, paramValue)
{
	// postal/zip code param (cpu messages)
	// this parameter isn't being used so we just return true for now
	return true;
}

KtValidator._validateLs(messageType, paramValue)
{
	// state param (cpu messages)
	// this parameter isn't being used so we just return true for now
	return true;
}

KtValidator._validateN(messageType, paramValue)
{
	// event name param (evt messages)
	if (paramValue.match(/^[A-Za-z0-9-_]{1,32}$/) == null) {
		return 'Invalid event name value.';
	} else {
		return true;
	}
}

KtValidator._validateR(messageType, paramValue)
{
	// Sending messages include multiple recipients (comma separated) and
	// response messages can only contain 1 recipient UID.
	if (messageType == 'ins' || messageType == 'nes' || messageType == 'nts') {
		// recipients param (ins, nes, nts messages)
		if (paramValue.match(/^[0-9]+(,[0-9]+)*$/) == null) {
			return 'Invalid recipient user ids.';
		}
	} elseif (messageType == 'inr' || messageType == 'psr' || messageType == 'nei' || messageType == 'ntr') {
		// recipient param (inr, psr, nei, ntr messages)
		if (paramValue != parseInt(paramValue)) {
			return 'Invalid recipient user id.';
		}
	}

	return true;
}

KtValidator._validateS(messageType, paramValue)
{
	// userId param
	if (paramValue != parseInt(paramValue)) {
		return 'Invalid user id.';
	} else {
		return true;
	}
}

KtValidator._validateSt1(messageType, paramValue)
{
	// subtype1 param
	if (paramValue.match(/^[A-Za-z0-9-_]{1,32}$/) == null) {
		return 'Invalid subtype value.';
	} else {
		return true;
	}
}

KtValidator._validateSt2(messageType, paramValue)
{
	return KtValidator._validateSt1(messageType, paramValue, errorMessage);
}

KtValidator._validateSt3(messageType, paramValue)
{
	return KtValidator._validateSt1(messageType, paramValue, errorMessage);
}

KtValidator._validateSu(messageType, paramValue)
{
	// short tracking tag param
	if (paramValue.match(/^[A-Fa-f0-9]{8}$/) == null) {
		return 'Invalid short unique tracking tag.';
	} else {
		return true;
	}
}

KtValidator._validateTs(messageType, paramValue)
{
	// timestamp param (pgr message)
	if (paramValue != parseInt(paramValue)) {
		return 'Invalid timestamp.';
	} else {
		return true;
	}
}

KtValidator._validateTu(messageType, paramValue)
{
	// type parameter (mtu, pst/psr, ucc messages)
	// acceptable values for this parameter depends on the message type
	if (messageType == 'mtu') {
		if (paramValue.match(/^direct|indirect|advertisement|credits|other$/) == null) {
			rrorMessage = 'Invalid monetization type.';
		}
	} elseif (messageType == 'pst' || messageType == 'psr') {
		if (paramValue.match(/^feedpub|stream|feedstory|multifeedstory|dashboard_activity|dashboard_globalnews$/) == null) {
			return 'Invalid stream post/response type.';
		}
	} elseif (messageType == 'ucc') {
		if (paramValue.match(/^ad|partner$/) == null) {
			return 'Invalid third party communication click type.';
		}
	}
	
	return true;
}

KtValidator._validateU(messageType, paramValue)
{
	// unique tracking tag parameter for all messages EXCEPT pgr.
	// for pgr messages, this is the "page address" param
	if (messageType != 'pgr') {
		if (paramValue.match(/^[A-Fa-f0-9]{32}$/) == null) {
			return 'Invalid unique tracking tag.';
		}
	}
	
	return true;
}

KtValidator._validateV(messageType, paramValue)
{
	// value param (mtu, evt messages)
	if (paramValue != parseInt(paramValue)) {
		return 'Invalid value.';
	} else {
		return true;
	}
}
