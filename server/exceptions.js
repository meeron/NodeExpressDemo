export function badRequest(message) {
  throw {
    status: 400,
    message,
  };
}

export function unauthorized() {
  throw {
    status: 401,
    message: 'Unauthorized',
  };
}