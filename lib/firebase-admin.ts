import * as _admin from 'firebase-admin';

function formatPrivateKey(key: string) {
  const processedKey = key.replace(/\\n/g, '\n');
  if (!processedKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
    return `-----BEGIN PRIVATE KEY-----\n${processedKey}\n-----END PRIVATE KEY-----`;
  }
  return processedKey;
}

// Initialize admin if it hasn't been initialized
function getAdmin() {
  if (_admin.apps.length > 0) {
    return _admin;
  }

  const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY || '');

  return _admin.initializeApp({
    credential: _admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: privateKey,
    }),
  });
}

// Get admin instance
const admin = getAdmin();

// Export admin instances
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
