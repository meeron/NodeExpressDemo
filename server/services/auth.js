import dbProvider from '../providers/dbProvider.js';
import crypto from 'crypto';
const { createHash } = crypto;

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

        return {
            token: "sample_token"
        };
    }

    hashSecret(secret) {
        return createHash('sha256').update(secret).digest('hex');
    }
}

export default new AuthService();