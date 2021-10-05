import { removeError, setError, uiFinishLoading, uiStartLoading } from '../../actions/ui'
import { types } from '../../types/types';

describe('Pruebas es ui-actions', () => {

    test('Todas las acciones deben de funcionar', () => {
        const errMsg = 'HELP!!!';

        const action = setError(errMsg);

        expect(action).toEqual({
            type: types.uiSetError,
            payload: errMsg
        });

        const removeErrorState = removeError();
        const uiStartLoadingState = uiStartLoading();
        const uiFinishLoadingState = uiFinishLoading();

        expect(removeErrorState).toEqual({ type: types.uiRemoveError });
        expect(uiStartLoadingState).toEqual({ type: types.uiStartLoading });
        expect(uiFinishLoadingState).toEqual({ type: types.uiFinishLoading });
    });

});
