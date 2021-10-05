/**
* @jest-environment node
*/
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { startLoadingNotes, startNewNote, startSaveNote, startUploading } from '../../actions/notes';

import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => {
    return {
        fileUpload: () => {
            return Promise.resolve('https://hola-mundo.com/cosa.jpg');
        },
    };
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: { uid: 'ABC123' },
    notes: {
        active: {
            id: '5eeUZlbp0Q8tfeO6iDgz',
            title: 'Hola',
            body: 'Mundo'
        }
    }
};
let store = mockStore(initState);

global.scrollTo = jest.fn();

describe('Pruebas con las acciones de notes', () => {

    beforeEach(() => {
        store = mockStore(initState);
    });

    test('debe de crear una nueva nota startNewNote', async () => {
        await store.dispatch(startNewNote());

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.noteActive,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });
        expect(actions[1]).toEqual({
            type: types.notesAddNew,
            payload: {
                id: expect.any(String),
                title: '',
                body: '',
                date: expect.any(Number),
            },
        });

        const docId = actions[0].payload.id;
        await db.doc(`ABC123/journal/notes/${docId}`).delete();
    });

    test('startLoadingNotes debe cargar las notas', async () => {
        await store.dispatch(startLoadingNotes('ABC123'));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.notesLoad,
            payload: expect.any(Array)
        });
        const expected = {
            id: expect.any(String),
            title: expect.any(String),
            body: expect.any(String),
            date: expect.any(Number)
        };
        expect(actions[0].payload[0]).toMatchObject(expected);
    });

    test('startSaveNote debe de actualizar la nota', async () => {
        const note = {
            id: '5eeUZlbp0Q8tfeO6iDgz',
            title: 'título',
            body: 'body',
        };
        await store.dispatch(startSaveNote(note));

        const actions = store.getActions();

        expect(actions[0].type).toBe(types.notesUpdated);

        const docRef = await db.doc(`/ABC123/journal/notes/${note.id}`).get();
        expect(docRef.data().title).toBe(note.title);
    });

    test('startUploading debe de actualizar el url del entry', async () => {
        const file = [];

        await store.dispatch(startUploading(file));

        const docRef = await db.doc('/ABC123/journal/notes/5eeUZlbp0Q8tfeO6iDgz').get();
        expect(docRef.data().url).toBe('https://hola-mundo.com/cosa.jpg');
    });

});
