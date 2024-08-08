import rsync from 'rsync';
import { SyncronizationError } from '../errors/SyncErrors';

import { System } from './System';

////////////////////////////////////////

export type SyncArgs = {
  sourcePath: string;
  destPath: string;

  isDryRun?: boolean;
};

export class Sync {
  static syncronize = async ({ sourcePath, destPath, isDryRun }: SyncArgs) => {
    try {
    } catch (e) {
      console.log(e);
      throw new SyncronizationError(e);
    }
  };
}
