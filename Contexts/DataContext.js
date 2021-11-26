
import React, { useContext, useState, useRef, useEffect } from "react";
import Realm from "realm";
import { Items, Salespeople } from '../schemas';
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";

const DataContext = React.createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { user } = useAuth();
  const realmRef = useRef(null);

  const getObjectValues = (array) => {
    return array.map(item => { return JSON.parse(JSON.stringify(item)) });
  };

  const getSelectOptions = (array) => {
    return array.map(item => { return { value: item._id, label: item.name } });
  };

  const findNameById = (id, key) => {
    if (data[key]) {
      const list = data[key];
      console.log(list);
      const result = list.find(item => item._id === id);
      return result.name;
    }
    Alert.alert('Error', `Datos de ${key} no encontrados, favor actualizar`);
  };

  useEffect(() => {
    console.log('user in data', user?.id);
    if (user) {
      console.log('EXTABLECIENCO CONEXION PARA DATA');
      Realm.open({
        schema: [Items.schema, Salespeople.schema],
        sync: {
          user: user,
          partitionValue: `PUBLIC`,
        },
      }).then((realm) => {
        realmRef.current = realm;
        console.log('CARGANDO DATA...');
        const items = getObjectValues(realm.objects('Items'));
        const salespeople = getObjectValues(realm.objects('Salespeople'));
        setData({
          items: getObjectValues(items),
          itemsOptions: getSelectOptions(items),
          salespeople: getObjectValues(salespeople),
          salespeopleOptions: getSelectOptions(salespeople),

        });
        console.log('DATA CARGADA EXITOSAMENTE');
      }).catch(error => {
        Alert.alert('Error', error);
      });
    }
  }, [user]);

  /*const syncData = () => {
    const dataRealm = realmRef.current;
    const items = getObjectValues(dataRealm.objects('Items'));
    const salespeople = getObjectValues(dataRealm.objects('Salespeople'));
    setData({
      items: getObjectValues(items),
      itemsOptions: getSelectOptions(items),
      salespeople: getObjectValues(salespeople),
      salespeopleOptions: getSelectOptions(salespeople),

    });
    Alert.alert('Exito', `Datos actualizados exitosamente`);
  };*/

  return (
    <DataContext.Provider
      value={{
        //syncData,
        findNameById,
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