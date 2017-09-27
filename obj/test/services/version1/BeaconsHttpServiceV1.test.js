"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../../src/logic/BeaconsController");
const BeaconsHttpServiceV1_1 = require("../../../src/services/version1/BeaconsHttpServiceV1");
let BEACON1 = {
    id: '1',
    site_id: '1',
    udi: '0000001',
    label: 'TestBeacon1',
    center: {
        type: 'Point',
        coordinates: [0, 0]
    },
    radius: 50
};
let BEACON2 = {
    id: '2',
    site_id: '1',
    udi: '0000002',
    label: 'TestBeacon2',
    center: {
        type: 'Point',
        coordinates: [2, 2]
    },
    radius: 50
};
suite('BeaconsHttpServiceV1', () => {
    let persistance;
    let controller;
    let service;
    let rest;
    suiteSetup((done) => {
        persistance = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistance.configure(new pip_services_commons_node_1.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        service = new BeaconsHttpServiceV1_1.BeaconsHttpServiceV1();
        service.configure(pip_services_commons_node_1.ConfigParams.fromTuples('connection.protocol', 'http', 'connection.host', 'localhost', 'connection.port', '3000'));
        let references = pip_services_commons_node_2.References.fromTuples(new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistance, new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'controller', 'default', 'default', '1.0'), controller, new pip_services_commons_node_3.Descriptor('tracker-services-beacons', 'service', 'http', 'default', '1.0'), service);
        controller.setReferences(references);
        service.setReferences(references);
        service.open(null, done);
    });
    suiteTeardown((done) => {
        service.close(null, done);
    });
    setup((done) => {
        let url = "http://localhost:3000";
        rest = restify.createJsonClient({ url: url, version: "*" });
        persistance.clear(null, done);
    });
    test('Test CRUD operation', (done) => {
        let beacon1;
        async.series([
            (callback) => {
                rest.post('/beacons/create_beacon', {
                    beacon: BEACON1
                }, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            (callback) => {
                rest.post('beacons/create_beacon', {
                    beacon: BEACON2
                }, (err, req, res, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
        ], done);
    });
    // test('Test GetWithFilters operation', (done) => {
    //     done();
    // });
    // test('Calculate Position', (done) => {
    //     async.series([
    //         (callback) => {
    //             controller.createBeacons(
    //                 null,
    //                 BEACON1,
    //                 (err, beacon) => {
    //                     assert.isNull(err);
    //                     assert.isObject(beacon);
    //                     assert.equal(beacon.udi, BEACON1.udi);
    //                     assert.equal(beacon.site_id, BEACON1.site_id);
    //                     assert.equal(beacon.label, BEACON1.label);
    //                     assert.isNotNull(beacon.center);
    //                     callback();
    //                 }
    //             )
    //         },
    //         (callback) => {
    //             controller.createBeacons(
    //                 null,
    //                 BEACON2,
    //                 (err, beacon) => {
    //                     assert.isNull(err);
    //                     assert.isObject(beacon);
    //                     assert.equal(beacon.udi, BEACON2.udi);
    //                     assert.equal(beacon.site_id, BEACON2.site_id);
    //                     assert.equal(beacon.label, BEACON2.label);
    //                     assert.isNotNull(beacon.center);
    //                     callback();
    //                 }
    //             )
    //         },
    //         // calculate position
    //         (callback) => {
    //             controller.calculatePosition(
    //                 null,
    //                 '1',
    //                 ['0000001'],
    //                 (err, position) => {
    //                     assert.isNull(err);
    //                     assert.isObject(position);
    //                     assert.equal(position.type, 'Point');
    //                     assert.equal(position.coordinates[0], 0);
    //                     assert.equal(position.coordinates[0], 0);
    //                     callback();
    //                 }
    //             )
    //         },
    //         // calculate position 2 item
    //         (callback) => {
    //             controller.calculatePosition(
    //                 null,
    //                 '1',
    //                 ['0000001', '0000002'],
    //                 (err, position) => {
    //                     assert.isNull(err);
    //                     assert.isObject(position);
    //                     assert.equal(position.type, 'Point');
    //                     assert.equal(position.coordinates[0], 1);
    //                     assert.equal(position.coordinates[0], 1);
    //                     callback();
    //                 }
    //             )
    //         }
    //     ], done);
    // });
});
//# sourceMappingURL=BeaconsHttpServiceV1.test.js.map