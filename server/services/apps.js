import dbProvider from '../providers/dbProvider.js';
import crypto from 'crypto';
const { createHash } = crypto;

const COLLECTION = "Apps";

class AppsService {
  async create() {
    const hash = createHash('sha256');

    // Generate app secret
    const appSecret = hash.update(Date.now().toString()).digest('hex');
    const appKey = createHash('md5').update(Date.now().toString()).digest('hex');

    await dbProvider.insert(COLLECTION, {
      _id: appKey,
      secret: createHash('sha256').update(appSecret).digest('hex'),
      createdAtUtc: new Date(),
    });

    return {
      appKey,
      appSecret,
    };
  }
}

export default new AppsService();