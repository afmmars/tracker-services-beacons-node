import { IReferences } from 'pip-services-commons-node';
import { ProcessContainer } from 'pip-services-container-node';

import { BeaconsServiceFactory } from '../build/BeaconsServiceFactory';

export class BeaconsProcess extends ProcessContainer {
    public constructor() {
        super('beacons', 'Beacons positioning microservice');
        this._factories.add(new BeaconsServiceFactory());
    }
}
