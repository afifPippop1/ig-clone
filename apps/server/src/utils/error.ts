import { TRPC_ERROR_CODE_KEY, TRPCError } from '@trpc/server';

export const TRPCErrorCode = Object.freeze({
  INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  BAD_REQUEST: 'BAD_REQUEST',
  FORBIDDEN: 'FORBIDDEN',
  UNAUTHORIZED: 'UNAUTHORIZED',
  CONFLICT: 'CONFLICT',
});

export class TRPCServerError extends TRPCError {
  constructor(code: TRPC_ERROR_CODE_KEY, message: string) {
    super({ code, message });
  }

  static internalError(message: string = 'Internal Server Error') {
    return new TRPCServerError(TRPCErrorCode.INTERNAL_SERVER_ERROR, message);
  }
  static notFound(message: string) {
    return new TRPCServerError(TRPCErrorCode.NOT_FOUND, message);
  }
  static badRequest(message: string) {
    return new TRPCServerError(TRPCErrorCode.BAD_REQUEST, message);
  }
  static forbidden(message: string) {
    return new TRPCServerError(TRPCErrorCode.FORBIDDEN, message);
  }
  static unauthorized(message: string = 'Unauthorized') {
    return new TRPCServerError(TRPCErrorCode.UNAUTHORIZED, message);
  }
  static conflict(message: string) {
    return new TRPCServerError(TRPCErrorCode.CONFLICT, message);
  }
}
