import { Items, Salespeople, Address, User, Sale } from "../schemas";
import Realm from "realm";

import app from "../realmApp";

let publicRealm = null;
let privateRealm = null;

const initPublicRealm = async (user) => {
  console.log('user initPublicRealm', user?.id);
  if (user) {
    console.log('ENTRE A initPublicRealm');
    /*const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };*/
    const configuration = {
      schema: [
        Items.schema,
        Salespeople.schema,
        Address.schema,
      ],
      /*sync: {
        user: app.currentUser,
        partitionValue: `PUBLIC`,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        error: (error) => console.log(error, 'initPublicRealm SYNC ERROR')
      },*/
    };
    publicRealm = await Realm.open(configuration);
    console.log('LLEGUE AQUI')
  }
  return publicRealm;
}

const initPrivateRealm = async (user) => {
  console.log('user initPrivateRealm', user?.id);
  if (user) {
    console.log('ENTRE A initPrivateRealm');
    /*const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };*/
    const config = {
      schema: [
        User.schema,
        Sale.schema,
      ],
      /*sync: {
        user: app.currentUser,
        partitionValue: `user=${app.currentUser?.id}`,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        error: (error) => console.log(error, 'initPrivateRealm SYNC ERROR')
      },*/
    };
    privateRealm = await Realm.open(config).catch((error) => console.log(error, 'initPrivateRealm()'));
  }

  return privateRealm;
}

const getPublicRealm = () => publicRealm;
const getPrivateRealm = () => privateRealm;

export { initPublicRealm, initPrivateRealm, getPublicRealm, getPrivateRealm };

