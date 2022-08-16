import AppAbout from '@/views/AppAbout.vue';
import { shallowMount } from '@vue/test-utils';

describe('About.vue', () => {
  test('renders inner text', () => {
    const wrapper = shallowMount(AppAbout);

    expect(wrapper.text()).toContain('about');
  });
});
