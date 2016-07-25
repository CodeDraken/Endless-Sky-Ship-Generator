//Code needs to be cleaned up
var generate = function() {
	//generate
	genStrings();
	genAttributes();
	

}; //end generate function

var genStrings = function() {
	$("#cName").html('"' + $("#iName").val() + '"');
	$("#cSprite").html('"ship/' + $("#iName").val() + '"');
	$("#cDisabled").html($("#iDisabled").val());
	$("#cCategory").html('"' + $("#iCategory").val() + '"');
	$("#cDescription").html('"' + $("#iDescription").val() + '"');
};

var genAttributes = function(){
	// sHull used for blast radius calcs
	var sHull = Number($("#iShield").val()) + Number($("#iHull").val()),
	// input values as numbers for easier access
	valCost = Number($("#iCost").val()),
	valShield = Number($("#iShield").val()),
	valHull = Number($("#iHull").val()),
	valCrew = Number($("#iCrew").val()),
	valBunks = Number($("#iBunks").val()),
	valMass = Number($("#iMass").val()),
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
	valHitForce = Number($("#iHitForce").val()),
	// More random generation
	shieldMult = Math.random() * (.7 - .5) + .5,
	hullMultS = Math.random() * (.009 - .006) + .006,
	hullMultM = Math.floor(Math.random() * (12 - 8) + 8);

	var mainAttributes = ["Mass","Hull","Shield","Cost","Crew","Automaton","Bunks","Drag","Heat","Fuel","Cargo","Outfit","WeaponCap","EngineCap","Blast","ShieldDamage","HullDamage","HitForce"];
	for(var i=0; i<mainAttributes.length;i++) { //loop through the attributes



		// Mass Auto Generate (fuel/2) + cargo space + outfit space + weapon capacity + engine capacity /2.3
		if(mainAttributes[i] == "Mass" && (iMass.value.length == 0 || valMass == 0)) {
			var calcMass = Math.round(((valFuel/2) + valCargo + valOutfit + valWeaponCap + valEngineCap)/2.3);
			$("#iMass").val(calcMass);
		}

		// Hull Autofill (shield / (mass*0.007)) + 1
		if(mainAttributes[i] == "Hull" && valShield > 1 && (iHull.value.length == 0 || valHull == 0)) {
			var calcHull = Math.round(Number($("#iShield").val()) / (Number($("#iMass").val()*hullMultS)+1) );
			$("#iHull").val(calcHull);
		}else if(mainAttributes[i] == "Hull" && valMass > 1 && (iHull.value.length == 0 || valHull == 0)) {
			var calcHull = valMass*hullMultM;
			$("#iHull").val(calcHull);
		}

		// Shields Autofill (hull*.7 * (mass*0.002)+1)
		if(mainAttributes[i] == "Shield" && valHull > 0 && (iShield.value.length == 0 || valShield == 0)) {
			var calcShield = Math.round(Number($("#iHull").val()*shieldMult) * (Number($("#iMass").val()*0.002)+ 1) );
			$("#iShield").val(calcShield);
		}

		// Drag Autofill mass/70
		if(mainAttributes[i] == "Drag" && valMass > 1 && (iDrag.value.length == 0 || valDrag == 0)) {
			$("#iDrag").val((valMass/60).toFixed(2));
		}

		// blast radius autofill (shield + hull) *0.01
		if (mainAttributes[i] == "Blast" && (iBlast.value.length == 0 || valBlast == 0)) {
			var bRadius = Math.round(sHull * 0.01);
			$("#iBlast").val(bRadius);
		}
		// Shield damage autofill (shield + hull) * 0.10
		if(mainAttributes[i] == "ShieldDamage" && (iShieldDamage.value.length == 0 || valShieldDamage == 0)) {
			var sDamage = Math.round(sHull * 0.10);
			$("#iShieldDamage").val(sDamage);
		}
		// Hull Damage autofill (shield + hull) * 0.05
		if(mainAttributes[i] == "HullDamage" && (iHullDamage.value.length == 0 || valHullDamage == 0)) {
			var hDamage = Math.round(sHull * 0.05);
			$("#iHullDamage").val(hDamage);
		}
		// Hit Force autofill (shield + hull) * 0.15
		if(mainAttributes[i] == "HitForce" && (iHitForce.value.length == 0 || valHitForce == 0)) {
			var hForce = Math.round(sHull * 0.15);
			$("#iHitForce").val(hForce);
		}

			// default generate fills in the code section
			$('#'+'c'+mainAttributes[i]).html($('#'+'i'+mainAttributes[i]).val());
		} // end for loop
	};

//1,3 would generate randomly 1, 2, or 3.
var rand = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Full random generation based on category
var randomGen = function() {
	reset(); // Clear all inputs
	var randMass = 0;
	var tier = $("#iTier").val();
	var outfitMult = 1; // The Tier system
	var valCategory = $("#iCategory").val();

	// Set tier to 1 if invalid input
	if(isNaN(tier) || tier <= 0){
		tier = 1;
		outfitMult = tier;
	}

	// If tier is bigger than normal make it more random
	if(tier > 1){
		outfitMult = Math.round(tier/rand(1,3));
	}

	// Generate based on category / Looked at game files and got a min/max
	// rand(10,70) * outfitMult = generates random number between 10 & 70 then multiply by outfitMult
	switch(valCategory){
		case "Transport":
		$("#iFuel").val(300 + (rand(1,7) * 100));
		$("#iCargo").val(rand(10,70) * outfitMult);
		$("#iOutfit").val(rand(130,300) * outfitMult);
		$("#iWeaponCap").val(rand(30,100) * outfitMult);
		$("#iEngineCap").val(rand(40,150) * outfitMult);
		break;

		case "Light Freighter":
		$("#iFuel").val(200 + (rand(1,4) * 100));
		$("#iCargo").val(rand(50,200) * outfitMult);
		$("#iOutfit").val(rand(130,400) * outfitMult);
		$("#iWeaponCap").val(rand(30,180) * outfitMult);
		$("#iEngineCap").val(rand(40,150) * outfitMult);
		break;

		case "Heavy Freighter":
		$("#iFuel").val(300 + (rand(1,4) * 100));
		$("#iCargo").val(rand(260,600) * outfitMult);
		$("#iOutfit").val(rand(350,550) * outfitMult);
		$("#iWeaponCap").val(rand(140,300) * outfitMult);
		$("#iEngineCap").val(rand(80,125) * outfitMult);
		break;

		case "Interceptor":
		$("#iFuel").val(200 + (rand(1,4) * 100));
		$("#iCargo").val(rand(10,40) * outfitMult);
		$("#iOutfit").val(rand(130,250) * outfitMult);
		$("#iWeaponCap").val(rand(40,80) * outfitMult);
		$("#iEngineCap").val(rand(40,100) * outfitMult);
		break;

		case "Light Warship":
		$("#iFuel").val(300 + (rand(1,4) * 100));
		$("#iCargo").val(rand(20,75) * outfitMult);
		$("#iOutfit").val(rand(230,340) * outfitMult);
		$("#iWeaponCap").val(rand(60,140) * outfitMult);
		$("#iEngineCap").val(rand(75,150) * outfitMult);
		break;

		case "Medium Warship":
		$("#iFuel").val(300 + (rand(1,4) * 100));
		$("#iCargo").val(rand(35,125) * outfitMult);
		$("#iOutfit").val(rand(380,500) * outfitMult);
		$("#iWeaponCap").val(rand(140,210) * outfitMult);
		$("#iEngineCap").val(rand(100,150) * outfitMult);
		break;

		case "Heavy Warship":
		$("#iFuel").val(300 + (rand(1,5) * 100));
		$("#iCargo").val(rand(50,120) * outfitMult);
		$("#iOutfit").val(rand(500,800) * outfitMult);
		$("#iWeaponCap").val(rand(200,300) * outfitMult);
		$("#iEngineCap").val(rand(140,200) * outfitMult);
		break;

		case "Fighter":
		$("#iFuel").val(0);
		$("#iCargo").val(0);
		$("#iOutfit").val(rand(50,120) * outfitMult);
		$("#iWeaponCap").val(rand(20,35) * outfitMult);
		$("#iEngineCap").val(rand(20,40) * outfitMult);
		break;

		case "Drone":
		$("#iAutomaton").val(1);
		$("#iFuel").val(0);
		$("#iCargo").val(0);
		$("#iOutfit").val(rand(50,70) * outfitMult);
		$("#iWeaponCap").val(rand(12,35) * outfitMult);
		$("#iEngineCap").val(rand(28,35) * outfitMult);
		break;

		default:
		alert("Please choose a ship category!");
		return "Category not selected";
	}

	// Generate several times to fill in all blanks. Could be worked on
	generate();
	generate();
	generate();
};

// Reset all inputs
var reset = function() {
	$("input").val('');
};

// The tooltips
$('[data-toggle="tooltip"]').tooltip({
	container : 'body'
});

// Add buttons with dropdowns, needs to be moved into one function
var addWeapon = function() {
	$("#weapon-list").append("		" + '"' + $("#weaponSelect").val() + '"'  + " " + $("#weaponAmount").val() + "<br>");
};

var addEngine = function() {
	$("#engine-list").append("		" + '"' + $("#engineSelect").val() + '"'  + " " + $("#engineAmount").val() + "<br>");
};

var addModule = function() {
	$("#module-list").append("		" + '"' + $("#moduleSelect").val() + '"'  + " " + $("#moduleAmount").val() + "<br>");
};

var addExplosion = function() {
	$("#explosion-list").append("	" + "explode " + $("#explosionSelect").val()  + " " + $("#explosionAmount").val() + "<br>");
};

// The dropdown with hopefully all correct outfit names, and any saved outfits
var addAllOutfit = function() {
	var outfitNum = $("#allOutfitAmount").val(); // The number of outfits to add

	if(isNaN(outfitNum) && outfitNum.length > 0) { // If the input doesn't have a number but has something add it to the saved list and reset the input
		$("#savedOutfits").append("<option>"+outfitNum+"</option>");
		saveOutfits();
		$("#allOutfitAmount").val("");
	}else { // If the input has a number or nothing then add the selected outfit
		$("#all-outfit-list").append("		" + $("#allOutfitSelect").val()  + " " + $("#allOutfitAmount").val() + "<br>");
	}
};

// position-list, oPositions, addPositions()
var addPositions = function() {
	var lines = $('#oPositions').val().split('\n'); // Split the lines up
	if(lines.length > 1){ // Check if anything was actually typed
		for(var i = 0;i < lines.length;i++){ // Add each line and trim any extra spaces
			$("#position-list").append("	" + lines[i].trim() + "<br>");
		}
	}};

// save list, delete list and load list. Best to comment out when working on code

	// set the #savedOutfits as a var
	var savedOutfits = document.getElementById('savedOutfits');

	// copy the contents of list to storage
	var saveOutfits = function(){
		localStorage.setItem('savedOutfits', savedOutfits.innerHTML);
	};
	
	var deleteSavedOutfits = function(){
		localStorage.removeItem('savedOutfits', savedOutfits.innerHTML); // Remove saved list
		alert("Outfit list removed! Refresh the page to see changes"); // let user know it's removed
	};
	
	var loadList = function() {
		if(localStorage.getItem('savedOutfits')) { // if was saved before load it
			savedOutfits.innerHTML = localStorage.getItem('savedOutfits')
		}
	};

	loadList(); // on load page load the list