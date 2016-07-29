/*
Mass,Hull,Shield,Cost,Crew,Automaton,Bunks,Drag,Heat,Fuel,Cargo,
Outfit,WeaponCap,EngineCap,Blast,ShieldDamage,HullDamage,HitForce
*/
// 18 inputs
var Preset = function(Name,Mass,Hull,Shield,Cost,Crew,Bunks,Drag,Heat,Fuel,Cargo,Outfit,WeaponCap,EngineCap,Blast,ShieldDamage,HullDamage,HitForce){
	var ship = {
		Name:Name,
		Mass:Mass,
		Hull:Hull,
		Shield:Shield,
		Cost:Cost,
		Crew:Crew,
		Bunks:Bunks,
		Drag:Drag,
		Heat:Heat,
		Fuel:Fuel,
		Cargo:Cargo,
		Outfit:Outfit,
		WeaponCap:WeaponCap,
		EngineCap:EngineCap,
		Blast:Blast,
		ShieldDamage:ShieldDamage,
		HullDamage:HullDamage,
		HitForce:HitForce
	};
	return ship;
};

//Name,Mass,Hull,Shield,Cost,Crew,Bunks,Drag,Heat,Fuel,Cargo,Outfit,WeaponCap,EngineCap,Blast,ShieldDamage,HullDamage,HitForce
// Built in presets. Use same var name as ship name, no spaces or weird names. Instead of spaces use underscores
var Shuttle = Preset("Shuttle",70,600,500,180000,1,6,1.7,0.7,400,20,120,10,60,12,120,60,180);
var Star_Barge = Preset("Star Barge", 50, 300, 1200, 225000, 1, 2, 1, .8, 300, 15, 130, 20, 40, 16, 160, 80, 240);
var Behemoth = Preset("Behemoth",540,6300,7600,7800000,12,30,11.7,0.4,600,490,510,280,90,140,1400,700,2100);
var Sparrow = Preset("Sparrow", 50, 300, 1200, 225000, 1, 2, 1, .8, 300, 15, 130, 20, 40, 16, 160, 80, 240);
var Gunboat = Preset("Gunboat",150,1400,5800,3200000,7,12,3.1,0.8,600,50,270,100,90,72,720,360,1080);
var Frigate = Preset("Frigate",310,2500,8000,5200000,21,44,5.2,0.7,500,35,410,170,100,100,1000,500,1500);
var Bactrian = Preset("Bactrian",940,8600,17500,17600000,70,245,16.1,0.4,700,530,740,300,180,260,2600,1300,3900);


// Must be the var name
var presetList = [Shuttle, Star_Barge, Behemoth, Sparrow, Gunboat, Frigate, Bactrian];

// Load the preset data into the inputs
var loadPreset = function(preset) {
	for (var prop in preset) {
		if (!preset.hasOwnProperty(prop)) {
        //The current property is not a direct property of the preset
        continue;
    }
    //Fill inputs with the preset
    $("#i" + prop).val(preset[prop]);
}
};

// Load the list of presets
var loadPresetList = function() {
	// Empty the list
	$("#iPreset").empty();
	// loop through presetList and add the names to the select list
	for(var i=0; i<presetList.length; i++) {
		var presetName = (presetList[i].Name);
		presetName = presetName.replace(/_/g, " ");
		$('#iPreset').append("<option>"+ presetName +"</option>");
	}
};

loadPresetList();
// Add the stored values to the inputs
var insertPreset = function() {
	var presetName = $("#iPreset").val()

	for(var i=0; i<presetList.length; i++) {
		if(presetList[i].Name == presetName){
			loadPreset(presetList[i]);
			return;
		}
	}
	// Finds the variable if it cant find the name
	var fixPreset = $("#iPreset").val()
	fixPreset = fixPreset.replace(/ /g, "_"); // replace spaces with underscores
	var currPreset = eval(fixPreset); // String to var
	loadPreset(currPreset);
};

//Name,Mass,Hull,Shield,Cost,Crew,Bunks,Drag,Heat,Fuel,Cargo,Outfit,WeaponCap,EngineCap,Blast,ShieldDamage,HullDamage,HitForce
var savePreset = function() {
	var valVarName = ($("#iName").val()),
	valVarName = valVarName.replace(/ /g, "_"),
	valName = ($("#iName").val()),
	valName = valName.replace(/_/g, " "),
	valMass = Number($("#iMass").val()),
	valHull = Number($("#iHull").val()),
	valShield = Number($("#iShield").val()),
	valCost = Number($("#iCost").val()),
	valCrew = Number($("#iCrew").val()),
	valBunks = Number($("#iBunks").val()),
	valDrag = Number($("#iDrag").val()),
	valHeat = Number($("#iHeat").val()),
	valFuel = Number($("#iFuel").val()),
	valCargo = Number($("#iCargo").val()),
	valOutfit = Number($("#iOutfit").val()),
	valWeaponCap = Number($("#iWeaponCap").val()),
	valEngineCap = Number($("#iEngineCap").val()),
	valBlast = Number($("#iBlast").val()),
	valShieldDamage = Number($("#iShieldDamage").val()),
	valHullDamage = Number($("#iHullDamage").val()),
	valHitForce = Number($("#iHitForce").val());

	var newShip = new Preset(valName,valMass,valHull,valShield,valCost,valCrew,valBunks,valDrag,valHeat,valFuel,valCargo,valOutfit,valWeaponCap,valEngineCap,valBlast,valShieldDamage,valHullDamage,valHitForce);
	presetList.push(newShip);
	savePresetStorage();
	loadPresetList();
};


var savePresetStorage = function() {
	localStorage.setItem('presetList', JSON.stringify(presetList));
};

var loadPresetStorage = function() {
	if(localStorage.getItem('presetList')) { // if was saved before load it
		presetList = JSON.parse(localStorage.getItem('presetList'));
		loadPresetList();
		return "Storage loaded!"
	} else {
		presetList = [Shuttle, Star_Barge, Behemoth, Sparrow, Gunboat, Frigate, Bactrian];
		loadPresetList();
		return "No saved lists found!"
	}
};

var deletePresetStorage = function() {
	localStorage.removeItem('presetList');
};

/*
steps to save a ship
savePreset(); adds it the presetList array, then saves the storage, and reloads the list
loadPresetStorage(); loads the saved lists
deletePresetStorage(); deletes any non hardcoded ships
*/

// KORATH
var korathPresets = [
Preset("Korath Raider",720,9000,27000,16570000,145,250,12,0.5,600,175,721,284,159,250,3600,1800,5400),
Preset("Korath Chaser",40,900,2300,671000,1,1,0.9,0.9,0,0,92,25,30,48,320,160,480),
Preset("Korath World-Ship",1735,34000,47000,27690000,794,1492,21,0.4,600,264,778,314,165,400,8000,4000,12000),
Preset("Kar Ik Vot 349",1350,65400,57200,41280000,0,0,16.8,0.5,400,87,1054,447,173,450,6400,3200,9600),
Preset("Tek Far 71 - Lek",610,29500,25400,22870000,0,0,9.6,0.6,400,36,533,235,102,320,4000,2000,6000),
Preset("Tek Far 78 - Osk",690,34100,27600,25630000,0,0,10.2,0.55,400,43,611,272,117,340,4400,2200,6600),
Preset("Tek Far 109,540",15800,17900,18290000,0,0,9.1,0.65,400,31,491,217,98,280,3200,1600,4800),
Preset("Met Par Tek 53",420,22200,15100,14480000,0,0,5.7,0.8,400,26,610,213,110,250,3200,1600,4800),
Preset("Far Lek 14",26,1600,900,573000,0,0,0.8,1.1,0,0,65,11,24,5,50,25,75),
Preset("Far Osk 27",34,2400,1500,761000,0,0,1.1,1,0,0,99,22,24,12,120,60,180),
Preset("Model 16",250,9800,15700,8449000,0,0,6.9,1.3,400,7,426,149,107,200,2200,1100,3300),
Preset("Model 32",370,13400,27900,12765000,0,0,9,1.3,400,16,481,205,110,240,3200,1600,4800),
Preset("Model 64",580,18000,41700,19552000,0,0,11.1,1.1,400,34,567,263,114,280,4000,2000,6000),
Preset("Model 128",780,23100,57000,24073000,0,0,13.2,1,400,53,712,344,132,320,4600,2300,6900),
Preset("Model 256",970,28700,71700,34920000,0,0,15.3,0.9,400,78,857,393,145,340,5200,2600,7800),
];

// PUG
var pugPresets = [
Preset("Pug Zibruka",240,1000,4000,1900000,4,6,3.1,0.8,600,20,180,68,76,100,400,200,600),
Preset("Pug Enfolta",410,1700,6800,6300000,19,27,5.9,0.7,600,40,360,184,106,180,720,360,1080),
Preset("Pug Maboro",940,2700,12600,9500000,54,87,9.8,0.6,600,70,560,309,148,300,1200,600,1800),
Preset("Pug Arfecta",670,80000,98000,90000000,36,46,7.5,0.8,1200,64,640,390,220,320,9000,4500,7000),
];

// QUARG
var quargPresets = [
Preset("Quarg Skylark",460,70000,120000,5900000,120,210,12.3,0.7,1000,200,600,200,120,250,1000,500,1500),
Preset("Quarg Wardragon",360,50000,160000,5900000,160,185,0.5,800,50,600,200,120,250,1000,500,1500),
];

// WANDERER
var wandererPresets = [
Preset("Earth Shaper",30,3300,100,500000,0,0,0.9,0.9,300,27,59,0,26,10,100,150,250),
Preset("Flycatcher",40,4700,100,830000,0,0,0.6,0.9,0,0,86,28,26,10,100,150,250),
Preset("Summer Leaf",110,6700,14400,9500000,6,15,2.6,0.8,800,41,320,84,103,70,700,350,1050),
Preset("Autumn Leaf",130,7400,18700,12500000,8,16,2.9,0.8,1000,45,361,103,117,80,800,400,1200),
Preset("Strong Wind",260,19600,28500,16100000,17,39,4.7,0.7,400,68,493,198,114,200,2000,1000,3000),
Preset("Deep River",750,47500,17600,18300000,13,22,9.4,0.6,500,760,363,177,83,280,2800,1400,4200),
];

// DRAK
var drakPresets = [
Preset("Archon",1000,1000000,4000000,1000000000,1,1,27,40,800,0,800,600,200,200,20000,10000,30000),
];

// HAI
var haiPresets = [
Preset("Aphid",100,1400,1700,570000,1,5,1.9,0.9,400,51,185,37,48,30,300,150,450),
Preset("Lightning Bug",220,1700,6700,3200000,4,10,3.8,0.85,600,73,278,87,93,84,840,420,1260),
Preset("Shield Beetle",650,9800,17900000,47,95,8.8,0.6,500,142,798,333,150,400,4000,2000,3000),
Preset("Water Bug",270,4500,7900,6500000,5,29,5.9,0.75,600,197,368,145,64,124,1240,620,1860),
];

// HUMAN
var humanPresets = [
Preset("Aerie",130,1900,5700,3500000,10,28,4.1,0.7,500,50,390,150,95,80,800,400,1200),
Preset("Argosy",330,2600,4200,1560000,4,14,5.9,0.7,400,120,270,90,80,60,600,300,900),
Preset("Arrow",130,400,2000,1200000,1,5,2.7,0.85,400,10,180,50,60,24,240,120,360),
Preset("Bactrian",940,8600,17500,17600000,70,245,16.1,0.4,700,530,740,300,180,260,2600,1300,3900),
Preset("Bastion",580,4200,6700,3560000,32,47,10.3,0.5,500,110,470,180,120,120,1200,600,1800),
Preset("Behemoth",540,6300,7600,7800000,12,30,11.7,0.4,600,490,510,280,90,140,1400,700,2100),
Preset("Berserker",110,500,2200,520000,1,2,2.2,0.85,400,10,200,35,65,30,300,150,450),
Preset("Blackbird",220,900,4400,2230000,3,28,5,0.7,700,60,350,90,110,60,600,300,900),
Preset("Bounder",130,700,2200,1140000,1,17,3.7,0.8,900,40,220,50,110,30,300,150,450),
Preset("Boxwing",45,800,400,369000,1,1,0.59,0.27,600,80,45,180,28,12,120,60,180),
Preset("Carrier",910,8300,21400,15200000,111,184,17.7,0.45,700,100,820,370,210,300,3000,1500,4500),
Preset("Class C Freighter",810,7600,13500,11400000,18,43,16.4,0.5,600,20,400,140,85,200,2000,1000,3000),
Preset("Clipper",150,800,2700,900000,3,9,3.7,0.8,500,70,260,60,80,36,360,180,540),
Preset("Corvette",150,1200,6100,4400000,8,32,3.5,0.7,500,40,420,150,100,80,800,400,1200),
Preset("Cruiser",680,6400,19600,11200000,81,136,10.1,0.45,600,60,760,320,170,260,2600,1300,3900),
Preset("Dreadnought",630,7300,18100,11900000,84,147,10.1,0.65,600,100,790,360,190,260,2600,1300,3900),
Preset("Falcon",510,3700,12800,10900000,52,75,6.7,0.7,600,90,540,240,150,160,1600,800,2400),
Preset("Firebird",290,2800,6400,3700000,7,22,4.5,0.6,400,50,400,160,100,100,1000,500,1500),
Preset("Flivver",40,200,1400,180000,1,3,1,0.9,500,5,130,25,45,16,160,80,240),
Preset("Freighter",240,2000,2000,730000,2,7,5.6,0.6,600,150,250,80,70,40,400,200,600),
Preset("Frigate",310,2500,8000,5200000,21,44,5.2,0.7,500,35,410,170,100,100,1000,500,1500),
Preset("Fury",70,400,2000,490000,1,3,1.6,0.9,600,15,160,40,60,24,240,120,360),
Preset("Gunboat",150,1400,5800,3200000,7,12,3.1,0.8,600,50,270,100,90,72,720,360,1080),
Preset("Hauler",250,3700,2500,1430000,3,12,10.5,0.6,400,130,350,140,80,60,600,300,900),
Preset("Hauler II",360,5200,2900,2340000,3,12,11.5,0.6,400,260,350,140,80,80,800,400,1200),
Preset("Hauler III",470,6700,3300,3260000,3,12,12.5,0.6,400,390,350,140,80,100,1000,500,1500),
Preset("Hawk",150,500,2500,670000,2,4,2.1,0.8,300,30,200,40,70,30,300,150,450),
Preset("Headhunter",120,700,3800,1850000,2,4,2.6,0.8,400,50,250,60,80,44,440,220,660),
Preset("Heavy Shuttle",110,700,700,320000,1,8,2.1,0.8,500,35,120,10,60,12,120,60,180),
Preset("Leviathan",480,5000,14400,9800000,43,64,7.6,0.5,500,80,620,240,120,80,800,400,1200),
Preset("Manta",170,1500,5900,3400000,6,10,4.7,0.8,400,20,350,140,100,80,800,400,1200),
Preset("Mule",320,4400,5400,2580000,6,43,5.7,0.5,600,270,450,210,110,100,1000,500,1500),
Preset("Nest",250,3700,2500,2500000,5,14,10.5,0.67,500,40,400,140,80,60,600,300,900),
Preset("Osprey",270,1600,7200,4400000,9,24,6.1,0.8,600,40,450,180,130,80,800,400,1200),
Preset("Protector",500,6500,9500,5500000,30,69,10.3,0.6,400,50,570,220,100,160,1600,800,2400),
Preset("Quicksilver",120,800,3000,1090000,3,6,2.7,0.8,400,10,240,60,70,40,400,200,600),
Preset("Rainmaker",180,1200,3500,1580000,7,14,3.8,0.6,500,25,230,60,50,40,400,200,600),
Preset("Raven",130,1400,4700,2000000,6,13,3.7,0.8,500,30,280,90,100,60,600,300,900),
Preset("Roost",360,5200,2900,3000000,7,16,11.5,0.67,600,80,450,140,80,80,800,400,1200),
Preset("Scout",110,400,1200,850000,2,12,3.4,0.7,800,55,220,40,100,16,160,80,240),
Preset("Shuttle",70,600,500,180000,1,6,1.7,0.7,400,20,120,10,60,12,120,60,180),
Preset("Skein",470,6700,3300,3500000,7,18,12.5,0.71,700,120,500,140,80,100,1000,500,1500),
Preset("Sparrow",50,300,1200,225000,1,2,1,0.8,300,15,130,20,40,16,160,80,240),
Preset("Splinter",250,1700,5200,3100000,12,21,4,0.7,600,75,400,150,100,60,600,300,900),
Preset("Star Barge",70,1000,600,210000,1,3,2.4,0.7,300,50,130,20,40,16,160,80,240),
Preset("Star Queen",230,2200,4100,5500000,43,112,5.5,0.65,500,60,360,120,100,60,600,300,900),
Preset("Vanguard",500,6000,9800,7200000,23,45,8,0.6,400,50,560,220,120,160,1600,800,2400),
Preset("Wasp",60,500,1500,400000,1,2,1.2,0.8,400,10,150,28,60,20,200,100,300),
];


var setPresetList = function(presets) {
	presetList = presets;
	loadPresetList();
	return "Loaded!";
};

var presetRotator = [korathPresets,pugPresets,quargPresets,wandererPresets,drakPresets,haiPresets,humanPresets,"storage"];
var rotatorPos = 0;

var rotatePresets = function() {
	if (rotatorPos == 7) {
		loadPresetStorage();
		rotatorPos = 0;
		return "Rotator reset!"
	} else {
		setPresetList(presetRotator[rotatorPos]);
		rotatorPos++
		return "Loaded presets, next list position is " + rotatorPos;
	}
};