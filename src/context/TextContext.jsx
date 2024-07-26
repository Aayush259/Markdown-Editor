import React, { createContext, useContext } from 'react';

// Creating text context.
const TextContext = createContext(null);

// Creating text context provider.
const TextContextProvider = ({ children, values }) => {
    return (
        <TextContext.Provider value={values}>
            {children}
        </TextContext.Provider>
    );
};

// Custom hook to use TextContext.
const useTextContext = () => {
    return useContext(TextContext);
};

export { TextContextProvider, useTextContext };
