let process = require('process');

import { ConfigParams } from 'pip-services-commons-node';

import { BeaconsMongoDbPersistence } from '../src/persistence/BeaconsMongoDbPersistence';
import { BeaconsPersistenceFixture } from './BeaconsPersistenceFixture';

suite('BeaconsMongoDbPersistence', () => {
    let persistance: BeaconsMongoDbPersistence;
    let fixture: BeaconsPersistenceFixture;
    let mongoUri = process.env['MONGO_URI'];
    let mongoHost = process.env['MONGO_HOST'] || 'localhost';
    let MongoPort = process.env['MONGO_PORT'] || 27017;
    let MongoDatabase = process.env['MONGO_DB'] || 'test';
    if (mongoUri == null && mongoHost == null) return;

    setup((done) => {
        persistance = new BeaconsMongoDbPersistence();
        persistance.configure(ConfigParams.fromTuples(
            'connection.url', mongoUri,
            'connection.host', mongoHost,
            'connection.port', MongoPort,
            'connection.database', MongoDatabase,
        ));

        fixture = new BeaconsPersistenceFixture(persistance);

        persistance.open(null, (err) => {
            if (err) done(err)
            else persistance.clear(null, done);
        })
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