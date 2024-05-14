import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridBox from '../../src/components/GridBox.vue';
import { ALICEBLUE } from '../../src/constants/constants';

describe('GridBox', () => {
    let wrapper;

    beforeEach(() => {
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

        wrapper.vm.store.gridArray.forEach(async () => {
            await wrapper.setProps({ boxN: testBoxN });

            expect(wrapper.find('.box-selected').exists()).toBe(true);
            expect(wrapper.find('.box').exists()).not.toBe(true);
            testBoxN += 10;
        });
    });

    test('column boxes NOT with "arrowIndex" index, have .box class', () => {
        let testBoxN = 10;

        wrapper.vm.store.gridArray.forEach(async () => {
            await wrapper.setProps({ boxN: testBoxN });

            expect(wrapper.find('.box-selected').exists()).not.toBe(true);
            expect(wrapper.find('.box').exists()).toBe(true);
            testBoxN += 10;
        });
    });

    test('boxes from 21 onward have rgb computed to ALICEBLUE', () => {
        const testBoxes = Array.from({ length: 180 }, (_, i) => i + 21);

        testBoxes.forEach(async (testBoxN) => {
            await wrapper.setProps({ boxN: testBoxN });

            expect(wrapper.vm.rgb).toBe(ALICEBLUE);
        });
    });

    test('if arrow box is with arrow style', async () => {
        const arrowBoxN = 196;

        await wrapper.setProps({ boxN: arrowBoxN });

        expect(wrapper.find('.arrow').exists()).toBe(true);
    });
});