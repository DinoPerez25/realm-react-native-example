import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { FormData } from "../schemas";
import { useAuth } from "./AuthContext";

export const FormDataContext = React.createContext(null);

export const FormDataProvider = ({ children, projectPartition }) => {
  const [formData, setFormData] = useState([]);
  const { user } = useAuth();

  const realmRef = useRef(null);

  useEffect(() => {
    console.log('USER-> ', user);
    if (user) {
      const OpenRealmBehaviorConfiguration = {
        type: 'openImmediately',
      };
      const config = {
        schema: [FormData.schema],
        sync: {
          user,
          partitionValue: projectPartition,
          newRealmFileBehavior: OpenRealmBehaviorConfiguration,
          existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
        },
      };
      // open a realm for this particular project
      Realm.open(config).then((projectRealm) => {
        realmRef.current = projectRealm;

        const syncFormData = projectRealm.objects("FormData");
        let sortedFormData = syncFormData.sorted("name");
        setFormData([...sortedFormData]);
        sortedFormData.addListener(() => {
          setFormData([...sortedFormData]);
        });
      });

      return () => {
        // cleanup function
        const projectRealm = realmRef.current;
        if (projectRealm) {
          projectRealm.close();
          realmRef.current = null;
          setFormData([]);
        }
      };
    }
  }, [projectPartition]);

  const createFormData = (newFormData) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.create(
        "FormData",
        new FormData({
          name: newFormData || "New Form Data",
          partition: projectPartition,
        })
      );
    });
  };


  const deleteFormData = (form) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      projectRealm.delete(form);
      setFormData([...projectRealm.objects("FormData").sorted("name")]);
    });
  };

  return (
    <FormDataContext.Provider
      value={{
        createFormData,
        deleteFormData,
        formData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const form = useContext(FormDataContext);
  if (form == null) {
    throw new Error("useFormData() called outside of a FormDataProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return form;
};