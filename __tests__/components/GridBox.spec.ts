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
        wrapper = shallowMount(GridBox, {
            props: {
                boxN: 1
            },
            global: {
                plugins: [createTestingPinia()],
            }
        });
    });

    test('all column boxes with "arrowIndex" index have .box-selected class', () => {
        let testBoxN = 6;

        store.gridArray.forEach(async () => {
            await wrapper.setProps({ boxN: testBoxN });

            expect(wrapper.find('.box-selected').exists()).toBe(true);
            expect(wrapper.find('.box').exists()).not.toBe(true);
            testBoxN += 10;
        });
    });

    test('column boxes NOT with "arrowIndex" index, have .box class', () => {
        let testBoxN = 10;

        store.gridArray.forEach(async () => {
            await wrapper.setProps({ boxN: testBoxN });

            expect(wrapper.find('.box-selected').exists()).not.toBe(true);
            expect(wrapper.find('.box').exists()).toBe(true);
            testBoxN += 10;
        });
    });
});