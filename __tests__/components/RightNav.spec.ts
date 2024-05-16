
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
        expect(typeof wrapper.vm.store.interval).toBe('number');
    });

    it('stops the fall when fallOff() is called', () => {
        wrapper.vm.fallOn();
    
        jest.advanceTimersByTime(2600);
        expect(typeof wrapper.vm.store.interval).toBe('number');

        wrapper.vm.fallOff();
        expect(wrapper.vm.store.interval).toBeNull();
    });

    test('if ON radio btn sets interval', () => {
        expect(wrapper.vm.store.interval).toBeNull();

        wrapper.find('[name="fallOn"]').trigger('click');
        expect(typeof wrapper.vm.store.interval).toBe('number');
    });

    test('if OFF radio btn clears interval', () => {
        wrapper.find('[name="fallOn"]').trigger('click');
        expect(typeof wrapper.vm.store.interval).toBe('number');

        wrapper.find('[name="fallOff"]').trigger('click');
        expect(wrapper.vm.store.interval).toBeNull();
    });

    it('increments store.countMilliseconds by 100, every 100ms', () => {
        wrapper.find('[name="fallOn"]').trigger('click');

        jest.advanceTimersByTime(2500);

        expect(wrapper.vm.store.countMilliseconds).toBe(2500);
    });

    test('store.countMilliseconds should reset to 0 and start over again, after 2500ms', () => {
        wrapper.find('[name="fallOn"]').trigger('click');

        jest.advanceTimersByTime(2600);

        expect(wrapper.vm.store.countMilliseconds).toBe(100);

        jest.advanceTimersByTime(900);

        expect(wrapper.vm.store.countMilliseconds).toBe(1000);
    });

    it('does not create new interval instance when a current one is active', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');

        fallOnRadioBtn.trigger('click');
        const firstClickInstance = wrapper.vm.store.interval;

        fallOnRadioBtn.trigger('click');
        fallOnRadioBtn.trigger('click');

        expect(wrapper.vm.store.interval).toBe(firstClickInstance);
    });

    it('does not change the null state of store.interval', () => {
        const fallOffRadioBtn = wrapper.find('[name="fallOff"]');
        fallOffRadioBtn.trigger('click');
        fallOffRadioBtn.trigger('click');
        fallOffRadioBtn.trigger('click');

        expect(wrapper.vm.store.interval).toBeNull();
    });

    it('calls store.moveDown() after 2500ms', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');
        fallOnRadioBtn.trigger('click');

        jest.advanceTimersByTime(2600);

        expect(wrapper.vm.store.moveDown).toHaveBeenCalled();
    });

    it('skips adding 100 ms to store.countMilliseconds, when there is a setTimeout in progress', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');
        wrapper.vm.store.timeouts.fillEmptyGridSpacesTimeout = 1;
        fallOnRadioBtn.trigger('click');

        jest.advanceTimersByTime(2500);

        expect(wrapper.vm.store.countMilliseconds).toBe(0);
    });

    it('does not call store.moveDown() after 2500 ms, when there is an active setTimeout in progress', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');
        wrapper.vm.store.timeouts.fillEmptyGridSpacesTimeout = 1;
        fallOnRadioBtn.trigger('click');

        jest.advanceTimersByTime(2600);

        expect(wrapper.vm.store.moveDown).not.toHaveBeenCalled();
    });

    it('calls store.moveDown() 4 times, after 4 seconds', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');
        fallOnRadioBtn.trigger('click');

        jest.advanceTimersByTime(10100);

        expect(wrapper.vm.store.moveDown).toHaveBeenCalledTimes(4);
    });

    test('an active explodeTimeout causes fallOn() to not continue the function and not increment countMilliseconds', () => {
        const fallOnRadioBtn = wrapper.find('[name="fallOn"]');
        wrapper.vm.store.timeouts.explodeTimeout = 100;

        fallOnRadioBtn.trigger('click');

        jest.advanceTimersByTime(2000);

        expect(wrapper.vm.store.countMilliseconds).toBe(0);
    });
});