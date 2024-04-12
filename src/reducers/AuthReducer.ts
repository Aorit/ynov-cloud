
export interface AuthState {
	currentUser:  undefined;
}

export const initialAuthState: AuthState = {
	currentUser: undefined,
};

export const AuthReducer = (state: AuthState,): AuthState => {
			return state;
	};
