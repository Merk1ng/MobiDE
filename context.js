import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export const GlobalContext = createContext({});

export function GlobalProvider({children}) {
  const [user, setUser] = useState(null);
  const [headerOptions, setHeaderOptions] = useState({});
  const [customers, setCustomers] = useState([]);
  const [goods, setGoods] = useState([]);
  const [reports, setReports] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [storages, setStorages] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [technics, setTechnics] = useState([]);
  const [barcodes, setBarcodes] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem('user').then(async value => {
      setUser(JSON.parse(value));
    });
  }, []);

  async function signOut(navigation) {
    setUser({});
    await AsyncStorage.removeItem('user');
  }

  return (
    <GlobalContext.Provider
      value={{
        user,
        signOut,
        headerOptions,
        setHeaderOptions,
        setUser,
        setCustomers,
        customers,
        goods,
        setGoods,
        reports,
        setReports,
        templates,
        setTemplates,
        storages,
        setStorages,
        organizations,
        setOrganizations,
        suppliers,
        setSuppliers,
        technics,
        setTechnics,
        barcodes,
        setBarcodes,
      }}>
      {children}
    </GlobalContext.Provider>
  );
}
