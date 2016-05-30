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

Meteor.isCompanyAdmin = function(){
	var user = Users.findOne(this.userId);
	console.log(user);
	if(user && user.profile && user.profile.cid) {
		var company = Companies.findOne({_id: user.profile.cid});
		console.log(company);
		return company.uid == user._id
	}
};