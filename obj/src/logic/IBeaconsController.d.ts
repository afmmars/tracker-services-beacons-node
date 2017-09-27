import { FilterParams } from 'pip-services-commons-node';
import { PagingParams } from 'pip-services-commons-node';
import { DataPage } from 'pip-services-commons-node';
import { BeaconV1 } from '../data/version1/BeaconV1';
export interface IBeaconsController {
    getBeacons(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<BeaconV1>) => void): void;
    getBeaconsById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
    calculatePosition(correlationId: string, siteId: string, ids: string[], callback: (err: any, item: BeaconV1) => void): void;
    createBeacons(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    updateBeacons(correlationId: string, item: BeaconV1, callback: (err: any, item: BeaconV1) => void): void;
    deleteBeaconsById(correlationId: string, id: string, callback: (err: any, item: BeaconV1) => void): void;
}
