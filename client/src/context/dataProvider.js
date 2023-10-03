import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const DataProvider = ({children}) => {

    const [ Login, setLogin ] = useState('');
    
    return (
        <LoginContext.Provider value={{ Login, setLogin }}>
            {children}
        </LoginContext.Provider>
    )
}

export default DataProvider;