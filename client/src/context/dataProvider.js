import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const DataProvider = ({children}) => {

    const [ Login, setLogin ] = useState('');
    const [isMerchant,setIsMerchant] = useState(false);
    
    return (
        <LoginContext.Provider value={{ Login, setLogin, isMerchant, setIsMerchant }}>
            {children}
        </LoginContext.Provider>
    )
}

export default DataProvider;