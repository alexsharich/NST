import {UserDocument} from "./modules/user-accounts/domain/user.entity";

export {};
declare global {
    namespace Express {
        export interface Request {
            user: UserDocument | null
            userId: string | null;
            deviceId: string | null
            deviceExp: string | null
            deviceIat: string | null
        }
    }
}