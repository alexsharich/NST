import {Injectable} from "@nestjs/common";

@Injectable()
export class UsersRepository {
    findUsers(term) {
        return [{id: 1, name: 'Alex'}, {
            id: 2,
            name: 'Viktor'
        }].filter(u => !term || u.name.indexOf(term) > -1)
    }
}