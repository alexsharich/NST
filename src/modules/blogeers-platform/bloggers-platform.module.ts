import {Module} from '@nestjs/common';
import {UserAccountsModule} from '../user-accounts/user-accounts.module';

//тут регистрируем провайдеры всех сущностей блоггерской платформы (blogs, posts, comments, etc...)
@Module({
    imports: [UserAccountsModule],
    providers: [],
    controllers:[]
})
export class BloggersPlatformModule {
}