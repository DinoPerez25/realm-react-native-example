import React, { useContext, useState } from "react";
import Realm from "realm";
import app from "../realmApp";
import { Sale, User } from '../schemas'

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);

  const getRealm = async () => {
    if (user) {
      const realmFileBehavior = {
        type: "downloadBeforeOpen",
        timeOut: 1000,
        timeOutBehavior: "openLocalRealm",
      };
      const config = {
        schema: [
          User.schema,
          Sale.schema,
        ],
        sync: {
          user,
          partitionValue: `user=${user?.id}`,
          existingRealmFileBehavior: realmFileBehavior,
          newRealmFileBehavior: realmFileBehavior,
        },
      };
      return Realm.open(config);
    }
  };
  const getLocalRealm = async () => {
    if (user) {
      const config = {
        schema: [
          User.schema,
          Sale.schema,
        ],
      };
      return Realm.open(config);
    }
  };

  const signIn = async (email, password) => {
    const creds = Realm.Credentials.emailPassword(email, password);
    const newUser = await app.logIn(creds);
    setUser(newUser);
  };

  const signUp = async (email, password) => {
    await app.emailPasswordAuth.registerUser({ email, password });
  };

  const signOut = () => {
    if (user == null) {
      console.warn("Not logged in, can't log out!");
      return;
    }
    user.logOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signUp,
        signIn,
        signOut,
        getRealm,
        getLocalRealm,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth == null) {
    throw new Error("useAuth() called outside of a AuthProvider?");
  }
  return auth;
};

export { AuthProvider, useAuth };