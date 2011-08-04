function KtParameterException(message)
{
	this.name = "KtParameterException";
	this.message = (message) ? message : "";
}

KtParameterException.prototype = new Error();

/*
* Kontagent class constructor
*
* @constructor
*
* @param {string} apiKey The app's Kontagent API key
* @param {string} apiSecret The app's Kontagent secret key
* @param {bool} [useTestServer] Whether to send messages to the Kontagent Test Server
* @param {bool} [validateParams] Whether to validate the parameters passed into the tracking methods
*/
function Kontagent(apiKey, secretKey, useTestServer, validateParams)
{
	this._baseApiUrl = "http://api.geo.kontagent.net/api/v1/";
	this._baseTestServerUrl = "http://test-server.kontagent.net/api/v1/";

	this._apiKey = apiKey;
	this._secretKey = secretKey;
	this._useTestServer = (useTestServer) ? useTestServer : false;
	this._validateParams = (validateParams) ? validateParams : true;
}

/*
* Sends the API message by creating an <img> tag.
*
* @param {string} messageType The message type to send ('apa', 'ins', etc.)
* @param {object} params An associative array containing paramName => value (ex: 's'=>123456789)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*
* @throws {KtParameterException} An invalid parameter value was provided
*/
Kontagent.prototype._sendMessageViaImgTag = function(messageType, params, successCallback, errorCallback)
{
	if (this._validateParams == true) {
		var result;

		for (var paramKey in params) {
			result = KtValidator.validateParameter(messageType, paramKey, params[paramKey]);

			if (result != true) {
				errorCallback(result);
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

/*
* Generate URL-encoded query string (same as PHP's http_build_query())
*
* @param {object} data The object containing key, value data to encode
*
* @return {string) A URL-encoded string
*/
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

/*
* Returns random 4-character hex
*
* @return {string} Random 4-character hex value
*/
Kontagent.prototype._s4 = function() 
{
	return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}

/*
* Generates a unique tracking tag.
*
*  @return {string} The unique tracking tag
*/
Kontagent.prototype.genUniqueTrackingTag = function()
{
	var uniqueTrackingTag = "";
	
	for(i=0; i<4; i++) {
		uniqueTrackingTag += this._s4();
	}
	
	return uniqueTrackingTag;
}

/*
* Generates a short unique tracking tag.
*
*  @return {string} The short unique tracking tag
*/
Kontagent.prototype.genShortUniqueTrackingTag = function()
{
	var shortUniqueTrackingTag = "";
	
	for(i=0; i<2; i++) {
		shortUniqueTrackingTag += this._s4();
	}
	
	return shortUniqueTrackingTag;

}

/*
* Sends an Invite Sent message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the sending user
* @param {string} params.recipientUserIds A comma-separated list of the recipient UIDs
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
* 	InviteSent->InviteResponse->ApplicationAdded messages. 
* 	See the genUniqueTrackingTag() helper method.
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackInviteSent = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	

	this._sendMessageViaImgTag("ins", apiParams, successCallback, errorCallback);
}

/*
* Sends an Invite Response message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	InviteSent->InviteResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.recipientUserId] The UID of the responding user
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackInviteResponse = function(params, successCallback, errorCallback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("inr", apiParams, successCallback, errorCallback);
}

/*
* Sends an Notification Sent message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the sending user
* @param {string} params.recipientUserIds A comma-separated list of the recipient UIDs
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationSent->NotificationResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackNotificationSent = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("nts", apiParams, successCalback, errorCallback);
}

/*
* Sends an Notification Response message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationSent->NotificationResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.recipientUserId] The UID of the responding user
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackNotificationResponse = function(params, successCallback, errorCallback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	
	
	this._sendMessageViaImgTag("ntr", apiParams, successCallback, errorCallback);
}

/*
* Sends an Notification Email Sent message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the sending user
* @param {string} params.recipientUserIds A comma-separated list of the recipient UIDs
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackNotificationEmailSent = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		r : params.recipientUserIds,
		u : params.uniqueTrackingTag
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }	

	this._sendMessageViaImgTag("nes", apiParams, successCallback, errorCallback);
}

/*
* Sends an Notification Email Response message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.recipientUserId] The UID of the responding user
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/

Kontagent.prototype.trackNotificationEmailResponse = function(params, successCallback, errorCallback)
{
	var apiParams = {
		i : (params.appIsInstalled) ? 1 : 0,
		u : params.uniqueTrackingTag
	};
	
	if (params.recipientUserId) { apiParams.r = params.recipientUserId; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }
	
	this._sendMessageViaImgTag("nei", apiParams, successCallback, errorCallback);
}

/*
* Sends an Stream Post message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the sending user
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} params.type The Facebook channel type
*	(feedpub, stream, feedstory, multifeedstory, dashboard_activity, or dashboard_globalnews).
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/

Kontagent.prototype.trackStreamPost = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		u : params.uniqueTrackingTag,
		tu : params.type
	};
	
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }

	this._sendMessageViaImgTag("pst", apiParams, successCallback, errorCallback);
}

/*
* Sends an Stream Post Response message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.uniqueTrackingTag 32-digit hex string used to match 
*	NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} params.type The Facebook channel type
*	(feedpub, stream, feedstory, multifeedstory, dashboard_activity, or dashboard_globalnews).
* @param {string} [params.recipientUserId] The UID of the responding user
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackStreamPostResponse = function(params, successCallback, errorCallback)
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

	this._sendMessageViaImgTag("psr", apiParams, successCallback, errorCallback);
}

/*
* Sends an Custom Event message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the user
* @param {string} params.eventName The name of the event
* @param {int} [params.value] A value associated with the event
* @param {int} [params.level] A level associated with the event (must be positive)
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackEvent = function(params, successCallback, errorCallback)
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

	this._sendMessageViaImgTag("evt", apiParams, successCallback, errorCallback);
}

/*
* Sends an Application Added message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the installing user
* @param {string} [params.uniqueTrackingTag] 16-digit hex string used to match 
*	Invite/StreamPost/NotificationSent/NotificationEmailSent->ApplicationAdded messages. 
*	See the genUniqueTrackingTag() helper method.
* @param {string} [params.shortUniqueTrackingTag] 8-digit hex string used to match 
*	ThirdPartyCommClicks->ApplicationAdded messages. 
*	See the genShortUniqueTrackingTag() helper method.
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackApplicationAdded = function(params, successCallback, errorCallback)
{
	var apiParams = {s : params.userId};
	
	if (params.uniqueTrackingTag) { apiParams.u = params.uniqueTrackingTag; }
	if (params.shortUniqueTrackingTag) { apiParams.su = params.shortUniqueTrackingTag; }

	this._sendMessageViaImgTag("apa", apiParams, successCallback, errorCallback);
}

/*
* Sends an Application Removed message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the removing user
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackApplicationRemoved = function(params, successCallback, errorCallback)
{
	var apiParams = {s : params.userId};
	
	this._sendMessageViaImgTag("apr", apiParams, successCallback, errorCallback);
}

/*
* Sends an Third Party Communication Click message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.type The third party comm click type (ad, partner).
* @param {string} params.shortUniqueTrackingTag 8-digit hex string used to match 
*	ThirdPartyCommClicks->ApplicationAdded messages. 
* @param {string} [params.userId] The UID of the user
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/

Kontagent.prototype.trackThirdPartyCommClick = function(params, successCallback, errorCallback)
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
	
	this._sendMessageViaImgTag("ucc", apiParams, successCallback, errorCallback);
}

/*
* Sends an Page Request message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the user
* @param {string} [params.ipAddress] The current users IP address
* @param {string} [params.pageAddress] The current page address (ex: index.html)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackPageRequest = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		ts : Math.round(new Date().getTime() / 1000)
	};
	
	if (params.ipAddress) { apiParams.ip = params.ipAddress; }
	if (params.pageAddress) { apiParams.u = params.pageAddress; }

	this._sendMessageViaImgTag("pgr", apiParams, successCallback, errorCallback);
}

/*
* Sends an User Information message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the user
* @param {int} [params.birthYear] The birth year of the user
* @param {string} [params.gender] The gender of the user (m,f,u)
* @param {string} [params.country] The 2-character country code of the user
* @param {int} [params.friendCount] The friend count of the user
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackUserInformation = function (params, successCallback, errorCallback)
{
	var apiParams = {s : params.userId};
	
	if (params.birthYear) { apiParams.b = params.birthYear; }
	if (params.gender) { apiParams.g = params.gender; }
	if (params.country) { apiParams.lc = params.country; }
	if (params.friendCount) { apiParams.f = params.friendCount; }
	
	this._sendMessageViaImgTag("cpu", apiParams, successCallback, errorCallback);
}

/*
* Sends an Goal Count message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the user
* @param {int} [params.goalCount1] The amount to increment goal count 1 by
* @param {int} [params.goalCount2] The amount to increment goal count 2 by
* @param {int} [params.goalCount3] The amount to increment goal count 3 by
* @param {int} [params.goalCount4] The amount to increment goal count 4 by
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackGoalCount = function(params, successCallback, errorCallback)
{
	var apiParams = {s : params.userId};
	
	if (params.goalCount1) { apiParams.gc1 = params.goalCount1; }
	if (params.goalCount2) { apiParams.gc2 = params.goalCount2; }
	if (params.goalCount3) { apiParams.gc3 = params.goalCount3; }
	if (params.goalCount4) { apiParams.gc4 = params.goalCount4; }

	this._sendMessageViaImgTag("gci", apiParams, successCallback, errorCallback);
}

/*
* Sends an Revenue message to Kontagent.
*
* @param {object} params An object containing the params for this call.
* @param {string} params.userId The UID of the user
* @param {int} params.value The amount of revenue in cents
* @param {string} [params.type] The transaction type (direct, indirect, advertisement, credits, other)
* @param {string} [params.subtype1] Subtype1 value (max 32 chars)
* @param {string} [params.subtype2] Subtype2 value (max 32 chars)
* @param {string} [params.subtype3] Subtype3 value (max 32 chars)
* @param {function} [successCallback] The callback function to execute once message has been sent successfully
* @param {function(error)} [errorCallback] The callback function to execute if there was an error sending the message
*/
Kontagent.prototype.trackRevenue = function(params, successCallback, errorCallback)
{
	var apiParams = {
		s : params.userId,
		v : params.value
	};
	
	if (params.type) { apiParams.tu = params.type; }
	if (params.subtype1) { apiParams.st1 = params.subtype1; }
	if (params.subtype2) { apiParams.st2 = params.subtype2; }
	if (params.subtype3) { apiParams.st3 = params.subtype3; }

	this._sendMessageViaImgTag("mtu", apiParams, successCallback, errorCallback);
}


/*
* Helper class to validate the paramters for the Kontagent API messages. All 
* 	methods are static so no need to instantiate this class.
*
* @constructor
*/
function KtValidator()
{
}

/*
* Validates a parameter of a given message type.
*
* @param {string} messageType The message type that the param belongs to (ex: ins, apa, etc.)
* @param {string} paramName The name of the parameter (ex: s, su, u, etc.)
* @param {mixed} paramValue The value of the parameter
*
* @returns {mixed} Returns true on success and an error message string on failure.
*/
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
