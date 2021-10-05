import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en el authReducer', () => {
    
    test('debe de retonar el state por defecto', () => {
        const state = authReducer({}, {});

        expect(state).toEqual({});
    });

    test('debe de retornar el state del login', () => {
        const action = {
            type: types.login,
            payload: {
                uid: 'ABC123',
                displayName: 'Arturo',
            },
        };
        const state = authReducer({}, action);

        expect(state).toEqual({
            uid: action.payload.uid,
            name: action.payload.displayName,
        });
    });

    test('debe de retornar el state del logout', () => {
        const initState = { uid: 'ABC123', name: 'Arturo' };
        const action = { type: types.logout };

        const state = authReducer(initState, action);

        expect(state).toEqual({});
    });

});
