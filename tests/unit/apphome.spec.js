import AppHome from '@/views/AppHome.vue';
import { shallowMount } from '@vue/test-utils';
import SongItem from '@/components/SongItem.vue';

jest.mock('@/includes/firebase', () => {});

describe('AppHome.vue', () => {
  test('renders list of songs', () => {
    const songs = [
      {}, {}, {},
    ];

    AppHome.methods.getSongs = () => false;

    const component = shallowMount(AppHome, {
      data() {
        return {
          songs,
        };
      },
      global: {
        mocks: {
          $t: (message) => message,
        },
      },
    });

    const items = component.findAllComponents(SongItem);

    expect(items).toHaveLength(songs.length);

    items.forEach((wrapper, i) => {
      expect(wrapper.props().song).toStrictEqual(songs[i]);
    });
  });
});
