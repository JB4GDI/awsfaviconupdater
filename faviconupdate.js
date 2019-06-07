// Define all the AWS services here
const SERVICES = {

	"acm":								{href: "acm.png"},
	"apigateway":					{href: "apigateway.png"},
	"amazon-mq":					{href: "amazon-mq.png"},
	"appsync":						{href: "appsync.png"},
	"artifact":						{href: "artifact.png"},
	"athena":							{href: "athena.png"},
	"batch":							{href: "batch.png"},
	"billing":						{href: "billing.png"},
	"cloudformation":			{href: "cloudformation.png"},
	"cloudfront":					{href: "cloudfront.png"},
	"cloudhsm":						{href: "cloudhsm.png"},
	"cloudsearch":				{href: "cloudsearch.png"},				// Needs favicon
	"cloudtrail":					{href: "cloudtrail.png"},
	"cloudwatch":					{href: "cloudwatch.png"},
	"codebuild":					{href: "codebuild.png"},
	"codecommit":					{href: "codecommit.png"},
	"codedeploy":					{href: "codedeploy.png"},
	"codepipeline":				{href: "codepipeline.png"},
	"codestar":						{href: "codestar.png"},
	//"cognito":					{href: "cognito.png"},						// Amazon did this one!
	"config":							{href: "config.png"},
	"connect":						{href: "connect.png"},
	"console":						{href: "console.png"},	
	"datapipeline":				{href: "datapipeline.png"},
	"deeplens":						{href: "deeplens.png"},
	"devicefarm":					{href: "devicefarm.png"},
	"directconnect":			{href: "directconnect.png"},
	//"directoryservice":	{href: "directoryservice.png"},		// Amazon did this one!
	"discovery":					{href: "discovery.png"},
	"dms":								{href: "dms.png"},	
	"dynamodb":						{href: "dynamodb.png"},	
	"ec2":								{href: "ec2.png"},
	"es":									{href: "es.png"},
	"efs":								{href: "efs.png"},
	"ecs":								{href: "ecs.png"},
	"elasticache":				{href: "elasticache.png"},
	"elastictranscoder":	{href: "elastictranscoder.png"},
	"elasticbeanstalk":		{href: "elasticbeanstalk.png"},
	"elasticmapreduce":		{href: "elasticmapreduce.png"},
	"glacier":						{href: "glacier.png"},
	"gamelift":						{href: "gamelift.png"},
	"glue":								{href: "glue.png"},
	//"greengrass":				{href: "greengrass.png"},					// Part of iot, and it has a special URL
	"guardduty":					{href: "guardduty.png"},					
	//"iam":							{href: "iam.png"},								// Amazon did this one!
	"iot":								{href: "iot.png"},
	"iotsitewise":				{href: "iotsitewise.png"},
	"importexport":				{href: "snowball.png"},
	"inspector":					{href: "inspector.png"},
	"kinesis":						{href: "kinesis.png"},
	//"lambda":						{href: "lambda.png"},							// Amazon did this one!
	"lex":								{href: "lex.png"},
	"ls":									{href: "ls.png"},									// Reminder: This ls means LightSail
	//"macie":						{href: "macie.png"},							// Needs special handling for unique URL
	"machinelearning":		{href: "machinelearning.png"},
	"managed-services":		{href: "managed-services.png"},
	"mediaconvert":				{href: "mediaconvert.png"},
	"medialive":					{href: "medialive.png"},
	"mediapackage":				{href: "mediapackage.png"},
	"mediastore":					{href: "mediastore.png"},
	"mediatailor":				{href: "mediatailor.png"},
	"migrationhub":				{href: "migrationhub.png"},				// This used to be Discovery
	"mobilehub":					{href: "mobilehub.png"},
	"opsworks":						{href: "opsworks.png"},
	"pinpoint":						{href: "pinpoint.png"},
	"polly":							{href: "polly.png"},
	"rds":								{href: "rds.png"},
	"redshift":						{href: "redshift.png"},
	"rekognition":				{href: "rekognition.png"},
	"route53":						{href: "route53.png"},
	"s3":									{href: "s3.png"},
	"servermigration":		{href: "servermigration.png"},
	"servicecatalog":			{href: "servicecatalog.png"},
	"ses":								{href: "ses.png"},
	"sns":								{href: "sns.png"},
	"sqs":								{href: "sqs.png"},
	"states":							{href: "states.png"},
	"storagegateway":			{href: "storagegateway.png"},
	"sumerian":						{href: "sumerian.png"},
	"systems-manager":		{href: "systems-manager.png"},
	"trustedadvisor":			{href: "trustedadvisor.png"},
	"swf": 								{href: "swf.png"},								// Needs favicon
	"waf": 								{href: "waf.png"},
	"workspaces": 				{href: "workspaces.png"},					// This one is bugged for some unknown reason (see if statement below)
	"workmail": 					{href: "workmail.png"},
	"vpc": 								{href: "vpc.png"},
	"xray": 							{href: "xray.png"},
	"zocalo": 						{href: "zocalo.png"},
	
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

	let awsService = SERVICES[awsServiceName];

	// Ok handle the favicon for a few different situations
	
	if (awsServiceName == 'workspaces' || awsServiceName == 'managed-services') {

		// You may be wondering why this code block is exactly the same as the else statement.  That's because for some
		// unknown reason, `if ('workspaces' == 'cloudsearch' || 'swf')` resolves to true and it is driving me crazy so
		// I'm just forcing the thing to work here.  Uuuuuugh
		// Try it though!  Just  delete this block and start the if statement at `if (awsService == 'cloudsearch' || 'swf')`
		// and see what happens!

		let linkElements = document.getElementsByTagName('link');		
		for (let i = 0; i < linkElements.length; i++) {
			if (linkElements[i].getAttribute('rel') == 'icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));
			}

			if (linkElements[i].getAttribute('rel') == 'shortcut icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));
			}
		}

	} else if (awsService == 'cloudsearch' || 'swf') {

		// In these few cases, we need to actually add the favicon tag, because no one at Amazon did this yet!

		// Build the icon and shortcut icon tags so we can add them inside the head tag
		let iconNode = document.createElement('link');
		iconNode.setAttribute('rel', 'icon');
		iconNode.setAttribute('type', 'image/png');
		iconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));
		let shortcutIconNode = document.createElement('link');
		shortcutIconNode.setAttribute('rel', 'shortcut icon');
		shortcutIconNode.setAttribute('type', 'image/png');
		shortcutIconNode.setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));

		// Add the tags we just made to the head tag

		document.getElementsByTagName('head')[0].appendChild(iconNode);
		document.getElementsByTagName('head')[0].appendChild(shortcutIconNode);

	} else {

		// We have a favicon on the page, so just update the favicon tags

		// Get all the <link> tags
		let linkElements = document.getElementsByTagName('link');

		for (let i = 0; i < linkElements.length; i++) {

			// There are 2 tags that control the favicon.  Update them to be the correct favicon
			if (linkElements[i].getAttribute('rel') == 'icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));
			}

			if (linkElements[i].getAttribute('rel') == 'shortcut icon') {
				linkElements[i].setAttribute('type', 'image/png');
				linkElements[i].setAttribute('href', chrome.runtime.getURL(`icons/${awsService.href}`));
			}
		}
	}
}