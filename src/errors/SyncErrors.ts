import { CatchableError } from './CatchableError';

////////////////////////////////////////

export class SyncronizationError extends CatchableError {
  constructor(error?: any) {
    super(`An error occured during syncronization`, error);
  }
}
