<html>
	<head>
		<title>Kontagent Instrumentation Example: Events</title>

		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent_api.js"></script>
		<script>
			// initialize Kontagent
			var ktApi = new KontagentApi('<YOUR_KT_API_KEY>');

			var fbUser = null;
		</script>
	</head>
	<body>
		<input type="button" value="Action 1" onclick="ktApi.trackEvent(fbUser.uid, 'action_1')"/><br/>
		<input type="button" value="Action 2" onclick="ktApi.trackEvent(fbUser.uid, 'action_2')"/><br/>
		<input type="button" value="Action 3" onclick="ktApi.trackEvent(fbUser.uid, 'action_3')"/>

		<div id="fb-root"></div>

		<script>
			// initialize the Facebook library
			FB.init({appId  : '<YOUR_FB_APP_ID>', status : true, cookie : true});

			// get the the FB user
			FB.api('/me', function(response) {
				fbUser = response;
			});
		</script>
	</body>
</html>
