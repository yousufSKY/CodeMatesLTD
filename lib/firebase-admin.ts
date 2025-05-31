import * as _admin from 'firebase-admin';

function formatPrivateKey(key: string) {
  if (!key) return '';
  const processedKey = key.replace(/\\n/g, '\n');
  if (!processedKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
    return `-----BEGIN PRIVATE KEY-----\n${processedKey}\n-----END PRIVATE KEY-----`;
  }
  return processedKey;
}

function validateEnvVariables() {
  const required = ['FIREBASE_PROJECT_ID', 'FIREBASE_CLIENT_EMAIL', 'FIREBASE_PRIVATE_KEY'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required Firebase Admin environment variables: ${missing.join(', ')}\n` +
      'Please make sure these are configured in your Vercel project settings.'
    );
  }
}

// Initialize admin if it hasn't been initialized
function getAdmin() {
  try {
    if (_admin.apps.length > 0) {
      return _admin;
    }

    validateEnvVariables();

    const privateKey = formatPrivateKey(process.env.FIREBASE_PRIVATE_KEY || '');
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;

    if (!privateKey || !projectId || !clientEmail) {
      throw new Error('Invalid Firebase Admin credentials');
    }

    return _admin.initializeApp({
      credential: _admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error) {
    console.error('Failed to initialize Firebase Admin:', error);
    throw error;
  }
}

// Get admin instance
const admin = getAdmin();

// Export admin instances
export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
