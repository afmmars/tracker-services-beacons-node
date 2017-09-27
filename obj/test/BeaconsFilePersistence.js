"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsFilePersistence_1 = require("../src/persistence/BeaconsFilePersistence");
const BeaconsPersistenceFixture_1 = require("./BeaconsPersistenceFixture");
suite('BeaconsFilePersistence', () => {
    let persistance;
    let fixture;
    setup((done) => {
        persistance = new BeaconsFilePersistence_1.BeaconsFilePersistence('./data/beacons.tes.json');
        persistance.configure(new pip_services_commons_node_1.ConfigParams());
        fixture = new BeaconsPersistenceFixture_1.BeaconsPersistenceFixture(persistance);
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
});
//# sourceMappingURL=BeaconsFilePersistence.js.map