import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';

import { Sidebar } from '../../../components/journal/Sidebar';
import { startLogout } from '../../../actions/auth';
import { startNewNote } from '../../../actions/notes';

jest.mock('../../../actions/auth', () => ({
    startLogout: jest.fn()
}));
jest.mock('../../../actions/notes', () => ({
    startNewNote: jest.fn()
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
    auth: { name: 'Arturo' },
    notes: { notes: [] }
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <Sidebar />
    </Provider>
);

describe('Pruebas en <Sidebar />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    })

    test('debe de llamar el startLogout', () => {
        wrapper.find('button').prop('onClick')();

        expect(startLogout).toHaveBeenCalled();
    });

    test('debe de llamar el startNewNote', () => {
        wrapper.find('.journal__new-entry').prop('onClick')();

        expect(startNewNote).toHaveBeenCalled();
    });

});
