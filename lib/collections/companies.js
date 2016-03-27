Companies = new Mongo.Collection('companies');

/**
 * Companies Collection
 * _id
 * name
 * admin
 */


/**
 * Get your company
 * @returns {company or null if is not logged in}
 */
Meteor.company = function(){
	var uid = Meteor.userId();

	if(!uid) return null;
	return Companies.findOne({ uid });
};

Meteor.companyId = function(){
	var uid = Meteor.userId();

	if(!uid) return null;
	return Companies.findOne({ uid }, { fields: {_id: 1} });
};