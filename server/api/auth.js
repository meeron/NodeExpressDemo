import appService from '../services/auth.js';
import { unauthorized } from '../exceptions.js';

async function createToken(params, request) {
  const token = await appService.authorize(request.clientId, request.secret);
  if (!token) unauthorized();

  return token;
}

export default function () {
  return [
    { path: '/auth/token', method: 'post', handler: createToken },
  ];
}