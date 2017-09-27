let _ = require('lodash');
let async = require('async');

import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DependencyResolver } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsController } from './IBeaconsController';
import { IBeaconsPersistence } from '../persistence/IBeaconsPersistence';
import { IdGenerator } from 'pip-services-commons-node';
import { CommandSet } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
import { BeaconsCommandSet } from './BeaconsCommandSet';

export class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig = ConfigParams.fromTuples(
        'dependencies.persistence', 'tracker-services-beacons:persistence:*:*:1.0'
    )
    private _persistence: IBeaconsPersistence;
    private _dependencyResolver: DependencyResolver = new DependencyResolver(BeaconsController._defaultConfig);
    private _commandSet: CommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null) {
            this._commandSet = new BeaconsCommandSet(this);
        }
        return this._commandSet;
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<IBeaconsPersistence>('persistence');
    }

    public getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams,
        callback: (err: any, page: DataPage<BeaconV1>) => void): void {

        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getBeaconsById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {

        this._persistence.getOneById(correlationId, id, callback);
    }

    public calculatePosition(correlationId: string, siteId: string, udis: string[],
        callback: (err: any, position: any) => void): void {

        let beacons: BeaconV1[];
        let position: any = null;

        async.series([
            (callback) => {
                this._persistence.getPageByFilter(
                    correlationId,
                    FilterParams.fromTuples(
                        'site_id', siteId,
                        'udis', udis
                    ),
                    null,
                    (err, page) => {
                        beacons = page ? page.data : null;
                        callback(err);
                    }
                )
            },
            // calculate position
            (callback) => {
                let lat = 0;
                let long = 0;
                let count = 0;

                for (let beacon of beacons) {
                    if (beacon.center && beacon.center.type == 'Point' && _.isArray(beacon.center.coordinates)) {
                        long += beacon.center.coordinates[0];
                        lat += beacon.center.coordinates[1];
                        count += 1;
                    }
                }

                if (count > 0) {
                    position = {
                        type: 'Point',
                        coordinates: [long / count, lat / count]
                    }
                }

                callback();
            },
        ],
            (err) => {
                callback(err, err == null ? position : null)
            })
    }

    public createBeacons(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {

        item.id = item.id || IdGenerator.nextLong();
        this._persistence.create(correlationId, item, callback);
    }

    public updateBeacons(correlationId: string, item: BeaconV1,
        callback: (err: any, item: BeaconV1) => void): void {

        this._persistence.update(correlationId, item, callback);
    }

    public deleteBeaconsById(correlationId: string, id: string,
        callback: (err: any, item: BeaconV1) => void): void {

        this._persistence.deleteById(correlationId, id, callback);
    }
}