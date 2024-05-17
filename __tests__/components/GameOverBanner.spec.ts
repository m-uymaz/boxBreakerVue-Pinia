import {shallowMount} from '@vue/test-utils'
import GameOverBanner from '../../src/components/GameOverBanner.vue'

describe('GameOverBanner', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(GameOverBanner, {
            props: {
                isGameOver: false
            }
        });
    });

    it('displays game over message', async () => {
        await wrapper.setProps({ isGameOver: true });

        expect(wrapper.props().isGameOver).toBeTruthy();
        expect(wrapper.find('.h1-blinking').exists()).toBe(true);
        expect(wrapper.find('.h1-none').exists()).toBe(false);
    });

    it('does not display game over message ', async () => {
        await wrapper.setProps({ isGameOver: false });

        expect(wrapper.props().isGameOver).toBe(false);
        expect(wrapper.find('.h1-none').exists()).toBe(true);
    });
});
