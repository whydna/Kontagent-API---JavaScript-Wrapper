For our official documentation go here: http://www.kontagent.com/docs/api-libraries/js-wrapper-advanced/

Overview
-----------------

This is a JavaScript wrapper around Kontagent's API. It provides methods to make the API calls for all the different message types supported by Kontagent.

Getting Started
-----------------

To get started with the Kontagent library, you will need to check-out the kontagent_api.js file and include it in your project. You will also need to instantiate and configure an instance of the Kontagent object.

    // include the library
	<script src="./kontagent_api.js"></script>
	
	<script>
	
		// configure and instantiate Kontagent object
		var ktApi = new KontagentApi(ktApiKey);
	
	</script>

Using The Library
-----------------

Once you've got your Kontagent object instantiated and configured you can start using the library. Essentially, there are two types of methods provided in the library: tracking methods and helper methods.

**Tracking Methods**

The tracking methods should get called by your application whenever you need to report an event to Kontagent. There is a tracking method available for every message type in the Kontagent API. A few examples are:

    <script>

		ktApi.trackPageRequest('1234567890', {pageAddress : '/game.html'}, function() {
			// request has been successfully sent
			console.log('pageview tracked');
		}); 

	   
		ktApi.trackEvent(
			'1234567890', 
			'mission_1', 
			{
				subtype1 : 'user_action', 
				subtype2 : 'game_played'
			},
			function() {
				console.log('event tracked');
			}
		);

    </script>

Everytime events happen within your application, you should make the appropriate call to Kontagent - we will then crunch and analyze this data in our systems and present them to you in your dashboard.

For a full list of the available tracking methods see the "Full Class Reference" section below.

**Helper Methods**

The library provides a few helper methods for common tasks. Currently the only ones available are:

    <script>

		var uTag = ktApi.genUniqueTrackingTag();

		var shortUTag = ktApi.genShortUniqueTrackingTag();

    </script>

Which will help you generate the tracking tag parameters required to link certain messages together (for example: invite sent -> invite response -> application added).

Examples
-----------------

1. The Basics (page request, user demographic, installs)
2. Invites (same as stream posts)
3. Third-Party Communication Click (ad/partner click tracking)
4. Custom Events


Full Class Reference
-----------------

    /*
    * Kontagent class constructor
    *
    * @constructor
    *
    * @param {string} apiKey The app's Kontagent API key
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {bool} [optionalParams.useTestServer] Whether to send messages to the Kontagent Test Server
    * @param {bool} [optionalParams.validateParams] Whether to validate the parameters passed into the tracking method
    */
    function KontagentApi(apiKey, optionalParams) 


    /*
    * Generates a unique tracking tag.
    *
    *  @return {string} The unique tracking tag
    */
    KontagentApi.prototype.genUniqueTrackingTag = function()


    /*
    * Generates a short unique tracking tag.
    *
    *  @return {string} The short unique tracking tag
    */
    KontagentApi.prototype.genShortUniqueTrackingTag = function() 


    /*
    * Sends an Invite Sent message to Kontagent.
    *
    * @param {string} userId The UID of the sending user
    * @param {string} recipientUserIds A comma-separated list of the recipient UIDs
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *     InviteSent->InviteResponse->ApplicationAdded messages. 
    *     See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackInviteSent = function(userId, recipientUserIds, uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback)


    /*
    * Sends an Invite Response message to Kontagent.
    *
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    InviteSent->InviteResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.recipientUserId] The UID of the responding user
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackInviteResponse = function(uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback)


    /*
    * Sends an Notification Sent message to Kontagent.
    *
    * @param {string} userId The UID of the sending user
    * @param {string} recipientUserIds A comma-separated list of the recipient UIDs
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationSent->NotificationResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackNotificationSent = function(userId, recipientUserIds, uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback)


    /*
    * Sends an Notification Response message to Kontagent.
    *
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationSent->NotificationResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.recipientUserId] The UID of the responding user
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackNotificationResponse = function(uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Notification Email Sent message to Kontagent.
    *
    * @param {string} userId The UID of the sending user
    * @param {string} recipientUserIds A comma-separated list of the recipient UIDs
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackNotificationEmailSent = function(userId, recipientUserIds, uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Notification Email Response message to Kontagent.
    *

    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.recipientUserId] The UID of the responding user
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackNotificationEmailResponse = function(uniqueTrackingTag, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Stream Post message to Kontagent.
    *
    * @param {string} userId The UID of the sending user
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {string} type The Facebook channel type
    *    (feedpub, stream, feedstory, multifeedstory, dashboard_activity, or dashboard_globalnews).
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackStreamPost = function(userId, uniqueTrackingTag, type, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Stream Post Response message to Kontagent.
    *
    * @param {string} uniqueTrackingTag 32-digit hex string used to match 
    *    NotificationEmailSent->NotificationEmailResponse->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {string} type The Facebook channel type
    *    (feedpub, stream, feedstory, multifeedstory, dashboard_activity, or dashboard_globalnews).
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.recipientUserId] The UID of the responding user
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackStreamPostResponse = function(uniqueTrackingTag, type, optionalParams, successCallback, validationErrorCallback)


    /*
    * Sends an Custom Event message to Kontagent.
    *
    * @param {string} userId The UID of the user
    * @param {string} eventName The name of the event
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {int} [optionalParams.value] A value associated with the event
    * @param {int} [optionalParams.level] A level associated with the event (must be positive)
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackEvent = function(optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Application Added message to Kontagent.
    *
    * @param {string} userId The UID of the installing user
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.uniqueTrackingTag] 16-digit hex string used to match 
    *    Invite/StreamPost/NotificationSent/NotificationEmailSent->ApplicationAdded messages. 
    *    See the genUniqueTrackingTag() helper method.
    * @param {string} [optionalParams.shortUniqueTrackingTag] 8-digit hex string used to match 
    *    ThirdPartyCommClicks->ApplicationAdded messages. 
    *    See the genShortUniqueTrackingTag() helper method.
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackApplicationAdded = function(userId, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Application Removed message to Kontagent.
    *
    * @param {string} userId The UID of the removing user
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackApplicationRemoved = function(userId, successCallback, validationErrorCallback) 


    /*
    * Sends an Third Party Communication Click message to Kontagent.
    *
    * @param {string} type The third party comm click type (ad, partner).
    * @param {string} shortUniqueTrackingTag 8-digit hex string used to match 
    *    ThirdPartyCommClicks->ApplicationAdded messages. 
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.userId] The UID of the user
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackThirdPartyCommClick = function(type, shortUniqueTrackingTag, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Page Request message to Kontagent.
    *
    * @param {string} userId The UID of the user
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.ipAddress] The current users IP address
    * @param {string} [optionalParams.pageAddress] The current page address (ex: index.html)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackPageRequest = function(userId, optionalParams, successCallback, validationErrorCallback)


    /*
    * Sends an User Information message to Kontagent.
    *
    * @param {string} userId The UID of the user
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {int} [optionalParams.birthYear] The birth year of the user
    * @param {string} [optionalParams.gender] The gender of the user (m,f,u)
    * @param {string} [optionalParams.country] The 2-character country code of the user
    * @param {int} [optionalParams.friendCount] The friend count of the user
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackUserInformation = function (userId, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Goal Count message to Kontagent.
    *
    * @param {string} userId The UID of the user
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {int} [optionalParams.goalCount1] The amount to increment goal count 1 by
    * @param {int} [optionalParams.goalCount2] The amount to increment goal count 2 by
    * @param {int} [optionalParams.goalCount3] The amount to increment goal count 3 by
    * @param {int} [optionalParams.goalCount4] The amount to increment goal count 4 by
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackGoalCount = function(userId, optionalParams, successCallback, validationErrorCallback) 


    /*
    * Sends an Revenue message to Kontagent.
    *
    * @param {string} userId The UID of the user
    * @param {int} value The amount of revenue in cents
    * @param {object} [optionalParams] An object containing paramName => value
    * @param {string} [optionalParams.type] The transaction type (direct, indirect, advertisement, credits, other)
    * @param {string} [optionalParams.subtype1] Subtype1 value (max 32 chars)
    * @param {string} [optionalParams.subtype2] Subtype2 value (max 32 chars)
    * @param {string} [optionalParams.subtype3] Subtype3 value (max 32 chars)
    * @param {function} [successCallback] The callback function to execute once message has been sent successfully
    * @param {function(error)} [validationErrorCallback] The callback function to execute on validation failure
    */
    KontagentApi.prototype.trackRevenue = function(userId, value, optionalParams, successCallback, validationErrorCallback) 
