"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../src/persistence/BeaconsMemoryPersistence");
const BeaconsPersistenceFixture_1 = require("./BeaconsPersistenceFixture");
suite('BeaconsMemoryPersistence', () => {
    let persistance;
    let fixture;
    setup((done) => {
        persistance = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistance.configure(new pip_services_commons_node_1.ConfigParams());
        fixture = new BeaconsPersistenceFixture_1.BeaconsPersistenceFixture(persistance);
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
});
//# sourceMappingURL=BeaconsMemoryPersistence.test.js.map