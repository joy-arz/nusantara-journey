import admin from "firebase-admin";

if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    admin.initializeApp({
      credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
    });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    admin.initializeApp();
  } else {
    console.warn(
      "Firebase Admin: No credentials found. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY, or GOOGLE_APPLICATION_CREDENTIALS."
    );
    admin.initializeApp();
  }
}

export const firebaseAuth = admin.auth();
export default admin;
