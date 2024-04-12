import React, { ReactElement, useContext } from 'react';
import { createContext, Dispatch, useReducer } from 'react';
import { AuthReducer, AuthState, initialAuthState } from '../reducers/AuthReducer';

const defaultValueType = {
	state: initialAuthState,
};

export const UserContext = createContext<{
	state: AuthState;
}>(defaultValueType);

export const UserProvider = ({ children }: { children: ReactElement }) => {
	const [state, dispatch] = useReducer(AuthReducer, initialAuthState);

	return <UserContext.Provider value={{ state }}>{children}</UserContext.Provider>;
};

export function useAuth() {
	return useContext(UserContext);
}
