import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { ConfigParams } from 'pip-services-commons-node';
import { IConfigurable } from 'pip-services-commons-node';
import { IReferences } from 'pip-services-commons-node';
import { IReferenceable } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
import { IBeaconsController } from './IBeaconsController';
import { CommandSet } from 'pip-services-commons-node';
import { ICommandable } from 'pip-services-commons-node';
export declare class BeaconsController implements IBeaconsController, IConfigurable, IReferenceable, ICommandable {
    private static _defaultConfig;
    private _persistence;
    private _dependencyResolver;
    private _commandSet;
    configure(config: ConfigParams): void;
    getCommandSet(): CommandSet;
    setReferences(references: IReferences): void;
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconsById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
    calculatePosition(correlationId: string, siteId: string, udis: string[], callback: (err: any, position: any) => void): void;
    createBeacons(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    updateBeacons(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    deleteBeaconsById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}
