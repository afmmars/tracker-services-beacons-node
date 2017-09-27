"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;
let restify = require('restify');
const pip_services_commons_node_1 = require("pip-services-commons-node");
const BeaconsLambdaFunction_1 = require("../../src/container/BeaconsLambdaFunction");
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
suite('BeaconsLambdaFunction', () => {
    let lambda;
    suiteSetup((done) => {
        lambda = new BeaconsLambdaFunction_1.BeaconsLambdaFunctions();
        lambda.configure(pip_services_commons_node_1.ConfigParams.fromTuples('logger.descriptor', 'pip-services-commons:logger:console:default:1.0', 'persistence.descriptor', 'tracker-services-beacons:persistence:memory:default:1.0', 'controller.descriptor', 'tracker-services-beacons:controller:default:default:1.0'));
        lambda.open(null, done);
    });
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    test('Test CRUD operation', (done) => {
        let beacon1;
        async.series([
            (callback) => {
                lambda.act({
                    role: 'beacons',
                    cmd: 'create_beacon',
                    beacon: BEACON1
                }, (err, beacon) => {
                    assert.isNull(err);
                    assert.isObject(beacon);
                    assert.equal(beacon.udi, BEACON1.udi);
                    assert.equal(beacon.site_id, BEACON1.site_id);
                    assert.equal(beacon.label, BEACON1.label);
                    assert.isNotNull(beacon.center);
                    callback();
                });
            }
            // (callback) => {
            //     rest.post('beacons/create_beacon',
            //         {
            //             beacon: beacon1
            //         },
            //         (err, req, res, beacon) => {
            //             assert.isNull(err);
            //             assert.isObject(beacon);
            //             assert.equal(beacon.udi, BEACON2.udi);
            //             assert.equal(beacon.site_id, BEACON2.site_id);
            //             assert.equal(beacon.label, BEACON2.label);
            //             assert.isNotNull(beacon.center);
            //             callback();
            //         }
            //     )
            // },
            // (callback) => {
            //     rest.post('beacons/get_beacons',
            //         {},
            //         (err, req, res, page) => {
            //             assert.isNull(err);
            //             assert.isObject(page);
            //             assert.lengthOf(page.data, 2);
            //             beacon1 = page.data[0];
            //             callback();
            //         }
            //     )
            // },
            // (callback) => {
            //     beacon1.label = 'ABC';
            //     rest.post('beacons/update_beacons',
            //         {
            //             beacon: beacon1
            //         },
            //         (err, req, res, beacon) => {
            //             assert.isNull(err);
            //             assert.isObject(beacon);
            //             assert.equal(beacon.id, beacon1.id);
            //             assert.equal(beacon.label, 'ABC');
            //             callback();
            //         }
            //     )
            // },
            // (callback) => {
            //     rest.post('beacons/delete_beacon_by_id',
            //         {
            //             beacon_id: beacon1.id
            //         },
            //         (err, req, res, beacon) => {
            //             assert.isNull(err);
            //             assert.isObject(beacon);
            //             assert.equal(beacon.id, beacon1.id);
            //             callback();
            //         }
            //     )
            // },
            // (callback) => {
            //     rest.post('beacons/get_beacon_by_id',
            //         {
            //             beacon_id: beacon1.id
            //         },
            //         (err, req, res, beacon) => {
            //             assert.isNull(err);
            //             // assert.isNull(beacon);
            //             callback();
            //         }
            //     )
            // }
        ], done);
    });
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
//# sourceMappingURL=BeaconsLambdaFunctions.test.js.map