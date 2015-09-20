var KeyGen = module.exports = {

	keys: [],


	genIt: function(){
		var key = KeyGen.checkKey(KeyGen.keyGenerator());
		return key; 
	},

	checkKey: function(key){
		if (KeyGen.keys[key] === undefined){
			KeyGen.keys[key] = 1;
			return key;
		}else{
			key = KeyGen.keyGenerator();
			KeyGen.checkKey(key);
		}
	},

	keyGenerator: function(array,idLengh){
		var array = array || '';
		var idLength = idLength || 20;
		var baseKey = { 
			'1': '0123456789',
			'2': 'abcdefghijklmnopqrstuvwxyz',
			'3': 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			'4': '_-/*+#!%$£:;?,§=|~&'
		}
		var alpha = '';
		if (array !== ''){
			for (var i = 0; i < array.length; i++){
				console.log(baseKey[array[i]]);
				alpha += baseKey[array[i]];
			}
		}else{
			alpha = baseKey[1] + baseKey[2] + baseKey[3] + baseKey[4]
		}
		var table = [];
		var key ='';
		for(var letter in alpha){
			table.push(alpha[letter]);
		}
		table = KeyGen.shuffle(table);
		var j = 0;
		for (var i = 0; i < idLength; i++){
			j = j < table.length ? j : 0;
			key += table[j];
			j++
		}
		key = KeyGen.checkKey(key);
		return key;
	},

	shuffle: function(array) {
	  var currentIndex = array.length;
	  var temporaryValue;
	  var randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

  return array;
}
}