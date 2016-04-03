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
	var cid = Meteor.companyId();

	if(!cid) return null;
	return Companies.findOne({ _id: cid });
};