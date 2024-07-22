import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, msalInstance } from './authConfig';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isInitialized, setIsInitialized] = useState(false);
    const [account, setAccount] = useState(null);

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                await msalInstance.initialize();
                const response = await msalInstance.handleRedirectPromise();
                if (response) {
                    setAccount(response.account);
                } else {
                    const currentAccounts = msalInstance.getAllAccounts();
                    if (currentAccounts.length === 1) {
                        setAccount(currentAccounts[0]);
                    }
                }
                setIsInitialized(true);
            } catch (error) {
                console.error('MSAL initialization error:', error);
            }
        };

        initializeAuth();
    }, []);

    const acquireTokenSilent = async () => {
        if (!isInitialized) {
            throw new Error('MSAL is not initialized');
        }

        const accounts = msalInstance.getAllAccounts();
        if (accounts.length === 0) {
            throw new Error('No accounts found');
        }

        const request = {
            scopes: loginRequest.scopes,
            account: accounts[0],
        };

        try {
            const response = await msalInstance.acquireTokenSilent(request);
            return response.accessToken;
        } catch (error) {
            if (error instanceof msalInstance.InteractionRequiredAuthError) {
                return msalInstance.acquireTokenPopup(request);
            } else {
                throw error;
            }
        }
    };

    return (
        <AuthContext.Provider value={{ isInitialized, account, acquireTokenSilent }}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
  };

export const useAuth = () => useContext(AuthContext);
