<!--
The landing URL you give to your ad-provider should have some GET params appended to it.
This will allow you to identify the type of ad that was clicked on your landing page.
For example, the type (ad/partner) and subtype information.
Your link will end up looking something like: 
http://example.com/third_party_click.php?kt_type=ad&kt_st1=subtype1&kt_st2=subtype2&kt_st3=subtype3

Read a page's GET URL variables and return them as an associative array.
-->

<html>
	<head>
		<title>Kontagent Instrumentation Example: Third Party Click</title>

		<script src="http://connect.facebook.net/en_US/all.js"></script>
		<script src="./kontagent_api.js"></script>
		<script>
			// initialize Kontagent
			var ktApi = new KontagentApi('<YOUR_KT_API_KEY>');

			// extract URL variables
			var ktType = '<?php echo $_GET["kt_type"]; ?>';
			var ktSt1 = '<?php echo $_GET["kt_st1"]; ?>';
			var ktSt2 = '<?php echo $_GET["kt_st2"]; ?>';
			var ktSt3 = '<?php echo $_GET["kt_st3"]; ?>';
			var shortUniqueTrackingTag = ktApi.genShortUniqueTrackingTag();
		</script>
	</head>
	<body>
		<h1>Hello Kontagent!</h1>

		<div id="fb-root"></div>
		<script>
			// initialize the Facebook library
			FB.init({appId  : '<YOUR_FB_APP_ID>', status : true, cookie : true};

			FB.api('/me', function(response) {
				// track the ad/partner click
				ktApi.trackThirdPartyCommClick(ktType, shortUniqueTrackingTag, {
					'userId' : response.uid,
					'subtype1': ktSt1,
					'subtype2': ktSt2,
					'subtype3': ktSt3
				});

				// At this point we will want to prompt the user to install (see the Basics example).
				// If the user installs the app, we want to include the ShortUniqueTrackingTag
				// in the ApplicationAdded call (hint: you can embed ShortUniqueTrackingTag as a 
				// GET parameter in the callback URL). 
				// This will allow us to link the install back to this click.
			});
		</script>
	</body>
</html>

