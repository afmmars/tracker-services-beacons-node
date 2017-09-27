let _ = require('lodash');

import { ConfigParams } from 'pip-services-commons-node';
import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { JsonFilePersister } from 'pip-services-data-node';

import { BeaconV1 } from '../data/version1/BeaconV1';
import { BeaconsMemoryPersistence } from './BeaconsMemoryPersistence';

export class BeaconsFilePersistence
    extends BeaconsMemoryPersistence {
        protected _persistence: JsonFilePersister<BeaconV1>;

    constructor(path?: string) {
        super();

        this._persistence = new JsonFilePersister<BeaconV1>(path);
        this._loader = this._persistence;
        this._saver = this._persistence;
    }
    
    public configure(config: ConfigParams): void {
        super.configure(config);
        this._persistence.configure(config);
    }
}