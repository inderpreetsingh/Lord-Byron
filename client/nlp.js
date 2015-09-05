Template.languageTools.events({
	'click .highlight-btn': function(e){
		$(".highlight-form").css("display", "block");
		e.preventDefault();
	},

	'change #editor':function(e){
		
	},

	'change .highlight-checkbox': function(e){
		partsOfSpeech = [];
		$("input:checkbox[name=speech]:checked").each(function(){
   			partsOfSpeech.push($(this).val());
		});
		console.log(partsOfSpeech);
		var sentence = nlp.pos($('#editor').val()).sentences[0];
		console.log(sentence);
		for(var i in partsOfSpeech){
			if(partsOfSpeech[i] == "Verb"){
				verbsFound = sentence.verbs();
				console.log(verbsFound);
				for(var j in verbsFound){
					$("#editor:contains("+ verbsFound[j].text + "')").css("color", "red");
				}
			}
		}
	}
});
