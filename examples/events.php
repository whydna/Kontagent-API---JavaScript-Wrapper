<html>
	<head>
		<title>Kontagent Instrumentation Example: Events</title>

		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent.js"></script>
		<script>
			// initialize Kontagent
			var kt = new Kontagent('<YOUR_KT_API_KEY>', '<YOUR_KT_SECRET_KEY>');

			var fbUser = null;
		</script>
	</head>
	<body>
		<input type="button" value="Action 1" onclick="kt.trackEvent({'userId' : fbUser.uid, 'eventName' : 'action_1'})"/><br/>
		<input type="button" value="Action 2" onclick="kt.trackEvent({'userId' : fbUser.uid, 'eventName' : 'action_2'})"/><br/>
		<input type="button" value="Action 3" onclick="kt.trackEvent({'userId' : fbUser.uid, 'eventName' : 'action_3'})"/>

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
