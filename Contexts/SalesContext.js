import React, { useContext, useState, useRef, useEffect } from "react";
import { Alert } from "react-native";
import Realm from "realm";
import { Sale } from "../schemas";
import { useAuth } from "./AuthContext";

export const SalesContext = React.createContext(null);

export const SalesProvider = ({ children }) => {
  const [sales, setSales] = useState(null);
  const { user } = useAuth();
  const realmRef = useRef();

  useEffect(() => {
    console.log('user sales', user?.id, Realm.path);
    if (user) {
      Realm.open({
        schema: [Sale.schema],
        sync: {
          user,
          partitionValue: `user=${user?.id}`,
          error: (error) => {
            Alert.alert(`Error ${error.name}`, error.message)
          },
        },
      }).then((realm) => {
        console.log('CONNECTION SALES SUCCESS', user.id)
        realmRef.current = realm;
      })

      return () => {
        console.log('CLOSE SALES CONNECTION');
        const userRealm = realmRef.current;
        if (userRealm) {
          userRealm.close();
        }
      };
    }
  }, [user]);

  const getObjectValues = (array) => {
    return array.map(item => {
      return JSON.parse(JSON.stringify(item))
    });
  };

  const createSale = (newSaleData) => {
    console.log(realmRef.current);
    const salesRealm = realmRef.current;
    const sale = new Sale(newSaleData);
    salesRealm.write(() => {
      salesRealm.create(
        "Sales",
        sale
      );
    });
  };

  const getSales = () => {
    Realm.open({
      inMemory: false,
      schema: [Sale.schema],
    }).then((realm) => {
      const sales = getObjectValues(realm.objects('Sales'));
      setSales(sales);
      console.log('SALES ON CONTEXT->', sales);
    })
  };

  return (
    <SalesContext.Provider
      value={{
        createSale,
        getSales,
        sales
      }}
    >
      {children}
    </SalesContext.Provider>
  );
};

export const useSales = () => {
  const form = useContext(SalesContext);
  if (form == null) {
    throw new Error("useSales() called outside of a SalesProvider?");
  }
  return form;
};