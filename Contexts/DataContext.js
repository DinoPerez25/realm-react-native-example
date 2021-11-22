
import React, { useContext, useState, useRef } from "react";
import Realm from "realm";
import { Items, Salespeople } from '../schemas';
import app from "../realmApp";

const DataContext = React.createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [user] = useState(app.currentUser);
  const realmRef = useRef(null);

  const getObjectValues = (array) => {
    return array.map(item => { return { value: item._id, label: item.name } });
  };

  const syncData = () => {
    console.log('ENTRE', user)
    if (user) {
      Realm.open({
        schema: [Items.schema, Salespeople.schema],
        sync: {
          user,
          partitionValue: 'PUBLIC'
        }
      }).then(async (realm) => {
        console.log(realm.objects('Items'));
        const items = await realm.objects('Items');
        const salespeople = await realm.objects('Salespeople');
        setData({ items: getObjectValues(items), salespeople: getObjectValues(salespeople) });
      }
      );

      return () => {
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
          realmRef.current = null;
        }
      };
    }
  }

  return (
    <DataContext.Provider
      value={{
        syncData,
        data,
        user
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
const useData = () => {
  const data = useContext(DataContext);
  if (data == null) {
    throw new Error("useData() called outside of a DataProvider?");
  }
  return data;
};

export { DataProvider, useData };