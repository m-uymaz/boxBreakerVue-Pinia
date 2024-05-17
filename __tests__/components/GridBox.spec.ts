import { shallowMount } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';
import GridBox from '../../src/components/GridBox.vue';
import { ALICEBLUE } from '../../src/constants/constants';

const arrowBoxN = 196;

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

    describe('Common Grid Array Boxes Styles', () => {

        test('all column boxes with "arrowIndex" index have .box-selected style', () => {
            let testBoxN = 6;

            wrapper.vm.store.gridArray.forEach(async () => {
                await wrapper.setProps({ boxN: testBoxN });

                expect(wrapper.find('.box-selected').exists()).toBe(true);
                expect(wrapper.find('.box').exists()).not.toBe(true);
                testBoxN += 10;
            });
        });

        test('column boxes NOT with "arrowIndex" index, have .box style', () => {
            let testBoxN = 10;

            wrapper.vm.store.gridArray.forEach(async () => {
                await wrapper.setProps({ boxN: testBoxN });

                expect(wrapper.find('.box-selected').exists()).not.toBe(true);
                expect(wrapper.find('.box').exists()).toBe(true);
                testBoxN += 10;
            });
        });

        test('box n from 21 onward have rgb computed to ALICEBLUE', () => {
            const testBoxes = Array.from({ length: 180 }, (_, i) => i + 21);

            testBoxes.forEach(async (testBoxN) => {
                await wrapper.setProps({ boxN: testBoxN });

                expect(wrapper.vm.rgb).toBe(ALICEBLUE);
            });
        });
    });

    describe('Arrow Box', () => {

        test('if arrow box is with arrow style', async () => {
            await wrapper.setProps({ boxN: arrowBoxN });

            expect(wrapper.find('.arrow').exists()).toBe(true);
        });

        test('if the arrow box has rgb computed to ALICEBLUE', async () => {
            await wrapper.setProps({ boxN: arrowBoxN });

            expect(wrapper.vm.rgb).toBe(ALICEBLUE);
        });
    });

    describe('Exploding Boxes', () => {

        test('boxes set to explode have .box-explosion style', async () => {
            wrapper.vm.store.explodingBoxesN = [1, 5, 10];

            wrapper.vm.store.explodingBoxesN.forEach(async (box) => {
                await wrapper.setProps({ boxN: box });

                expect(wrapper.find('.box-explosion').exists()).toBe(true);
            });
        });
    });

    describe('Blinking Boxes', () => {

        test('boxes set to blink have .soon-to-explode style', async () => {
            wrapper.vm.store.blinkingBoxesN = [15, 7, 2];

            wrapper.vm.store.explodingBoxesN.forEach(async (box) => {
                await wrapper.setProps({ boxN: box });

                expect(wrapper.find('.soon-to-explode').exists()).toBe(true);
            });
        });
    });
});