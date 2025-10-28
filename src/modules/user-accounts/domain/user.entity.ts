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

@Schema()
export class EmailConfirmation {
    @Prop({type: String, nullable: true})
    confirmationCode: string | null;

    @Prop({type: Date, nullable: true})
    expirationDate: Date | null;
}

@Schema()
export class PasswordRecovery {
    @Prop({type: String, nullable: true})
    recoveryCode: string | null;

    @Prop({type: Date, nullable: true})
    expirationDate: Date | null;
}

export const ConfirmationSchema = SchemaFactory.createForClass(EmailConfirmation);
export const PasswordRecoverySchema = SchemaFactory.createForClass(PasswordRecovery);

@Schema({timestamps: true})
export class User {
    @Prop({type: String, required: true})
    login: string;

    @Prop({type: String, required: true})
    passwordHash: string;

    @Prop({type: String, min: 5, required: true})
    email: string;

    @Prop({type: Boolean, required: true, default: false})
    isEmailConfirmed: boolean;

    @Prop({type: ConfirmationSchema, nullable: true})
    emailConfirmation: EmailConfirmation | null;

    @Prop({type: PasswordRecoverySchema, nullable: true})
    passwordRecovery: PasswordRecovery | null;

    @Prop({type: Date, nullable: true})
    deletedAt: Date | null;

    createdAt: Date;
    updatedAt: Date;


    static createInstance(dto: CreateUserDomainDto, confirmationCode: string | null, expirationDate: Date | null): UserDocument {
        const user = new this();
        user.email = dto.email;
        user.passwordHash = dto.passwordHash;
        user.login = dto.login;
        user.isEmailConfirmed = false;
        user.emailConfirmation = {
            confirmationCode,
            expirationDate
        }

        return user as UserDocument;
    }

    makeDeleted() {
        this.deletedAt = new Date();
    }

    update({email}: UpdateUserDto) {
        if (email !== this.email) {
            this.email = email;
        }
    }

    setIsConfirmed() {
        this.isEmailConfirmed = true;
    }

    changePassword(passwordHash: string) {
        this.passwordHash = passwordHash;
    }

    updateEmailConfirmationCode(confirmationCode: string, expirationDate: Date) {
        this.emailConfirmation = {
            confirmationCode,
            expirationDate
        }
    }

    setPasswordRecovery(recoveryCode: string, expirationDate: Date) {
        this.passwordRecovery = {
            recoveryCode,
            expirationDate
        }
    }


    updateS(obj: Object) {
        const [key, value] = Object.entries(obj)[0];
        const isValidKey = [
            'id',
            'createdAt',
            'login',
            'email',
            'passwordHash',
            'isEmailConfirmed',
            'deletedAt',
        ].includes(key);

        if (!isValidKey) return;

        this[key] = value;
    }
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.loadClass(User);

export type UserDocument = HydratedDocument<User>;
export type UserModelType = Model<UserDocument> & typeof User;