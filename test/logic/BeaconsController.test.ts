let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { References } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';

import { BeaconsMemoryPersistence } from '../../src/persistence/BeaconsMemoryPersistence';
import { BeaconsController } from '../../src/logic/BeaconsController';

import { BeaconV1 } from '../../src/data/version1/BeaconV1';

let BEACON1: BeaconV1 = {
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

let BEACON2: BeaconV1 = {
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
    let persistance: BeaconsMemoryPersistence;
    let controller: BeaconsController;

    setup((done) => {
        persistance = new BeaconsMemoryPersistence();
        persistance.configure(new ConfigParams());

        controller = new BeaconsController();

        let references = References.fromTuples(
            new Descriptor('tracker-services-beacons', 'persistence', 'memory', 'default', '1.0'), persistance,
            new Descriptor('tracker-services-beacons', 'controller', 'default', 'default', '1.0'), controller
        );
        controller.setReferences(references);
        persistance.open(null, done);
    });

    teardown((done) => {
        persistance.close(null, done);
    });

    test('Test CRUD operation', (done) => {
        let beacon1: BeaconV1;

        async.series([
            (callback) => {
                controller.createBeacons(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON1.udi);
                        assert.equal(beacon.site_id, BEACON1.site_id);
                        assert.equal(beacon.label, BEACON1.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                )
            },
            (callback) => {
                controller.createBeacons(
                    null,
                    BEACON2,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON2.udi);
                        assert.equal(beacon.site_id, BEACON2.site_id);
                        assert.equal(beacon.label, BEACON2.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                )
            },
            (callback) => {
                controller.getBeacons(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);
                        assert.isObject(page);

                        assert.lengthOf(page.data, 2);
                        beacon1 = page.data[0];

                        callback();
                    }
                )
            },
            (callback) => {
                beacon1.label = 'ABC';

                controller.updateBeacons(
                    null,
                    beacon1,
                    (err, beacon) => {
                        assert.isNull(err);
                        assert.isObject(beacon);

                        assert.equal(beacon.id, beacon1.id);
                        assert.equal(beacon.label, 'ABC');

                        callback();
                    }
                )
            },
            (callback) => {
                controller.deleteBeaconsById(
                    null,
                    beacon1.id,
                    (err, beacon) => {
                        assert.isNull(err);
                        assert.isObject(beacon);
                        assert.equal(beacon.id, beacon1.id);
                        callback();
                    }
                )
            },
            (callback) => {
                controller.getBeaconsById(
                    null,
                    beacon1.id,
                    (err, beacon) => {
                        assert.isNull(err);
                        assert.isNull(beacon);

                        callback();
                    }
                )
            }                   
        ], done);
    });

    test('Test GetWithFilters operation', (done) => {
        done();
    });

    test('Calculate Position', (done) => {
        async.series([
            (callback) => {
                controller.createBeacons(
                    null,
                    BEACON1,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON1.udi);
                        assert.equal(beacon.site_id, BEACON1.site_id);
                        assert.equal(beacon.label, BEACON1.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                )
            },
            (callback) => {
                controller.createBeacons(
                    null,
                    BEACON2,
                    (err, beacon) => {
                        assert.isNull(err);

                        assert.isObject(beacon);
                        assert.equal(beacon.udi, BEACON2.udi);
                        assert.equal(beacon.site_id, BEACON2.site_id);
                        assert.equal(beacon.label, BEACON2.label);
                        assert.isNotNull(beacon.center);

                        callback();
                    }
                )
            },
            // calculate position
            (callback) => {
                controller.calculatePosition(
                    null,
                    '1',
                    ['0000001'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');
                        assert.equal(position.coordinates[0], 0);
                        assert.equal(position.coordinates[0], 0);

                        callback();
                    }
                )
            },
            // calculate position 2 item
            (callback) => {
                controller.calculatePosition(
                    null,
                    '1',
                    ['0000001', '0000002'],
                    (err, position) => {
                        assert.isNull(err);

                        assert.isObject(position);
                        assert.equal(position.type, 'Point');
                        assert.equal(position.coordinates[0], 1);
                        assert.equal(position.coordinates[0], 1);

                        callback();
                    }
                )
            }            
        ], done);
    });
})