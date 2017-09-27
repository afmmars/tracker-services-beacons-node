import { Factory } from 'pip-services-commons-node';
import { Descriptor } from 'pip-services-commons-node';
export declare class BeaconsServiceFactory extends Factory {
    static MemoryPercistenceDescriptor: Descriptor;
    static FilePercistenceDescriptor: Descriptor;
    static MongoDbPercistenceDescriptor: Descriptor;
    static ControllerDescriptor: Descriptor;
    static HttpServiceV1Descriptor: Descriptor;
    constructor();
}
