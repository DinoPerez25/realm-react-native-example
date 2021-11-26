import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import app from "../realmApp";
import { Sale, User } from '../schemas'

const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(app.currentUser);
  const realmRef = useRef(null);

  useEffect(() => {
    if (user) {
      const realmFileBehavior = {
        type: "downloadBeforeOpen",
        timeOut: 1000,
        timeOutBehavior: "openLocalRealm",
      };
      Realm.open({
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
      }).then((userRealm) => {
        console.log('CONNECTION AUTH SUCCESS', user.id)
        realmRef.current = userRealm;
      });
      return () => {
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
        }
      };
    }
  }, [user]);

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