import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// https://github.com/kentcdodds/testing-workshop/blob/1938d6fc2048e55362679905f700f938a3b497c4/client/src/screens/__tests__/editor.js

// This helper will make it easier to change the value
// in an input element. For example:
// changeInputValue(tagInput, 'hello')
// will change the input's value to 'hello'
const enzymeChangeInputValue = (input, value) => input.simulate('change', {target: {value}});

// this helper will make it easier to fire the keyUp event
// on elements. For example:
// keyUpInput(tagInput, 13)
// will fire the "enter" key on that input
const enzymeKeyUpInput = (input, keyCode) => input.simulate('keyup', {keyCode});

// this helper will make it easier for you to find
// labeled elements in the wrapper:
// const tagInput = wrapper.find(sel('tags'))
const enzymeSel = (id) => `[data-test="${id}"]`;

export { enzymeChangeInputValue, enzymeKeyUpInput, enzymeSel };