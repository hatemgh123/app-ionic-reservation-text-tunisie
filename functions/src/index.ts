import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

exports.AdAdminRole = functions.https.onCall((data, context) => {
  //get user add custom claim (admin)
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        messeage: "Success! ${data.email} has been made an admin" + data.email
      };
    })
    .catch(err => {
      return err;
    });
});
