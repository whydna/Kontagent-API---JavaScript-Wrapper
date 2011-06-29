<html>
	<head>
		<title>Kontagent Instrumentation Example: The Basics</title>

		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent.js"></script>
		<script>
			// initialize Kontagent
			var kt = new Kontagent('<YOUR_KT_API_KEY>', '<YOUR_KT_SECRET_KEY>');
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
					kt.trackPageRequest({'userId' : loginResponse.uid});

					if (/* check if this is a new user */) {
						// track the install
						kt.trackApplicationAdded({'userId' : loginResponse.uid});
		
						// get the users information and track the user information
						FB.api('/me', function (meResponse) {
							kt.trackUserInformation({
								'userId' : meResponse.uid, 
								'gender' : meResponse.gender
							});
						});
					}						
				}
			});
		</script>
	</body>
</html>
