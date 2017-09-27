import { IBeaconsPersistence } from '../src/persistence/IBeaconsPersistence';
export declare class BeaconsPersistenceFixture {
    private _persistence;
    constructor(persistence: IBeaconsPersistence);
    private testCreateBeacons(done);
    testCrudOperations(done: any): void;
    testGetWithFilters(done: any): void;
}
