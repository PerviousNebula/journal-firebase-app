import { types } from '../../types/types';

describe('Pruebas en types.js', () => {
    
    test('debe de tener los tipos por defecto', () => {
        expect(types).toEqual({
            login: '[AUTH] Login',
            logout: '[AUTH] Logout',
            uiSetError: '[UI] Set Error',
            uiRemoveError: '[UI] Remove Error',
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
            notesAddNew: '[NOTES] New note',
            noteActive: '[NOTES] Set active note',
            notesLoad: '[NOTES] Load notes',
            notesUpdated: '[NOTES] Updated note',
            notesFileUrl: '[NOTES] Updated image url',
            notesDelete: '[NOTES] Delete note',
            notesLogoutCleaning: '[NOTES] Logout Cleaning',
        });
    });

});
