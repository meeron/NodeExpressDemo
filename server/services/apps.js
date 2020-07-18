import crypto from 'crypto';
import dbProvider from '../providers/dbProvider.js';
import authService from '../services/auth.js';

const COLLECTION = "Apps";

class AppsService {
  async create() {
    const appSecret = crypto.randomBytes(32).toString('hex');
    const appKey = crypto.randomBytes(16).toString('hex');

    await dbProvider.insert(COLLECTION, {
      _id: appKey,
      secret: authService.hashSecret(appSecret),
      createdAtUtc: new Date(),
    });

    return {
      appKey,
      appSecret,
    };
  }
}

export default new AppsService();