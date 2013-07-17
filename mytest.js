var gw2types = [{name:"Armor", subTypes: [ "Coat", "Leggings", "Gloves", "Helm" ]},{},{name:"Bag"}];

//gw2types.push({name:"Armor", subTypes: [ "Coat", "Leggings", "Gloves", "Helm" ]});
//gw2types.push({name:"Bag"});

WScript.Echo(gw2types[0].subTypes[0]);

if (match("of Blood", 24570, "of Coiler"))
{
	WScript.Echo("Matches!!!");
}
else
{
	WScript.Echo("No Match!");
}

		function match(suffix, data_id, itemName)
		{
			switch (data_id)
			{
		////////////////// Sigils //////////////////////////////

				case 24548:
					var collection = [ "Al'ir'aska" ];
					break;
				case 24551:
					var collection = [ "Azure Railgun" ];
					break;
				case 24554:
					var collection = [ "Moonshine" ];
					break;
				case 24555:
					var collection = [ "The Maelstrom" ];
					break;
				case 24560:
					var collection = [ "Berserker's Mace$" ];
					break;
				case 24561:
					var collection = [ "Gearbore" ];
					break;
				case 24570:
					var collection = [ "^Coiler$" ];
					break;
				case 24571:
					var collection = [ "Sarraceinaceae" ];
					break;
				case 24572:
					var collection = [ "Grimward" ];
					break;
				case 24575:
					var collection = [ "The Stingray" ];
					break;
				case 24578:
					var collection = [ "Atlatl" ];
					break;
				case 24580:
					var collection = [ "Coldsnap" ];
					break;
				case 24582:
					var collection = [ "Siren's Call" ];
					break;
				case 24583:
					var collection = [ "Bloodseeker" ];
					break;
				case 24591:
					var collection = [ "Infinite Light" ];
					break;
				case 24592:
					var collection = [ "Rivetwall" ];
					break;
				case 24594:
					var collection = [ "Firelighter" ];
					break;
				case 24597:
					var collection = [ "Sun God's Gift" ];
					break;
				case 24599:
					var collection = [ "Scorchrazor's Fist" ];
					break;
				case 24600:
					var collection = [ "Beacon of the True Legions" ];
					break;
				case 24601:
					var collection = [ "Cooguloosh" ];
					break;
				case 24605:
					var collection = [ "The Hunt" ];
					break;
				case 24607:
					var collection = [ "Tinwail" ];
					break;
				case 24612:
					var collection = [ "Droknar's Forgehammer" ];
					break;
				case 24615:
					var collection = [ "Black Fleet Bludgeon" ];
					break;
				case 24618:
					var collection = [ "Blaze of the Serpents" ];
					break;
				case 24621:
					var collection = [ "Breath of Flame" ];
					break;
				case 24624:
					var collection = [ "Dragonfury" ];
					break;
				case 24627:
					var collection = [ "Beacon of Kryta" ];
					break;
				case 24630:
					var collection = [ "Spectral Wave Modulator" ];
					break;
				case 24632:
					var collection = [ "Dragonspine" ];
					break;
				case 24636:
					var collection = [ "Razorstone" ];
					break;
				case 24648:
					var collection = [ "Kevin" ];
					break;
				case 24658:
					var collection = [ "Steamfire" ];
					break;
				case 36053:
					var collection = [ "The Mad Moon" ];
					break;

		////////////////// Runes //////////////////////////////

				case 24687:
					var collection = [ "Brutus", "Sheena" ];
					break;
				case 24688:
					var collection = [ "Khilbron" ];
					break;
				case 24691:
					var collection = [ "Yakkington" ];
					break;
				case 24696:
					var collection = [ "Zho" ];
					break;
				case 24699:
					var collection = [ "Jalis" ];
					break;	
				case 24702:
					var collection = [ "Aidan" ];
					break;	
				case 24703:
					var collection = [ "Nika" ];
					break;	
				case 24708:
					var collection = [ "Tahlkora" ];
					break;	
				case 24711:
					var collection = [ "Rurik" ];
					break;	
				case 24714:
					var collection = [ "Devona", "Ogden" ];
					break;	
				case 24717:
					var collection = [ "Shiro" ];
					break;	
				case 24723:
					var collection = [ "Errol" ];
					break;	
				case 24738:
					var collection = [ "Jatoro" ];
					break;	
				case 24765:
					var collection = [ "Norgu", "Koss" ];
					break;	
				case 24768:
					var collection = [ "Mhenlo" ];
					break;	
				case 24771:
					var collection = [ "Reyna" ];
					break;	
				case 24779:
					var collection = [ "Galrath" ];
					break;	
				case 24788:
					var collection = [ "Zhed" ];
					break;	
				case 24797:
					var collection = [ "Vatlaaw" ];
					break;	
				default:
					var collection = [];
					break;		
						
			}

			collection.push(suffix);

			for (var i in collection)
			{
				if (!itemName.match(collection[i])) continue;

				return true;		
			}
			return false;
		}