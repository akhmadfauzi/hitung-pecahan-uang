import React from 'react';
import Denominator from '../components/Denominator';
import { create, act } from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

describe('Input text Valid :', () => {
    const wrapper = shallow(<Denominator />);
    const instance = wrapper.instance();
    const validCases = ['10000', '100.125', 'Rp17.500,00', 'Rp23500', '001000', '001.000', '2.000.000.000.000'];
    validCases.forEach(testCase => {
        test(`input ${testCase} should return True`, () => {
            expect(instance.isValid(testCase)).toBe(true);
        });
    });
});

describe('Input text invalid', () => {
    const wrapper = shallow(<Denominator />);
    const instance = wrapper.instance();
    const testCases = ['3000 Rp', '2 500', 'Rp', '3.0.000.000.000'];
    testCases.forEach(testCase => {
        test(`input ${testCase} should return False`, () => {
            expect(instance.isValid(testCase)).toBe(false);
        });
    });
});

describe('Calculation of cash denomination', () => {
    const wrapper = shallow(<Denominator />);
    const instance = wrapper.instance();

    it('Should return object {10000:1}', () => {
        const expectedResult = {
            "10000": 1
        }
        const testCase = instance.denominationCalculator(10000);
        expect(testCase).toEqual(expectedResult);
    });

    it('Should return object contains all denomination including the remainder', () => {
        const expectedResult = {
            "100000": 1,
            "50000": 1,
            "20000": 1,
            "10000": 1,
            "5000": 1,
            "1000": 1,
            "500": 1,
            "100": 1,
            "50": 1,
            "Remainder": "10,90"
        }
        
        const testCase = instance.denominationCalculator(186660.9);
        expect(testCase).toEqual(expectedResult);
    });
});

