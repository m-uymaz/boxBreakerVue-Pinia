import {mount} from '@vue/test-utils'
import GameOverBanner from '../../src/components/GameOverBanner.vue'

test('displays message', () => {
  const wrapper = mount(GameOverBanner, {
    props: {
      isGameOver: false
    }
  })
    
    expect(wrapper.props().isGameOver).toBeFalsy();
})
