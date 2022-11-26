import React, { createContext, useState, useEffect } from 'react';

export const UtilityContext = createContext();


const UtilityPovider = ({ children }) => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState(null);


    const utilityInfo = {
        message,
        setMessage,
        messageType,
        setMessageType
    };

    useEffect(() => {
        const myTimeout = setTimeout(() => {
            setMessage('');
            setMessageType('');
        }, 5000);

        return () => clearTimeout(myTimeout);
    }, [message, messageType])

    return (
        <UtilityContext.Provider value={utilityInfo}>
            {children}
        </UtilityContext.Provider>
    );
};

export default UtilityPovider;