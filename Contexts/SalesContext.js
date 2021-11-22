import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Sale } from "../schemas";
import app from '../realmApp';

export const SalesContext = React.createContext(null);

export const SalesProvider = ({ children }) => {
  const [user] = useState(app.currentUser);
  const realmRef = useRef(null);
  useEffect(() => {
    if (user) {
      Realm.open({
        schema: [Sale.schema],
        sync: {
          user,
          partitionValue: `user=${user?.id}`,
        },
      }).then((projectRealm) => {
        realmRef.current = projectRealm;
      });

      return () => {
        const projectRealm = realmRef.current;
        if (projectRealm) {
          projectRealm.close();
          realmRef.current = null;
        }
      };
    }
  }, []);

  const createSale = (newSaleData) => {
    const projectRealm = realmRef.current;
    const sale = new Sale(newSaleData);
    projectRealm.write(() => {
      projectRealm.create(
        "Sales",
        sale
      );
    });
  };

  return (
    <SalesContext.Provider
      value={{
        createSale
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