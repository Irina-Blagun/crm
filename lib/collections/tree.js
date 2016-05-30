Tree = new Mongo.Collection('tree');

Meteor.methods({
	'category-create': function(data, sid, callback) {
		Tree.insert({
			parent: data.parent,
			text: data.node.text,
			sid: sid
		});
	},
	'category-rename': function(data, callback) {
		Tree.update({ _id: data.node.id }, {$set: { text: data.text }});
	},
	'category-remove': function(id, callback) {
		Tree.remove(id);
	},
	'category-move': function(data){
		Tree.update({ _id: data.node.id }, {$set: { parent: data.parent }})
	}
});