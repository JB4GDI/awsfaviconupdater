// Define all the AWS services here
const SERVICES = {

	// Note: A bunch of these have a content-policy-block on the page, so there's no getting around it :(

	"acm":								{href: "acm.png"},					
	"apigateway":					{href: "apigateway.png"},					
	"athena":							{href: "athena.png"},					
	//"cloudformation":		{href: "cloudformation.png"},			// Content Policy Blocked
	"cloudfront":					{href: "cloudfront.png"},
	"cloudsearch":				{href: "cloudsearch.png"},				// Needs favicon
	"cloudtrail":					{href: "cloudtrail.png"},				
	"cloudwatch":					{href: "cloudwatch.png"},
	// "codebuild":				{href: "codebuild.png"},					// Content Policy Blocked
	// "codecommit":			{href: "codecommit.png"},					// Content Policy Blocked
	// "codedeploy":			{href: "codedeploy.png"},					// Content Policy Blocked
	// "codepipeline":		{href: "codepipeline.png"},				// Content Policy Blocked
	"config":							{href: "config.png"},
	//"cognito":					{href: "cognito.png"},																					// Amazon did this one!
	"datapipeline":				{href: "datapipeline.png"},
	//"directconnect":		{href: "directconnect.png"},			// Content Policy Blocked
	//"directoryservice":	{href: "directoryservice.png"},																	// Amazon did this one!
	//"devicefarm":				{href: "devicefarm.png"},					// Content Policy Blocked
	"dms":								{href: "dms.png"},	
	"dynamodb":						{href: "dynamodb.png"},	
	"ec2":								{href: "ec2.png"},
	"es":									{href: "es.png"},
	//"efs":							{href: "efs.png"},								// Content Policy Blocked
	//"ecs":							{href: "ecs.png"},								// Content Policy Blocked
	"elasticache":				{href: "elasticache.png"},
	"elastictranscoder":	{href: "elastictranscoder.png"},
	//"elasticbeanstalk":	{href: "elasticbeanstalk.png"},		// Content Policy Blocked
	"emr":								{href: "emr.png"},
	//"glacier":					{href: "glacier.png"},						// Content Policy Blocked
	//"gamelift":					{href: "gamelift.png"},						// Content Policy Blocked
	//"iam":							{href: "iam.png"},																							// Amazon did this one!
	//"iot":							{href: "iot.png"},								// Content Policy Blocked
	//"importexport":			{href: "importexport.png"},				// Content Policy Blocked
	//"inspector":				{href: "inspector.png"},					// Content Policy Blocked
	"kinesis":						{href: "kinesis.png"},
	//"lambda":						{href: "lambda.png"},																						// Amazon did this one!
	"lex":								{href: "lex.png"},
	"ls":									{href: "ls.png"},
	"machinelearning":		{href: "machinelearning.png"},																					
	"mobilehub":					{href: "mobilehub.png"},																					
	"opsworks":						{href: "opsworks.png"},
	"polly":							{href: "polly.png"},
	"rds":								{href: "rds.png"},
	"redshift":						{href: "redshift.png"},
	"route53":						{href: "route53.png"},
	"s3":									{href: "s3.png"},
	"servermigration":		{href: "servermigration.png"},
	//"servicecatalog":		{href: "servicecatalog.png"},			// Content Policy Blocked
	"ses":								{href: "ses.png"},
	//"sns":							{href: "sns.png"},								// Content Policy Blocked
	"sqs":								{href: "sqs.png"},
	"storagegateway":			{href: "storagegateway.png"},
	"trustedadvisor":			{href: "trustedadvisor.png"},
	"swf": 								{href: "swf.png"},								// Needs favicon
	"waf": 								{href: "waf.png"},								
	"workspaces": 				{href: "workspaces.png"},					// This one is bugged for some unknown reason (see if statement below)
	"workmail": 					{href: "workmail.png"},					
	"vpc": 								{href: "vpc.png"},
	//"zocalo": 					{href: "zocalo.png"},							// Content Policy Blocked
	
}

// Look for the string blocks right after the 'amazon.com/' (ec2/s3/iam/ses/etc...)
let reg = /:\/\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/([a-z0-9.-]*)\/*/g;

// Break the URL into parts and capture the string after the 'amazon.com/' as awsServiceName
let captureGroupArray = Array.from( document.URL.matchAll(reg) );
let awsServiceName = captureGroupArray[0][2];

// For Codesuite URLs (Codebuild/CodeDeploy/CodePipeline/etc...), we need to break the URL apart further to work
if (awsServiceName == 'codesuite') {
	awsServiceName = captureGroupArray[0][3];
}


// We have found a match in the URL!
if (SERVICES.hasOwnProperty(awsServiceName)) {

	//console.log('match on ' + awsServiceName);

	let awsService = SERVICES[awsServiceName];

	//console.log(awsService);

	// Ok handle the favicon for a few different situations
	
	if (awsServiceName == 'workspaces') {

		// You may be wondering why this code block is exactly the same as the else statement.  That's because for some
		// unknown reason, `if ('workspaces' == 'cloudsearch' || 'swf')` resolves to true and it is driving me crazy so
		// I'm just forcing the thing to work here.  Uuuuuugh
		// Try it though!  Just  delete this block and start the if statement at `if (awsService == 'cloudsearch' || 'swf')`
		// and see what happens!

		let linkElements = document.getElementsByTagName('link');		
		for (let i = 0; i < linkElements.length; i++) {
			if (linkElements[i].getAttribute('rel') == 'icon') {
					linkElements[i].setAttribute('type', 'image/png');
					linkElements[i].setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);
					console.log(linkElements[i].getAttribute('href'));			}

			if (linkElements[i].getAttribute('rel') == 'shortcut icon') {
					linkElements[i].setAttribute('type', 'image/png');
					linkElements[i].setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);
					console.log(linkElements[i].getAttribute('href'));
			}
		}

	} else if (awsService == 'cloudsearch' || 'swf') {

		// In these few cases, we need to actually add the favicon tag, because no one at Amazon did this yet!

		// Build the icon and shortcut icon tags so we can add them inside the head tag
		let iconNode = document.createElement('link');
		iconNode.setAttribute('rel', 'icon');
		iconNode.setAttribute('type', 'image/png');
		iconNode.setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);
		let shortcutIconNode = document.createElement('link');
		shortcutIconNode.setAttribute('rel', 'shortcut icon');
		shortcutIconNode.setAttribute('type', 'image/png');
		shortcutIconNode.setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);

		// Add the tags we just made to the head tag

		document.getElementsByTagName('head')[0].appendChild(iconNode);
		document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);

	} else {

		// We have a favicon on the page, so just update the favicon tags

		// Get all the <link> tags
		let linkElements = document.getElementsByTagName('link');

		console.log(linkElements);

		for (let i = 0; i < linkElements.length; i++) {

			// There are 2 tags that control the favicon.  Update them to be the correct favicon
			if (linkElements[i].getAttribute('rel') == 'icon') {
					linkElements[i].setAttribute('type', 'image/png');
					linkElements[i].setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);
					console.log(linkElements[i].getAttribute('href'));
			}

			if (linkElements[i].getAttribute('rel') == 'shortcut icon') {
					linkElements[i].setAttribute('type', 'image/png');
					linkElements[i].setAttribute('href', `https://s3-us-west-2.amazonaws.com/jaimebarriga.com-aws-icons/${awsService.href}`);
					console.log(linkElements[i].getAttribute('href'));
			}
		}
	}
}