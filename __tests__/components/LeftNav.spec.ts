import { shallowMount } from '@vue/test-utils';
import LeftNav from '../../src/components/LeftNav.vue';

describe('LeftNav', () => {
    test('If props given to component is displayed', async () => {
        const wrapper = shallowMount(LeftNav, {
            props: {scoreString: '000050'},
            attachTo: document.body
        });

        expect(wrapper.props().scoreString).toBe('000050');
        expect(wrapper.find('#score-span').exists()).toBe(true);
        expect(wrapper.find('#score-span').text()).toBe('000050');
        expect(wrapper.find('#score-span').isVisible()).toBe(true);

        await wrapper.setProps({ scoreString: 'Bleh' });

        expect(wrapper.props().scoreString).toBe('Bleh');
    });
});