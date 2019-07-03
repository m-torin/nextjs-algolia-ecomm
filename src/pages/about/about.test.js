/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'

import AboutPage from './index.js'

describe('AboutPage', () => {
  let wrapper;

  beforeEach(()=>{
    wrapper = shallow(<AboutPage />)
  });

  it('Renders the DUMB component', () => {
     expect(wrapper.length).toEqual(1)
  });

  it('Header H1 shows "About"', () => {
    expect(wrapper.find('h1').text()).toEqual('About')
  })
});