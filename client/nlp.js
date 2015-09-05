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


Template.languageTools.events({
	'click .highlight-btn': function(e){
		baseString = $('#editor').val();
        baseString = baseString.replace(/\n/g,' --EOL-- ');
        tagify(baseString);
    },

	'click .conversion-btn':function(e){
        baseString = $('#editor').val();
        baseString = baseString.replace(/\n/g,' --EOL-- ');
        var sentences = nlp.pos(baseString).sentences;
        convertedString = "";
        for (sentence in sentences) {
            convertedString = convertedString + sentences[sentence].to_future().text();
        }
        tagify(convertedString);
	},

	'change .highlight-checkbox': function(e){
        
    }
});
