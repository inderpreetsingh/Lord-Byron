this.Documents = new Meteor.Collection("documents");

Meteor.methods({
  deleteDocument: function(id) {
    Documents.remove(id);
    if (!this.isSimulation) {
      return ShareJS.model["delete"](id);
    }
  }
});
