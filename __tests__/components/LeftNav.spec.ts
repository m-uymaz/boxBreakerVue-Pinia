import { shallowMount } from '@vue/test-utils';
import LeftNav from '../../src/components/LeftNav.vue';

describe('LeftNav', () => {

    // Meh....
    test.each([
        '000050',
        'Bleh'
    ])('If props given to component is displayed', async (str) => {
        const wrapper = shallowMount(LeftNav, {
            props: { scoreString: str },
            attachTo: document.body
        });

        expect(wrapper.props().scoreString).toBe(str);
        expect(wrapper.find('#score-span').exists()).toBe(true);
        expect(wrapper.find('#score-span').isVisible()).toBeTruthy();
        expect(wrapper.find('#score-span').text()).toBe(str);
    });
});