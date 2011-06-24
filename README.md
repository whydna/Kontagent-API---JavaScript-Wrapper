Overview
-----------------

This is a JavaScript wrapper around Kontagent's API. It provides methods to make the API calls for all the different message types supported by Kontagent.

Getting Started
-----------------

To get started with the Kontagent library, you will need to check-out the kontagent.php file and include it in your project. You will also need to instantiate and configure
an instance of the Kontagent object.

    // include the library
	<script src="./kontagent.js"></script>
	
	<script>
	
		// configure and instantiate Kontagent object
		var kt = new Kontagent(ktApiKey, ktSecretKey, useTestServer);
	
	</script>

Using The Library
-----------------

Once you've got your Kontagent object instantiated and configured you can start using the library. Essentially, there are two types of methods provided in the library: tracking methods and helper methods.

**Tracking Methods**

The tracking methods should get called by your application whenever you need to report an event to Kontagent. There is a tracking method available for every message type in the Kontagent API. A few examples are:

    <script>

		kt.trackPageRequest({userId : '1234567890', pageAddress : '/game.html'}, function() {
			// request has been successfully sent
			console.log('pageview tracked');
		}); 

	   
		kt.trackEvent(
			{
				userId : '1234567890', 
				eventName : 'mission_1', 
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

		var uTag = kt.genUniqueTrackingTag();

		var shortUTag = kt.genShortUniqueTrackingTag();

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
    * Generates a unique tracking tag.
    *
    *  @return {string} The unique tracking tag
    */
    Kontagent.prototype.genUniqueTrackingTag = function()
    
    
    /*
    * Generates a short unique tracking tag.
    *
    *  @return {string} The short unique tracking tag
    */
    Kontagent.prototype.genShortUniqueTrackingTag = function()
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackInviteSent = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackInviteResponse = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackNotificationSent = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackNotificationResponse = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackNotificationEmailSent = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackNotificationEmailResponse = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackStreamPost = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackStreamPostResponse = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackEvent = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackApplicationAdded = function(params, callback)
    
    
    /*
    * Sends an Application Removed message to Kontagent.
    *
    * @param {object} params An object containing the params for this call.
    * @param {string} params.userId The UID of the removing user
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackApplicationRemoved = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackThirdPartyCommClick = function(params, callback)
    
    
    /*
    * Sends an Page Request message to Kontagent.
    *
    * @param {object} params An object containing the params for this call.
    * @param {string} params.userId The UID of the user
    * @param {string} [params.ipAddress] The current users IP address
    * @param {string} [params.pageAddress] The current page address (ex: index.html)
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackPageRequest = function(params, callback)
    
    
    /*
    * Sends an User Information message to Kontagent.
    *
    * @param {object} params An object containing the params for this call.
    * @param {string} params.userId The UID of the user
    * @param {int} [params.birthYear] The birth year of the user
    * @param {string} [params.gender] The gender of the user (m,f,u)
    * @param {string} [params.country] The 2-character country code of the user
    * @param {int} [params.friendCount] The friend count of the user
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackUserInformation = function (params, callback)
    
    
    /*
    * Sends an Goal Count message to Kontagent.
    *
    * @param {object} params An object containing the params for this call.
    * @param {string} params.userId The UID of the user
    * @param {int} [params.goalCount1] The amount to increment goal count 1 by
    * @param {int} [params.goalCount2] The amount to increment goal count 2 by
    * @param {int} [params.goalCount3] The amount to increment goal count 3 by
    * @param {int} [params.goalCount4] The amount to increment goal count 4 by
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackGoalCount = function(params, callback)
    
    
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
    * @param {function} [callback] The callback function after request is complete.
    *
    * @throws {KtParameterException} An invalid parameter value was provided
    */
    Kontagent.prototype.trackRevenue = function(params, callback)
