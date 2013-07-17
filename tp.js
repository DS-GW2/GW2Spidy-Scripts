			var xmlhttp;

            var objArgs = WScript.Arguments;
			if (objArgs.length != 2)
            {
            	WScript.Echo ("cscript tp.js <email> <password>");
             	WScript.Quit();
            }

            var postData = "email=" + encodeURIComponent(objArgs(0)) + "&password=" + encodeURIComponent(objArgs(1));
            //var postData = "email=" + objArgs(0) + "&password=" + objArgs(1);
            WScript.Echo(postData);
            
			xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.6.0");
			xmlhttp.open("POST", "https://account.guildwars2.com/login", true);

            //Add headers
		     xmlhttp.setRequestHeader("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
		     xmlhttp.setRequestHeader("Accept-Charset", "ISO-8859-1,utf-8;q=0.7,*;q=0.3");
		     xmlhttp.setRequestHeader("Accept-Encoding", "gzip,deflate,sdch");
		     xmlhttp.setRequestHeader("Accept-Language", "en-US,en;q=0.8");
		     xmlhttp.setRequestHeader("Cache-Control", "max-age=0");
		     xmlhttp.setRequestHeader("Connection","keep-alive");
		     //xmlhttp.setRequestHeader("Connection","close");
		     xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		     xmlhttp.setRequestHeader("Content-Length", postData.length);
		     xmlhttp.setRequestHeader("Cookie", "__utma=159804514.1241832490.1346431770.1355787713.1356152976.52; __utmz=159804514.1356152976.52.45.utmcsr=client|utmccn=(not%20set)|utmcmd=(not%20set)");
		     // xmlhttp.setRequestHeader("DNT", "1");
		     xmlhttp.setRequestHeader("Host", "account.guildwars2.com");
		     xmlhttp.setRequestHeader("Origin", "https://account.guildwars2.com");
		     //xmlhttp.setRequestHeader("Referer","https://account.guildwars2.com/login?redirect_uri=http%3A%2F%2Ftradingpost-live.ncplatform.net%2Fauthenticate%3Fsource%3D%252F&game_code=gw2");
		     xmlhttp.setRequestHeader("Referer","https://account.guildwars2.com/login");
		     xmlhttp.setRequestHeader("User-Agent","Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11");

   //           xmlhttp.onreadystatechange = function () {
			// 	if (xmlhttp.readyState != 4) return;
			// 	if (xmlhttp.status != 200 && xmlhttp.status != 304) {
			// 		WScript.Echo('HTTP error ' + xmlhttp.status);
	  //     	        return;
			// 	}
			// 	WScript.Echo (xmlhttp.getAllResponseHeaders());
			// 	WScript.Echo (xmlhttp.responseText);
			// }
			//if (xmlhttp.readyState == 4)  WScript.Quit();
			xmlhttp.send(postData);

			var varCounter = 0;
			while ((xmlhttp.readyState != 4) && (varCounter != 30))
			{
				varCounter = varCounter + 1;
				WScript.Sleep(1000);
			}
			if (varCounter == 30)
			{
				xmlhttp.abort();
				WScript.Echo("Your request has timed out.");
			}
			else if (xmlhttp.status != 200)
			{
				WScript.Echo("HTTP error " + xmlhttp.status + ": " + xmlhttp.statusText);
			}
			else
			{
				WScript.Echo (xmlhttp.getAllResponseHeaders());
			 	WScript.Echo (xmlhttp.responseText);
			}


			//xmlhttp.setRequestHeader ("If-Modified-Since", "Tue, 1 Jan 1970 01:00:00 GMT");



			

