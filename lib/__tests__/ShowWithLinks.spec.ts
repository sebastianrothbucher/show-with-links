import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ShowWithLinks from '../ShowWithLinks.vue'

describe('ShowWithLinks', () => {

  it('renders one span when no links', () => {
    const wrapper = mount(ShowWithLinks, { shallow: true, props: {plain: 'Text with no links'} });
    expect(wrapper.find('span').text()).toBe('Text with no links');
    expect(wrapper.findAll('a').length).toBe(0);
  });
  it('renders links separately', () => {
    const wrapper = mount(ShowWithLinks, { shallow: true, props: {plain: 'Text with links to http://bla.com and https://blup.com'} });
    expect(wrapper.find('span').text()).toBe('Text with links to http://bla.com and https://blup.com');
    expect(wrapper.findAll('a').length).toBe(2);
    expect(wrapper.find('a:first-child').text()).toBe('http://bla.com');
    expect(wrapper.find('a:first-child').attributes('href')).toBe('http://bla.com');
    expect(wrapper.find('a:last-child').text()).toBe('https://blup.com');
    expect(wrapper.find('a:last-child').attributes('href')).toBe('https://blup.com');
  });
  it('renders links with target', () => {
    const wrapper = mount(ShowWithLinks, { shallow: true, props: {plain: 'Text with links to http://bla.com and https://blup.com', target: '_blank'} });
    expect(wrapper.find('span').text()).toBe('Text with links to http://bla.com and https://blup.com');
    expect(wrapper.findAll('a').length).toBe(2);
    expect(wrapper.find('a:first-child').attributes('target')).toBe('_blank');
    expect(wrapper.find('a:last-child').attributes('target')).toBe('_blank');
  });
})