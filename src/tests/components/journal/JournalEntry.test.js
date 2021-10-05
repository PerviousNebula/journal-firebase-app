import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { activeNote } from '../../../actions/notes';

import { JournalEntry } from '../../../components/journal/JournalEntry';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);
store.dispatch = jest.fn();

const note = {
    id: '123',
    title: 'Hola',
    body: 'mundo',
    url: 'https://algunlugar.com/foto.jpg'
};
const wrapper = mount(
    <Provider store={ store }>
        <JournalEntry { ...note } />
    </Provider>
);

describe('Pruebas en <JournalEntry />', () => {

    test('debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de activar la nota', () => {
        wrapper.find('.journal__entry').prop('onClick')();

        expect(store.dispatch).toHaveBeenCalledWith(activeNote(note.id, { ...note }));
    });

});
