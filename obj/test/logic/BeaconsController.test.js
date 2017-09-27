"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
const pip_services_commons_node_1 = require("pip-services-commons-node");
const pip_services_commons_node_2 = require("pip-services-commons-node");
const pip_services_commons_node_3 = require("pip-services-commons-node");
const pip_services_commons_node_4 = require("pip-services-commons-node");
const pip_services_commons_node_5 = require("pip-services-commons-node");
const BeaconsMemoryPersistence_1 = require("../../src/persistence/BeaconsMemoryPersistence");
const BeaconsController_1 = require("../../src/logic/BeaconsController");
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
suite('BeaconsController', () => {
    let persistance;
    let controller;
    setup((done) => {
        persistance = new BeaconsMemoryPersistence_1.BeaconsMemoryPersistence();
        persistance.configure(new pip_services_commons_node_3.ConfigParams());
        controller = new BeaconsController_1.BeaconsController();
        let references = pip_services_commons_node_4.References.fromTuples(new pip_services_commons_node_5.Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistance, new pip_services_commons_node_5.Descriptor('tracker-services-beacons', 'controller', 'default', 'default', '1.0'), controller);
        controller.setReferences(references);
        persistance.open(null, done);
    });
    teardown((done) => {
        persistance.close(null, done);
    });
    test('Test CRUD operation', (done) => {
        let beacon1;
        async.series([
            (callback) => {
                controller.createBeacons(null, BEACON1, (err, beacon) => {
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
                controller.createBeacons(null, BEACON2, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON2.udi);
                    assert.equal(beacon.site_id, BEACON2.site_id);
                    assert.equal(beacon.label, BEACON2.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            },
            (callback) => {
                controller.getBeacons(null, new pip_services_commons_node_1.FilterParams(), new pip_services_commons_node_2.PagingParams(), (err, page) => {
                    assert.isNull(err);
                    assert.isObject(page);
                    assert.lengthOf(page.data, 2);
                    beacon1 = page.data[0];
                    callback();
                });
            },
            (callback) => {
                beacon1.label = 'ABC';
                controller.updateBeacons(null, beacon1, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    assert.equal(beacon.label, 'ABC');
                    callback();
                });
            },
            (callback) => {
                controller.deleteBeaconsById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.id, beacon1.id);
                    callback();
                });
            },
            (callback) => {
                controller.getBeaconsById(null, beacon1.id, (err, beacon) => {
                    assert.isNull(err);
                    assert.isNull(beacon);
                    callback();
                });
            }
        ], done);
    });
    test('Test GetWithFilters operation', (done) => {
        done();
    });
    test('Calculate Position', (done) => {
        async.series([
            (callback) => {
                controller.createBeacons(null, BEACON1, (err, beacon) => {
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
                controller.createBeacons(null, BEACON2, (err, beacon) => {
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
});
//# sourceMappingURL=BeaconsController.test.js.map