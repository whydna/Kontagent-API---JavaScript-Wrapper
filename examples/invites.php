<html>
	<head>
		<title>Kontagent Instrumentation Example: Invites</title>

		<script src="http://code.jquery.com/jquery-1.6.1.min.js"></script>
		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent_api.js"></script>
		<script>
			// initialize Kontagent
			var ktApi = new KontagentApi('<YOUR_KT_API_KEY>');

			var fbUser = null;

			// Check if the current user is coming from an invite response.
			// Facebook appends the $_GET['request_ids'] parameter when users enter via a request.
			var requestIds = '<?php echo $_GET["request_ids"]; ?>';

			if (requestIds) {
				for(var requestId in requestIds) {
					// retrieve the request data
					$.get('https://graph.facebook.com/'+requestId, function(response) {
						var dataParts = response.data.split('|');
						
						// send invite request message to Kontagent
						ktApi.trackInviteResponse(dataParts[0], {
							recipientUserId : requestId,
							subtype1 : dataParts[1],
							subtype2 : dataParts[2],
							subtype3 : dataParts[3],
						});
					});
				}

				// At this point we will want to prompt the user to install (see the Basics example).
				// If the user installs the app, we want to include the UniqueTrackingTag
				// in the ApplicationAdded call (hint: you can embed UniqueTrackingTag as a 
				// GET parameter in the callback URL). 
				// This will allow us to link the install back to this invite.
			}


			function sendInvite()
			{
				var uniqueTrackingTag = ktApi.genUniqueTrackingTag();
				var subtype1 = 'subtype1';
				var subtype2 = 'subtype2';
				var subtype3 = 'subtype3';

				// Generate the Facebook invite. Note the 'data' field where we embed some information we will need
				// to access later. Also note that we can use the request_id instead of making an extra call for the 
				// recipient UID.
				FB.ui(
					{
						method: 'apprequests', 
						message: 'You should learn more about this awesome game.', 
						data: uniqueTrackingTag + '|' + subtype1 + '|' + subtype2 + '|' + subtype3;
					},
					function(response) {
						// send invite sent messag eto Kontagent
						ktApi.trackInviteSent(fbUser.uid, response.request_ids.join(','), uniqueTrackingTag, {
							subtype1 : subtype1,
							subtype2 : subtype2,
							subtype3 : subtype3
						});							
					}
				);
			}
		</script>
	</head>
	<body>
		<h1>Hello Kontagent!</h1>

		<input type="button" value="Send Invite" onclick="sendInvite()"/>

		<div id="fb-root"></div>
		<script>
			// initialize the Facebook library
			FB.init({appId  : '<YOUR_FB_APP_ID>', status : true, cookie : true};

			// get the the FB user
			FB.api('/me', function(response) {
				fbUser = response;
			});
		</script>
	</body>
</html>
