import * as Speaker from "../common/speaker";
import config from "../config/resistance.js";
import "../utils/Array.prototype.includes.js";

var delay = 3000;



function readScript(selectedCards) {

	var script = config.script;
	var selectedCardIds = selectedCards.map(c => c.id);

	// filter out the scripts that we don't need
	script = script.filter(function(chunk){
		
		// if this chunk doesn't have any dependancies, include it
		if (!chunk.dependencies) { return true; }

		// otherwise, make sure all it's deps are in the selected cards
		return chunk.dependencies.every(function(dep){
			return selectedCardIds.includes(dep);
		});
	})

	console.log(script.map(s => s.text));

	function readNext(){
		var chunk = script.shift();

		if (!chunk) { return; } // we're done

		// var deferred = $.Deferred();

		Speaker.speak(chunk.text, function(){

			setTimeout(function(){
				readNext();
			}, delay);

		});

	}

	readNext();


}

export { readScript };

