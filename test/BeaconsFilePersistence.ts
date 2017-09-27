import { ConfigParams } from 'pip-services-commons-node';

import { BeaconsFilePersistence } from '../src/persistence/BeaconsFilePersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsFilePersistence', () => {
    let persistance: BeaconsFilePersistence;
    let fixture: BeaconsPersistenceFixture;

    setup((done) => {
        persistance = new BeaconsFilePersistence('./data/beacons.tes.json');
        persistance.configure(new ConfigParams());

        fixture = new BeaconsPersistenceFixture(persistance);


        persistance.open(null, () => {
            persistance.clear(null, done);
        });
    });

    teardown((done) => {
        persistance.close(null, done);
    });

    test('Test CRUD operation', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Test GetWithFilters operation', (done) => {
        fixture.testGetWithFilters(done);
    });    
})