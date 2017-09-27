"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let Mixed = mongoose_1.Schema.Types.Mixed;
exports.BeaconsMongoDbSchema = function (collection) {
    collection = collection || 'beacons';
    let schema = new mongoose_1.Schema({
        _id: { type: String, unique: true },
        site_id: { type: String, required: true },
        udi: { type: String, required: true },
        label: { type: String, required: false },
        center: { type: String, required: false },
        radius: { type: String, required: false }
    }, {
        collection: collection,
        autoIndex: true
    });
    // todo
    schema.set('toJSON', {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            return ret;
        }
    });
    return schema;
};
//# sourceMappingURL=BeaconsMongoDbSchema.js.map