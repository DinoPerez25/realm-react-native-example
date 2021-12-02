
import React, { useContext, useState } from "react";
import { Alert } from "react-native";
import { getPublicRealm } from "../Database";

const DataContext = React.createContext(null);

const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

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


  const getObjectValues = (array) => {
    return array.map(item => { return JSON.parse(JSON.stringify(item)) });
  };

  const fetchDataCall = () => {
    const realm = getPublicRealm();
    const addresses = getObjectValues(realm.objects('Addresses'));
    console.log(addresses)
    setData({
      addresses: getObjectValues(addresses),
    });
  };

  return (
    <DataContext.Provider
      value={{
        findNameById,
        getSelectOptions,
        getObjectValues,
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