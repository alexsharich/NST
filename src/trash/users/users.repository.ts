/*
import {Injectable} from "@nestjs/common";
import {OutputUserType} from "./users.controller";

@Injectable()
export class UsersRepository {
    checkUniqUserWithEmailOrLogin(login: string, email: string) {
        return UserModel.findOne({$or: [{'accountData.userName': login}, {'accountData.email': email}]}).exec()
    }
    createNewUser(newUser) {
        try {
            const createdUser = new UserModel(newUser)
            await createdUser.save()
            return createdUser._id.toString()
        } catch (e) {
            console.log('Create user error : ', e)
            return null
        }
    }
    findUser(id: string) {
        const user = await UserModel.findById(id).exec()
        if (!user) {
            return null
        }
        return mapToOutputUser(user)
    }
    getUsers(query) {
        const pageNumber = query.pageNumber
        const pageSize = query.pageSize
        const sortBy = query.sortBy
        const sortDirection = query.sortDirection === 'asc' ? 1 : -1
        const searchLoginTerm = query.searchLoginTerm
        const searchEmailTerm = query.searchEmailTerm

        let filter: UserFilter = {}

        if (searchLoginTerm || searchEmailTerm) {
            filter = {
                $or: []
            };

            if (searchLoginTerm) {
                filter.$or?.push({login: {$regex: searchLoginTerm, $options: 'i'}});
            }
            if (searchEmailTerm) {
                filter.$or?.push({email: {$regex: searchEmailTerm, $options: 'i'}});
            }
        }

        const sortFilter: SortMongoType = {[sortBy]: sortDirection} as SortMongoType

        const users = await UserModel.find(filter)
            .sort(sortFilter)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec()

        const totalCount = await UserModel.countDocuments(filter).exec()
        return {
            pagesCount: Math.ceil(totalCount / query.pageSize),
            page: query.pageNumber,
            pageSize: query.pageSize,
            totalCount: totalCount,
            items: users.map((user: UserDocument) => mapToOutputUser(user))
        }
    }
    deleteUser(id:string){
        const result =  UserModel.deleteOne({_id: id}).exec()
        return result.deletedCount === 1
    }
}
interface UserFilter {
    $or?: Array<{ [key: string]: any }>
}

const mapToOutputUser = (user: UserDocument): OutputUserType => {
    return {
        id: user._id.toString(),
        login: user.accountData.userName,
        email: user.accountData.email,
        createdAt: user.accountData.createdAt
    }
}
*/
