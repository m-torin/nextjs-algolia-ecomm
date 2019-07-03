/* eslint-env jest */

import { defineFeature, loadFeature } from 'jest-cucumber';

import { OnlineSales } from './';

const feature = loadFeature('./scenario-outlines.feature', {
  loadRelativePath: true,
});

defineFeature(feature, test => {
  let onlineSales;
  let salesPrice;

  beforeEach(() => {
    onlineSales = new OnlineSales();
  });

  test('Selling an item at $<Amount>', ({ given, when, then }) => {
    given(/^I have a\(n\) (.*)$/, item => {
      onlineSales.listItem(item);
    });

    when(/^I sell the (.*)$/, item => {
      salesPrice = onlineSales.sellItem(item);
    });

    then(/^I should get \$(\d+)$/, expectedSalesPrice => {
      expect(salesPrice).toBe(parseInt(expectedSalesPrice));
    });
  });
});
