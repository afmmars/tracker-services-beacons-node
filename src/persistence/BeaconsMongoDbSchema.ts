import { Schema } from 'mongoose';
let Mixed = Schema.Types.Mixed;

export let BeaconsMongoDbSchema = function (collection?: string) {
    collection = collection || 'beacons';

    let schema = new Schema(
        {
            _id: { type: String, unique: true },
            site_id: { type: String, required: true },
            udi: { type: String, required: true },
            label: { type: String, required: false },
            center: { type: String, required: false },
            radius: { type: String, required: false }
        },

        {
            collection: collection,
            autoIndex: true
        }
    );

    // todo
    schema.set('toJSON', {
        transform: function(doc, ret) {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
            
            return ret;
        }
    })

    return schema;
}