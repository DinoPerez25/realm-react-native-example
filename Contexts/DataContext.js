
import React, { useContext, useState } from "react";
import Realm from "realm";
import { Items, Salespeople } from '../schemas';
import { Alert } from "react-native";
import { useAuth } from "./AuthContext";

const DataContext = React.createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const { user } = useAuth();

  const getSelectOptions = (array) => {
    return array.map(item => { return { value: item._id, label: item.name } });
  };

  const findNameById = (id, key) => {
    if (data[key]) {
      const list = data[key];
      const result = list.find(item => String(item._id) === String(id));
      return result ? result.name : 'No encontrado';
    }
    Alert.alert('Error', `Datos de ${key} no encontrados, favor actualizar`);
  };

  const getRealm = async () => {
    const configuration = {
      schema: [Items.schema, Salespeople.schema],
      sync: {
        user: user,
        partitionValue: `PUBLIC`,
      },
    };
    return Realm.open(configuration);
  };



  const getObjectValues = (array) => {
    return array.map(item => { return JSON.parse(JSON.stringify(item)) });
  };

  const fetchDataCall = () => {
    getRealm().then(realm => {
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
      return () => {
        realm.close();
      };
    }).catch(error => {
      console.log(error, ' en fetchDataCall');
    });
  };

  return (
    <DataContext.Provider
      value={{
        getRealm,
        findNameById,
        getSelectOptions,
        fetchDataCall,
        data,
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