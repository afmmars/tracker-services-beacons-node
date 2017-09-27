"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services_data_node_1 = require("pip-services-data-node");
const BeaconsMemoryPersistence_1 = require("./BeaconsMemoryPersistence");
class BeaconsFilePersistence extends BeaconsMemoryPersistence_1.BeaconsMemoryPersistence {
    constructor(path) {
        super();
        this._persistence = new pip_services_data_node_1.JsonFilePersister(path);
        this._loader = this._persistence;
        this._saver = this._persistence;
    }
    configure(config) {
        super.configure(config);
        this._persistence.configure(config);
    }
}
exports.BeaconsFilePersistence = BeaconsFilePersistence;
//# sourceMappingURL=BeaconsFilePersistence.js.map