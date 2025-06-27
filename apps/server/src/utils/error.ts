import { TRPC_ERROR_CODE_KEY, TRPCError } from '@trpc/server';

export class TRPCServerError extends TRPCError {
  constructor(code: TRPC_ERROR_CODE_KEY, message: string) {
    super({ code, message });
  }

  static internalError(message: string) {
    return new TRPCServerError('INTERNAL_SERVER_ERROR', message);
  }
  static notFound(message: string) {
    return new TRPCServerError('NOT_FOUND', message);
  }
  static badRequest(message: string) {
    return new TRPCServerError('BAD_REQUEST', message);
  }
  static forbidden(message: string) {
    return new TRPCServerError('FORBIDDEN', message);
  }
  static unauthorized(message: string) {
    return new TRPCServerError('UNAUTHORIZED', message);
  }
  static conflict(message: string) {
    return new TRPCServerError('CONFLICT', message);
  }
}
