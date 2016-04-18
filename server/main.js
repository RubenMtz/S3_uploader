var imageDetails = new Mongo.Collection('images');
Slingshot.fileRestrictions("s3_example", {
  allowedFileTypes: ["image/png", "image/jpeg", "image/gif"],
  maxSize: 10 * 1024 * 1024 // 10 MB (use null for unlimited)
});

	Slingshot.createDirective("s3_example", Slingshot.S3Storage, {
  bucket: "cloudcomputingtest1",
  region: "us-west-2",
  acl: "public-read",

  authorize: function () {
    //Deny uploads if user is not logged in.
    if (!this.userId) {
      var message = "Please login before posting files";
      throw new Meteor.Error("Login Required", message);
    }

    return true;
  },

  key: function(file) {
    //Store file into a directory by the user's username.
    //var user = Meteor.users.findOne(this.userId);
    //return user.username + "/" + file.name;
	return file.name;
  }
});
