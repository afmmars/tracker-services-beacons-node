import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { BeaconsMemoryPersistence } from '../persistence/BeaconsMemoryPersistence';
import { BeaconsFilePersistence } from '../persistence/BeaconsFilePersistence';
import { BeaconsMongoDbPersistence } from '../persistence/BeaconsMongoDbPersistence';
import { BeaconsController } from '../logic/BeaconsController';
import { BeaconsHttpServiceV1 } from '../services/version1/BeaconsHttpServiceV1';

export class BeaconsServiceFactory extends Factory {
    public static MemoryPercistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'memory', '*', '1.0');
    public static FilePercistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'file', '*', '1.0');
    public static MongoDbPercistenceDescriptor = new Descriptor('tracker-services-beacons', 'persistence', 'mongodb', '*', '1.0');
    public static ControllerDescriptor = new Descriptor('tracker-services-beacons', 'controller', 'default', '*', '1.0');
    public static HttpServiceV1Descriptor = new Descriptor('tracker-services-beacons', 'service', 'http', '*', '1.0');

    constructor() {
        super();

        this.registerAsType(BeaconsServiceFactory.MemoryPercistenceDescriptor, BeaconsMemoryPersistence);
        this.registerAsType(BeaconsServiceFactory.FilePercistenceDescriptor, BeaconsFilePersistence);
        this.registerAsType(BeaconsServiceFactory.MongoDbPercistenceDescriptor, BeaconsMongoDbPersistence);
        this.registerAsType(BeaconsServiceFactory.ControllerDescriptor, BeaconsController);
        this.registerAsType(BeaconsServiceFactory.HttpServiceV1Descriptor, BeaconsHttpServiceV1);
    }
}