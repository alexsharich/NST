
import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User, UserDocument, UserModelType} from "../domain/user.entity";

@Injectable()
export class UsersRepository {
    constructor(  @InjectModel(User.name) private readonly userModel:UserModelType){

    }
    async save(user:UserDocument){
        await user.save()
        return user._id.toString()
    }
    async findOne(id:string){
       return this.userModel.findOne({_id:id,deletedAt:null})
    }
}