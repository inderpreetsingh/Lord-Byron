/**
This converts the strings into spans, so that we can style each word differently
*/
var tagify = function(baseString) {
        ourString = baseString.replace(/--EOL--/g,'</p><p>');
        ourWords = ourString.split(" ");
        ourTagsArray = nlp.pos(ourString, {dont_combine:true}).tags();
        ourHTML = [];
        var i = 0;
        var ourTags = [];
        
        for (tag in ourTagsArray) {
           ourTags = ourTags.concat(ourTagsArray[tag]);
        }
    
        var singleHTML = "<p>";
    
        for (w in ourWords) {
            word = ourWords[w];
            
          singleHTML = singleHTML + '<span  class="the-word inactive '+ ourTags[i] + '" >' + word + ' </span>';
            
            console.log(singleHTML);
            i = i+1;
        }
    
        singleHTML = singleHTML + "</p>";
        $('.the-text').html(singleHTML);
}


var highlight = function(){
	adjective = [ "JJ", "JJR", "JJS"];
	verb = ["VB", "VBD", "VBN", "VBP", "VBZ", "VBF", "CP", "VBG"];
	adverb = ["RB", "RBR", "RBS"];
	noun = ["NN", "NNP", "NNPA", "NNAB", "NNPS", "NNS", "NNO", "NG"];
	pronoun = ["PRP", "PP"];

	for(var i in checkedPOS){
		if(checkedPOS[i] == "adjective"){
			for(var i in adjective){
				$('.'+adjective[i]).removeClass('inactive');
			}
		} else if(checkedPOS[i] == "noun"){
			for(var i in noun){
				$('.'+noun[i]).removeClass('inactive');
			}

		} else if(checkedPOS[i] == "adverb"){
			for(var i in adverb){
				$('.'+adverb[i]).removeClass('inactive');
			}

		} else if(checkedPOS[i] == "verb"){
			for(var i in verb){
				$('.'+verb[i]).removeClass('inactive');
			}

		} else if(checkedPOS[i] == "pronoun"){
			for(var i in pronoun){
				$('.'+pronoun[i]).removeClass('inactive');
			}

		}
	}
}

Template.languageTools.events({
	'click .highlight-btn': function(e){
		console.log("kithe aa bai");
		baseString = $('#editor').val();
        	baseString = baseString.replace(/\n/g,' --EOL-- ');
        	tagify(baseString);
	},

	'click .future-btn':function(e){
        	baseString = $('#editor').val();
                baseString = baseString.replace(/\n/g,' --EOL-- ');
                var sentences = nlp.pos(baseString).sentences;
                convertedString = "";
                for (sentence in sentences) {
                    convertedString = convertedString + sentences[sentence].to_future().text();
                }
                tagify(convertedString);
	},

	'click .past-btn':function(e){
        	baseString = $('#editor').val();
                baseString = baseString.replace(/\n/g,' --EOL-- ');
                var sentences = nlp.pos(baseString).sentences;
                convertedString = "";
                for (sentence in sentences) {
                    convertedString = convertedString + sentences[sentence].to_past().text();
                }
                tagify(convertedString);
	},

	'click .present-btn':function(e){
        	baseString = $('#editor').val();
                baseString = baseString.replace(/\n/g,' --EOL-- ');
                var sentences = nlp.pos(baseString).sentences;
                convertedString = "";
                for (sentence in sentences) {
                    convertedString = convertedString + sentences[sentence].to_present().text();
                }
                tagify(convertedString);
	},

	'click .onoffswitch-checkbox': function(e){
        	checkedPOS = [];
		switchesOn = $("input:checkbox[name='onoffswitch']:checked");
		switchesOn.each(function(){
			checkedPOS.push($(this).val());
		});
		highlight();
	}
		
});
