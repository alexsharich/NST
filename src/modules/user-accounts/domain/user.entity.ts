import {Schema, Prop, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument, Model} from 'mongoose';
import {UpdateUserDto} from '../dto/create-user.dto';
import {CreateUserDomainDto} from './dto/create-user.domain.dto';

export const loginConstraints = {
    minLength: 3,
    maxLength: 10,
};

export const passwordConstraints = {
    minLength: 6,
    maxLength: 20,
};
export const emailConstraints = {
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
};


@Schema({timestamps: true})
export class User {
    @Prop({type: String, required: true})
    login: string;

    @Prop({type: String, required: true})
    passwordHash: string;


    @Prop({type: String, min: 5, required: true})
    email: string;


    /*  @Prop({ type: Boolean, required: true, default: false })
      isEmailConfirmed: boolean;*/


    createdAt: Date;
    updatedAt: Date;


    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;


    get id() {
        // @ts-ignore
        return this._id.toString();
    }

    static createInstance(dto: CreateUserDomainDto): UserDocument {
        const user = new this();
        user.email = dto.email;
        user.passwordHash = dto.passwordHash;
        user.login = dto.login;
        //user.isEmailConfirmed = false; // пользователь ВСЕГДА должен после регистрации подтверждить свой Email
        return user as UserDocument;
    }

    makeDeleted() {
        this.deletedAt = new Date();
    }

    update(dto: UpdateUserDto) {
        if (dto.email !== this.email) {
            // this.isEmailConfirmed = false;
            this.email = dto.email;
        }
    }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;

export type UserModelType = Model<UserDocument> & typeof User;