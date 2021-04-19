import * as admin from 'firebase-admin'

const serviceAccountObject = {
  type: "service_account",
  project_id: "acdesigns-402c0",
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: process.env.PRIVATE_KEY.replace(/\n/g, '\n'),
  client_email: "firebase-adminsdk-iflxs@acdesigns-402c0.iam.gserviceaccount.com",
  client_id: "117127454562999419222",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iflxs%40acdesigns-402c0.iam.gserviceaccount.com"
}

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccountObject)
})