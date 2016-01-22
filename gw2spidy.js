xmlhttp = new ActiveXObject("Msxml2.XMLHTTP.6.0");

function GW2Spidy()
{
	this.Name = getName;
    this.DisciplinesList = getDisciplinesList;
	this.TypesList = getTypesList;
	this.RaritiesList = getRaritiesList;
	this.AllItemsList = getAllItemsList;
	this.ItemsOfTypes = getItemsOfTypes;
	this.ItemsOfType = getItemsOfType;
	this.ItemData = getItemData;

	this.BuyListings = getBuyListings;
        this.SellListings = getSellListings;
	this.SearchItems = searchItems;
	this.AllRecipesList = getAllRecipesList;
	this.RecipesOfDisciplines = getRecipesOfDisciplines;
	this.RecipesOfDiscipline = getRecipesOfDiscipline;
	this.RecipeData = getRecipeData;
	this.GemPrice = getGemPrice;
	
	this.monthlyOfferAverage = monthlyOfferAverage;
	this.monthlySellAverage = monthlySellAverage;
	this.getSubType = getSubType;
	
	function monthlyOfferAverage(id)
	{
		var listing = getBuyListings(id, 1);
		
		if (listing.length == 0) { WScript.Echo("length zero"); return 0; }
					
		var startDate = getDateTime(listing[0].listing_datetime);
		var previousMonth = new Date(startDate);
		previousMonth.setMonth(startDate.getMonth() - 1);
		
		var currentPage = 1;
		var count = 0;
		var average = 0;
		while (true)
		{
			average += monthlyAverage(listing, previousMonth);
			count++;
			
			currentPage++;				
			listing = getBuyListings(id, currentPage);
			if (listing.length == 0 || getDateTime(listing[0].listing_datetime) <= previousMonth) break;				
			//WScript.Echo(average + " " + count);
		}	
		
		return Math.round(average / count);
	}
	
	function monthlySellAverage(id)
	{
		var listing = getSellListings(id, 1);
		
		if (listing.length == 0) { WScript.Echo("length zero"); return 0; }
					
		var startDate = getDateTime(listing[0].listing_datetime);
		var previousMonth = new Date(startDate);
		previousMonth.setMonth(startDate.getMonth() - 1);
		
		var currentPage = 1;
		var count = 0;
		var average = 0;
		while (true)
		{
			average += monthlyAverage(listing, previousMonth);
			count++;
			
			currentPage++;				
			listing = getSellListings(id, currentPage);
			if (listing.length == 0 || getDateTime(listing[0].listing_datetime) <= previousMonth) break;				
			//WScript.Echo(average + " " + count);
		}	

		return Math.round(average / count);
	}
	
	function getName(list, id)
	{
		for (var i in list) {
			if (list[i].id == id) return list[i].name;
		}
		return "Unknown";
	}

    function getTypesList()
	{
	       return _request('types').results;
	}

	function getSubType(typeList, item)
	{
		var list = typeList;
		if (list == null) list = getTypesList();
		for (var i in list) {
			if (list[i].id == item.type_id)
			{
				list2 = list[i].subtypes;
				for (var j in list2) {
					if (list2[j].id == item.sub_type_id) return list2[j].name;					
				}
			}
		}

	}

	function getDisciplinesList()
	{
   		return _request('disciplines').results;
	}

	function getRaritiesList()
	{
		return _request('rarities').results;
	}

    function getAllItemsList()
	{
		return _request('all-items','all').results;
	}

	function getItemsOfTypes()
	{
		if (arguments.length == 0) return null;

		var list = new Array();
		for (var i = 0; i < arguments.length; i++) {
			try {
				var newObjList = getItemsOfType(arguments[i]);
			}
			catch (e) {
				WScript.Echo ("Error getting items of type " + arguments[i] + ":" + e.message);
				continue;
			}
			list = list.concat(newObjList);
		}	
		return list;	
	}

	function getItemsOfType(typeId)
	{
		var list = _request('all-items', String(typeId)).results;
		list = _getListFromGW2API(list);
		return list;
	}

        function getItemData(itemId)
	{
		var item = _request('item', String(itemId)).result;
                var item2 = _request2('prices/' + String(itemId));
                item.max_offer_unit_price = item2.buys.unit_price;
                item.min_sale_unit_price = item2.sells.unit_price;
                return item;
	}

	function getBuyListings(itemId, allPages)
	{
		allPages = (typeof allPages === "undefined") ? false : allPages;
		return _paginatedRequest(allPages, 'listings', String(itemId), 'buy');
	}

	function getSellListings(itemId, allPages)
	{
		allPages = (typeof allPages === "undefined") ? false : allPages;
		return _paginatedRequest(allPages, 'listings', String(itemId), 'sell');
	}

	function searchItems(name, allPages)
	{
		allPages = (typeof allPages === "undefined") ? false : allPages;
		return _paginatedRequest(allPages, 'item-search', name);
	}

	function getAllRecipesList(allPages)
	{
		allPages = (typeof allPages === "undefined") ? false : allPages;
		return _paginatedRequest(allPages, 'recipes', 'all');
	}

	function getRecipesOfDisciplines()
	{
		if (arguments.length == 0) return null;

		var list = new Array();
		for (var i = 0; i < arguments.length; i++) {
			try {
				var newObjList = getRecipesOfDiscipline(arguments[i], true);
			}
			catch (e) {
				WScript.Echo ("Error getting recipes of discipline " + arguments[i] + ":" + e.message);
				continue;
			}
			list = list.concat(newObjList);
		}	
		return list;	
	}

	function getRecipesOfDiscipline(disciplineId, allPages)
	{
		allPages = (typeof allPages === "undefined") ? false : allPages;
		return _paginatedRequest(allPages, 'recipes', String(disciplineId));	
	}

	function getRecipeData(recipeId)
	{
		return _request('recipe', String(recipeId)).result;
	}

	function getGemPrice()
	{
		return _request('gem-price');
	}

	function _paginatedRequest(allPages, args)
	{
		if (arguments.length > 2)
		{
			for (var i = 2; i < arguments.length; i++)
			{
				args = args + "/" + arguments[i];
			}
		}
		var data = new Array();
		var currentPage = 1;
		if (!isNaN(parseInt(allPages)) && isFinite(allPages))
		{
			currentPage = parseInt(allPages);
			allPages = false;
		}
		while (true)
		{
			try {
				var newData = _request(args + "/" + String(currentPage));
				if (!allPages) return newData.results;
				data = data.concat(newData.results);
				currentPage++;
				if (newData.page == newData.last_page) break;
			}
			catch (e)
			{
				if (!allPages) throw e;
				WScript.Echo ("Error getting page request:" + args + "/" + String(currentPage) + ":" + e.message);
				break;
			}

		}
		return data;
	}

	function _request()
	{
		var args = Array.prototype.slice.call(arguments)
		//WScript.Echo(args.join("/"));
		try {
			_HttpGet(args);
		}
		catch (e)
		{	
			WScript.Echo ("Error: " + e.number);	
                        WScript.Echo ("Retrying...");

			try {
				_HttpGet(args);
			}
			catch (e)
			{
				WScript.Echo ("Error: " + e.number);
			}	
		}
			
		//WScript.Echo (xmlhttp.getAllResponseHeaders());
		//WScript.Echo (xmlhttp.responseText);
		try {
			var outputString = _JSONParse();
		}
		catch(e) 
		{
			//WScript.Echo ("JSON parsing error!  String: " + parseString);
			WScript.Echo ("JSON parsing error!  Retrying...");
			_HttpGet(args);
			var outputString = _JSONParse();
		}
         	return(outputString);
	}

	function _HttpGet(args)
	{
		xmlhttp.open("GET", "http://www.gw2spidy.com/api/v0.9/json/" + args.join("/"), false);				
		xmlhttp.send();	
	}

	function _pluck(originalArr, prop) {
	    var newArr = [];
	    for(var i = 0; i < originalArr.length; i++) {
	        newArr[i] = originalArr[i][prop];
	    }
	    return newArr;
       }

	function _getListFromGW2API(list)
        {		
		var maxCount = 175;
		var ids;	
		if (list.length <= maxCount)
		{
			ids = _pluck(list, "data_id").join(",");
			return fillPrices(ids, list);			
		}
		else
		{
			var retList = new Array();
			var base = 0;
			var end;
			while (base < list.length)
			{
				end = Math.min(base + maxCount, list.length);		
				var list2 = list.slice(base, end);
				ids = _pluck(list2, "data_id").join(",");
 				Array.prototype.push.apply(retList, fillPrices(ids, list2));
				base = end;
			}
			return retList;
		}
	}

	function fillPrices(ids, list)
	{
        var list2 = _request2('prices?ids=' + ids);
		
		var i = 0;
		for (var item in list)
		{
					if (list2[i])
					{
						if (list2[i].buys && list2[i].buys !== "null" && list2[i].buys !== "undefined") item.max_offer_unit_price = list2[i].buys.unit_price;
						if (list2[i].sells && list2[i].sells !== "null" && list2[i].sells !== "undefined") item.min_sale_unit_price = list2[i].sells.unit_price;
					}
			i++;
		}
		return list;
	}
	
	function _request2()
	{
		var args = Array.prototype.slice.call(arguments)
		//WScript.Echo(args.join("/"));
		try {
			_HttpGet2(args);
		}
		catch (e)
		{	
			WScript.Echo ("Error: " + e.number);	
                        WScript.Echo ("Retrying...");

			try {
				_HttpGet2(args);
			}
			catch (e)
			{
				WScript.Echo ("Error: " + e.number);
			}	
		}
			
		//WScript.Echo (xmlhttp.getAllResponseHeaders());
		//WScript.Echo (xmlhttp.responseText);
		try {
			var outputString = _JSONParse();
		}
		catch(e) 
		{
			//WScript.Echo ("JSON parsing error!  String: " + parseString);
			WScript.Echo ("JSON parsing error!  Retrying...");
			//_HttpGet2(args);
			//var outputString = _JSONParse();
		}
         	return(outputString);
	}

	function _HttpGet2(args)
	{
		xmlhttp.open("GET", "https://api.guildwars2.com/v2/commerce/" + args.join("/"), false);				
		xmlhttp.send();	
	}

	function _JSONParse()
	{
		//var start = xmlhttp.responseText.indexOf("{");
		//var parseString = xmlhttp.responseText.substr(start);
		var parseString = xmlhttp.responseText;
		return JSON.parse(parseString);
	}
	
	function getDateTime(str)
	{
		var dateTime = str.split(" ");
		var date = dateTime[0];
		var time = dateTime[1];

		var dateBits = date.split("-");
		var timeBits = time.split(":");

		return new Date(dateBits[0], dateBits[1], dateBits[2], timeBits[0], timeBits[1], timeBits[2]);
	}

	function monthlyAverage(listing, stopDate)
	{
		if (listing.length == 0) { WScript.Echo("length zero"); return 0; }

		var count = 0;
		var cost = 0;
		for (var i in listing)
		{
			if (getDateTime(listing[i].listing_datetime) <= stopDate) break;
			cost += listing[i].unit_price;
			count++;
		}
		return cost / count;
	}
}
