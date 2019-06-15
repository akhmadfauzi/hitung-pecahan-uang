import React from 'react';
import Denominator from '../components/Denominator';
import { create, act } from 'react-test-renderer';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallow } from 'enzyme';

configure({ adapter: new Adapter() });

describe('Input text Valid :', () => {
    const wrapper = shallow(<Denominator />);
    const instance = wrapper.instance();
    const validCases = ['10000','100.125','Rp17.500,00','Rp23500','001000','001.000'];
    validCases.forEach(testCase => {
        test(`input ${testCase} should return True`, () => {
            expect(instance.validator(testCase)).toBe(true);
        });
    });
});

describe('Input text invalid', () => {
    const wrapper = shallow(<Denominator />);
    const instance = wrapper.instance();
    const testCases = ['3000 Rp','2 500','Rp'];
    testCases.forEach(testCase => {
        test(`input ${testCase} should return False`, () => {
            expect(instance.validator(testCase)).toBe(false);
        });
    });
})



