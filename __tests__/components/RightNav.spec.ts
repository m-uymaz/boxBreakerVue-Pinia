
import {createTestingPinia} from '@pinia/testing'
import { shallowMount } from '@vue/test-utils';
import RightNav from '../../src/components/RightNav.vue'

describe('RightNav', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = shallowMount(RightNav, {
            global: {
                plugins: [createTestingPinia()],
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

    test('if ON radio btn sets interval', () => {
        expect(wrapper.vm.store.interval).toBeNull();

        wrapper.find('[name="fallOn"]').trigger('click');
        expect(wrapper.vm.store.interval).not.toBeNull();
    });

    test('if OFF radio btn clears interval', () => {
        wrapper.find('[name="fallOn"]').trigger('click');
        expect(wrapper.vm.store.interval).not.toBeNull();

        wrapper.find('[name="fallOff"]').trigger('click');
        expect(wrapper.vm.store.interval).toBeNull();
    });

    it('does not create new interval instances when there is a current one', () => {
        wrapper.find('[name="fallOn"]').trigger('click');
        const firstClickInstance = wrapper.vm.store.interval;

        wrapper.find('[name="fallOn"]').trigger('click');
        wrapper.find('[name="fallOn"]').trigger('click');

        expect(wrapper.vm.store.interval).toBe(firstClickInstance);
    });

    it('does not change the null state of store.interval', () => {
        wrapper.find('[name="fallOff"]').trigger('click');
        wrapper.find('[name="fallOff"]').trigger('click');
        wrapper.find('[name="fallOff"]').trigger('click');

        expect(wrapper.vm.store.interval).toBeNull();
    });
});