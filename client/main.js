import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

/*var doc = document.implementation.createHTMLDocument("New Document");
  var p = doc.createElement("p");
  p.innerHTML = "This is a new paragraph.";

  try {
    doc.body.appendChild(p);
    console.log(doc);
  } catch(e) {
    console.log(e);
  }
*/

var uploader = new ReactiveVar();
var imageDetails = new Mongo.Collection('images'); 
var currentUserId = Meteor.userId();

       Template.imageUploader.events({'change .uploadFile': function(event, template) {

             event.preventDefault();

             var upload = new Slingshot.Upload("s3_example");
             var timeStamp = Math.floor(Date.now());                 
         upload.send(document.getElementById('uploadFile').files[0], function (error, downloadUrl) {
             uploader.set();
             if (error) {
               console.error('Error uploading');
               alert (error);
             }
else{
               console.log("Success!");
               console.log('uploaded file available here: '+downloadUrl);
               imageDetails.insert({
                   imageurl: downloadUrl,
                   time: timeStamp,
                   uploadedBy: currentUserId
               });
             }
             });
             uploader.set(upload);
           }
       });
