import { createContext, useState } from 'react';

export const LoginContext = createContext(null);

const userDefaultValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: ''
};

const DataProvider = ({children}) => {

    const [ Login, setLogin ] = useState('');
    const [isMerchant,setIsMerchant] = useState(false);
    const [userDetails,setUserDetails] = useState(userDefaultValues);

    return (
        <LoginContext.Provider value={{ Login, setLogin, isMerchant, setIsMerchant,userDetails, setUserDetails }}>
            {children}
        </LoginContext.Provider>
    )
}

export default DataProvider;