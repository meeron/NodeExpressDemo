import dbProvider from '../providers/dbProvider.js';
import crypto from 'crypto';
import cryptoProvider from '../providers/cryptoProvider.js';

const COLLECTION = "Apps";

class AuthService {
    async authorize(appId, secret) {
        const app = await dbProvider.getById(COLLECTION, appId);
        if (!app) {
            return null;
        }

        if (app.secret !== this.hashSecret(secret)) {
            return null;
        }

        const payload = {
            app: appId,
            expiresAt: Date.now() + 3600000, // In 1h
        };
        const payloadJson = JSON.stringify(payload);

        const authKey = Buffer.from(process.env.NodeExpressDemo_AuthKey, 'hex');
        const iv = crypto.randomBytes(16);

        const encryptedPayload = cryptoProvider.encryptAes192(payloadJson, authKey, iv);

        return {
            token: iv.toString('hex') + encryptedPayload,
        };
    }

    hashSecret(secret) {
        return crypto.createHash('sha256').update(secret).digest('hex');
    }
}

export default new AuthService();