import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {CreateDeviceDto} from "../domain/create-device/create-device-dto";


@Schema({timestamps: true})
export class Device {

    @Prop({type: String, required: true})
    ip: string;

    @Prop({type: String, required: true})
    title: string;

    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;

    @Prop({type: String, required: true})
    iat: string;

    @Prop({type: String, required: true})
    userId: string;

    updatedAt: Date


    static createInstance(dto: CreateDeviceDto): DeviceDocument {
        const device = new this();
        device.userId = dto.userId
        device.ip = dto.ip
        device.title = dto.title
        device.iat = dto.iat

        return device as DeviceDocument;
    }


    makeDeleted() {
        this.deletedAt = new Date();
    }

    update(iat: string) {
        this.updatedAt = new Date()
        this.iat = iat
    }


}

export const DeviceSchema = SchemaFactory.createForClass(Device);

DeviceSchema.loadClass(Device);

export type DeviceDocument = HydratedDocument<Device>;

export type DeviceModelType = Model<DeviceDocument> & typeof Device;