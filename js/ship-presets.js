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