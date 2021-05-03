import {types, flow} from 'mobx-state-tree'
import apiCall from '../api'
console.log('users.js');
const User = types.model('User', {
    id: types.identifier,
    createdAt: types.string,
    name: types.string,
    avatar: types.string,
})

const UserStore = types.model('UserStore', {
    users: types.maybe(types.array(User)),
}).actions(self => {
    return {
        load: flow( function* (){
            self.users = yield apiCall.get('users')
        }),
        afterCreate(){
            self.load()
        }
    }
})

export default UserStore;