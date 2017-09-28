"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let process = require('process');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsMongoDbPersistence_1 = require("../src/persistence/BeaconsMongoDbPersistence");
const BeaconsPersistenceFixture_1 = require("./BeaconsPersistenceFixture");
suite('BeaconsMongoDbPersistence', () => {
    let persistance;
    let fixture;
    let mongoUri = process.env['MONGO_SERVICE_URI'];
    let mongoHost = process.env['MONGO_SERVICE_HOST'] || 'localhost';
    let MongoPort = process.env['MONGO_SERVICE_PORT'] || 27017;
    let MongoDatabase = process.env['MONGO_SERVICE_DB'] || 'test';
    if (mongoUri == '' && mongoHost == '')
        return;
    setup((done) => {
        persistance = new BeaconsMongoDbPersistence_1.BeaconsMongoDbPersistence();
        persistance.configure(pip_services_commons_node_1.ConfigParams.fromTuples('connection.url', mongoUri, 'connection.host', mongoHost, 'connection.port', MongoPort, 'connection.database', MongoDatabase));
        fixture = new BeaconsPersistenceFixture_1.BeaconsPersistenceFixture(persistance);
        persistance.open(null, (err) => {
            if (err)
                done(err);
            else
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
});
//# sourceMappingURL=BeaconsMongoDbPersistence.test.js.map