import * as HTTPStatusCodes from 'http-status-codes';

export const firestoreErrorToHTTP = (
  code: firebase.firestore.FirestoreErrorCode,
): number => {
  switch (code) {
    case 'not-found':
      return HTTPStatusCodes.NOT_FOUND;
    case 'out-of-range':
      return HTTPStatusCodes.BAD_REQUEST;
    case 'unauthenticated':
      return HTTPStatusCodes.UNAUTHORIZED;
    case 'permission-denied':
      return HTTPStatusCodes.FORBIDDEN;
    case 'already-exists':
      return HTTPStatusCodes.CONFLICT;
    case 'resource-exhausted':
      return HTTPStatusCodes.INSUFFICIENT_STORAGE;
    default:
      return HTTPStatusCodes.INTERNAL_SERVER_ERROR;
  }
};
