import { ConfigParams } from 'pip-services-commons-node';

import { BeaconsMemoryPersistence } from '../src/persistence/BeaconsMemoryPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsMemoryPersistence', () => {
    let persistance: BeaconsMemoryPersistence;
    let fixture: BeaconsPersistenceFixture;

    setup((done) => {
        persistance = new BeaconsMemoryPersistence();
        persistance.configure(new ConfigParams());

        fixture = new BeaconsPersistenceFixture(persistance);


        persistance.open(null, done);
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