import { expect, test } from '@playwright/test';
import {
  CHECKOUT_OVERVIEW_FEATURE,
  CHECKOUT_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-checkout-overview';
import { padTo } from '../support/pacing';

test.describe('Checkout Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CHECKOUT_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(CHECKOUT_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CHECKOUT_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CHECKOUT_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${CHECKOUT_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CHECKOUT_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
