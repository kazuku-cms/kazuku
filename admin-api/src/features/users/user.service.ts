import {User} from '@kazuku-cms/common';
import {Db} from 'mongodb';

import {GenericApiService} from '#common/services/generic-api.service';

// todo: determine if I need this UserService. Does AuthService take care of everything?
export class UserService extends GenericApiService<User> {
  constructor(db: Db) {
    super(db, 'users', 'user');
  }

  transformList(users: User[]) {
    super.transformList(users);
    return users.map((user) => {
      User.cleanUser(user);
      return user;
    });
  }

  transformSingle(user: User) {
    super.transformSingle(user);
    User.cleanUser(user);
    return user;
  }
}
