import * as config from "../config/config.js";
import "../utils/Array.prototype.find.js";
import "../utils/Array.prototype.findIndex.js";


// import usage:
// import * as resolveDependencies from ".resolveDependencies.js";
// resolveDependencies.byAdding(selectedCards)

// given the selected cards, resolve the dependencies by adding cards
function resolveByAdding(selectedCards){

    var allCards = config.getCardsCollection();

    var resolved = [];

    // boolean, whether or not the given card id is in the resolve collection
    var isInResolved = function(cid) {
        return (resolved.find(c => c.id === cid) !== undefined);
    };

    // recursive function to resolve a single card
    var resolveCard = function(card){
        
        // add this card to the resolved collection
        if (!isInResolved(card.id)) { resolved.push(card); }

        // if this card has dependencies, resolve those too
        if (card.dependencies) {
            card.dependencies.forEach(function(cid, i){
                
                if (!isInResolved(cid)){
                    var depCard = allCards.find(c => c.id === cid);
                    resolveCard(depCard);
                }
            });
        }
    };

    // resolve each of the given cards
    selectedCards.forEach(function(card, i){
        resolveCard(card);
    });

    return resolved;
}

// given the selected cards, resolve the dependencies by removing cards
function resolveByRemoving(selectedCards){

    // make a copy of the selected cards, we'll remove from here
    var resolved = selectedCards.slice(0);

    // boolean, whether or not the given card id is in the resolved collection
    var isInResolved = function(cid) {
        return (resolved.find(c => c.id === cid) !== undefined);
    };

    // find the given card id in the resolved collection, and remove it
    var removeFromResolved = function(cid){
        var index = resolved.findIndex(c => c.id === cid);
        resolved.splice(index, 1);
    };

    // check each card to see if it's dependencies are missing
    selectedCards.forEach(function(card){

        if (card.dependencies) {

            // check to see if one of this card's dependencies is missing
            var dependencyMissing = card.dependencies.some(cid => !isInResolved(cid));

            // if one of this cards dependencies isn't present, remove this card
            if (dependencyMissing) { removeFromResolved(card.id); }
        }
    });


    // if we removed any cards, resolve again 
    if (selectedCards.length !== resolved.length){
        return resolveByRemoving(resolved);
    }
    else {
        return resolved;
    }

}

export {
    resolveByAdding as byAdding,
    resolveByRemoving as byRemoving
};
