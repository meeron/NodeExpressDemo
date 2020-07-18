import crypto from 'crypto';

class CryptoProvider {
  encryptAes192(payload, key, iv) {
    const cipher = crypto.createCipheriv('aes-192-cbc', key, iv);

    let encrypted = cipher.update(payload, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return encrypted;
  }

  decryptAes192(encryptedPayload, key, iv) {
    const decipher = crypto.createDecipheriv('aes-192-cbc', key, iv);

    let decrypted = decipher.update(encryptedPayload, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }
}

export default new CryptoProvider();