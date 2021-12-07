import { Address, User, Order } from '../schemas';
import Realm from 'realm';

import app from '../realmApp';

let publicRealm = null;
let privateRealm = null;

const initLocalRealm = async (user) => {
  console.log('user initPublicRealm', user?.id);
  if (user) {
    console.log('ENTRE A initPublicRealm');
    const configuration = {
      schema: [Address.schema],
    };
    publicRealm = await Realm.open(configuration);
    console.log('LLEGUE AQUI');
  }
  return publicRealm;
};

const initPrivateRealm = async (user) => {
  console.log('user initPrivateRealm', user?.id);
  if (user) {
    console.log('ENTRE A initPrivateRealm');
    const OpenRealmBehaviorConfiguration = {
      type: 'openImmediately',
    };
    const config = {
      schema: [User.schema, Order.schema],
      sync: {
        user: app.currentUser,
        partitionValue: `user=${app.currentUser?.id}`,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        error: (error) => console.log(error, 'initPrivateRealm SYNC ERROR'),
      },
    };
    privateRealm = await Realm.open(config).catch((error) =>
      console.log(error, 'initPrivateRealm()')
    );
  }

  return privateRealm;
};

const getPublicRealm = () => publicRealm;
const getPrivateRealm = () => privateRealm;

export { initLocalRealm, initPrivateRealm, getPublicRealm, getPrivateRealm };
