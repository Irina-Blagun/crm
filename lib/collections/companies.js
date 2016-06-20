Companies = new Mongo.Collection('companies');

Meteor.company = function(){
	var cid = Meteor.companyId();

	if(!cid) return null;
	return Companies.findOne({ _id: cid });
};

Meteor.isCompanyAdmin = function(){
	var user = Users.findOne(this.userId);
	if(user && user.profile && user.profile.cid) {
		var company = Companies.findOne({_id: user.profile.cid});
		return company.uid == user._id
	}
};