Template.docList.helpers({
  documents: function() {
    return Documents.find();
  }
});

Template.docList.events = {
  "click button": function() {
    return Documents.insert({
      title: "Lord Byron"
    }, function(err, id) {
      if (!id) {
        return;
      }
      return Session.set("document", id);
    });
  }
};

Template.docItem.helpers({
  current: function() {
    return Session.equals("document", this._id);
  }
});

Template.docItem.events = {
  "click a": function(e) {
    e.preventDefault();
    return Session.set("document", this._id);
  }
};

Session.setDefault("editorType", "textarea");

Template.docTitle.helpers({
  title: function() {
    var ref;
    return (ref = Documents.findOne(this + "")) != null ? ref.title : void 0;
  }
});

Template.editor.helpers({
  docid: function() {
    return Session.get("document");
  }
});

Template.editor.events = {
  "keydown input[name=title]": function(e) {
    var id;
    if (e.keyCode !== 13) {
      return;
    }
    e.preventDefault();
    $(e.target).blur();
    id = Session.get("document");
    return Documents.update(id, {
      title: e.target.value
    });
  },
  "click button": function(e) {
    var id;
    e.preventDefault();
    id = Session.get("document");
    Session.set("document", null);
    return Meteor.call("deleteDocument", id);
  },
  "input #editor": function(e) {
     text = $("#editor").val();
      console.log(text);
  },
};

Template.editor.helpers({
  textarea: function() {
    return Session.equals("editorType", "textarea");
  }
});

Template.editor.rendered = function() {
 /*setInterval(function(){
     $(".the-text").html(" ");
      text = $("#editor").val();
      $(".the-text").html(text);
 }, 100);*/
}