export function badRequest(message) {
  throw {
    status: 400,
    message,
  };
}