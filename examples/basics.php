<html>
	<head>
		<title>Kontagent Instrumentation Example: The Basics</title>

		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent_api.js"></script>
		<script>
			// initialize Kontagent
			var ktApi = new KontagentApi('<YOUR_KT_API_KEY>');
		</script>
	</head>
	<body>
		<h1>Hello Kontagent!</h1>

		<div id="fb-root"></div>
		<script>
			// initialize the Facebook library
			FB.init({appId  : '<YOUR_FB_APP_ID>', status : true, cookie : true};

			// try to login the current user
			FB.login(function(loginResponse) {
				if (loginResponse.session) {
					// track the page request
					ktApi.trackPageRequest({'userId' : loginResponse.uid});

					if (/* check if this is a new user */) {
						// track the install
						ktApi.trackApplicationAdded(loginResponse.uid);
		
						// get the users information and track the user information
						FB.api('/me', function (meResponse) {
							ktApi.trackUserInformation(meResponse.uid, {
								'gender' : meResponse.gender
							});
						});
					}						
				}
			});
		</script>
	</body>
</html>
