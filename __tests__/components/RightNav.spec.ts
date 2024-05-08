
import { setActivePinia, createPinia } from 'pinia';
import {createTestingPinia} from '@pinia/testing'
import { shallowMount } from '@vue/test-utils';
import RightNav from '../../src/components/RightNav.vue'
import { useAppStateStore } from '../../src/stores/appStateStore';

describe('RightNav', () => {
    let wrapper;
    let store;
    
    beforeEach(() => {
        setActivePinia(createPinia())
        store = useAppStateStore();
        
        wrapper = shallowMount(RightNav, {
            global: {
                plugins: [createTestingPinia()],
                mocks: {
                    $store: store
                },
            },
        });
    });

    Object.defineProperty(global, 'performance', {
        writable: true,
    });

    jest.useFakeTimers();
    jest.spyOn(global, "setInterval");

    it('starts the fall when fallOn() is called', () => {
        const spy = jest.spyOn(wrapper.vm, 'fallOn');

        wrapper.vm.fallOn();
        expect(spy).toHaveBeenCalled();
        
        jest.advanceTimersByTime(2500);
        expect(wrapper.vm.store.interval).not.toBeNull();
    });

    it('stops the fall when fallOff() is called', () => {
        const spy = jest.spyOn(wrapper.vm, 'fallOn');

        wrapper.vm.fallOn();
        expect(spy).toHaveBeenCalled();
        
        jest.advanceTimersByTime(2500);
        expect(wrapper.vm.store.interval).not.toBeNull();

        wrapper.vm.fallOff();
        expect(wrapper.vm.store.interval).toBeNull();
    });

    test('if ON radio button sets interval', () => {
        expect(wrapper.vm.store.interval).toBeNull();

        wrapper.find('[name="fallOn"]').trigger('click');
        expect(wrapper.vm.store.interval).not.toBeNull();
    });

    test('if OFF radio button clears interval', () => {
        wrapper.find('[name="fallOn"]').trigger('click');
        expect(wrapper.vm.store.interval).not.toBeNull();

        wrapper.find('[name="fallOff"]').trigger('click');
        expect(wrapper.vm.store.interval).toBeNull();
    });
});