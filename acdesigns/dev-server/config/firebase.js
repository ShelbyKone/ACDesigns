import * as admin from 'firebase-admin'

import serviceAccount from './serviceAccountKey.json'

export default admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})