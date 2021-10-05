import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { NoteScreen } from '../../../components/notes/NoteScreen';

import { activeNote } from '../../../actions/notes';

jest.mock('../../../actions/notes', () => ({
    activeNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    notes: {
        active: {
            id: '123',
            title: 'Hola',
            body: 'mundo!',
            date: 0
        }
    }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <NoteScreen />
    </Provider>
);

describe('Pruebas en <NoteScreen />', () => {

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de disparar el activeNote', () => {
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola de nuevo!'
            }
        });

        expect(activeNote).toHaveBeenLastCalledWith('123', {
            id: '123',
            title: 'Hola de nuevo!',
            body: 'mundo!',
            date: 0
        });
    });

});
