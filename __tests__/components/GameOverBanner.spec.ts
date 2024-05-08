import {shallowMount} from '@vue/test-utils'
import GameOverBanner from '../../src/components/GameOverBanner.vue'

describe('GameOverBanner', () => {
    test('displays game over message', () => {
        const wrapper = shallowMount(GameOverBanner, {
            props: {
                isGameOver: false
            }
        });

        expect(wrapper.props().isGameOver).toBe(false);
        expect(wrapper.find('.h1-none').exists()).toBe(true);
    });

    test('does not display game over message', () => {
        const wrapper = shallowMount(GameOverBanner, {
            props: {
                isGameOver: true
            }
        });

        expect(wrapper.props().isGameOver).toBeTruthy();
        expect(wrapper.find('.h1-blinking').exists()).toBe(true);
        expect(wrapper.find('.h1-none').exists()).toBe(false);
    });
});
