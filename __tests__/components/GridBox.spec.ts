import { setActivePinia, createPinia} from 'pinia';
import { useAppStateStore } from '../../src/stores/appStateStore';
import { shallowMount, VueWrapper} from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridBox from '../../src/components/GridBox.vue';
import { AppStore } from '../../src/types/types';

describe('GridBox', () => {
    let wrapper: VueWrapper;
    let store: AppStore;

    beforeEach(() => {
        setActivePinia(createPinia());
        store = useAppStateStore();
    });

    test('...', () => {
        let boxN = 6;

        store.gridArray.forEach(() => {
            wrapper = shallowMount(GridBox, {
                props: {
                    boxN: boxN
                },
                global: {
                    plugins: [createTestingPinia()],
                },
            });
            expect(wrapper.find('.box-selected').exists()).toBe(true);
            expect(wrapper.find('.box').exists()).not.toBe(true);
            boxN += 10;
        })
    });

    test('...', () => {
        let boxN = 10;

        store.gridArray.forEach(() => {
            wrapper = shallowMount(GridBox, {
                props: {
                    boxN: boxN
                },
                global: {
                    plugins: [createTestingPinia()],
                },
            });
            expect(wrapper.find('.box-selected').exists()).not.toBe(true);
            expect(wrapper.find('.box').exists()).toBe(true);
            boxN += 10;
        })
    });
});