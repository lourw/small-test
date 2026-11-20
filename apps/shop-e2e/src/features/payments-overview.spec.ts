import { expect, test } from '@playwright/test';
import {
  PAYMENTS_OVERVIEW_FEATURE,
  PAYMENTS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-payments-overview';
import { padTo } from '../support/pacing';

test.describe('Payments Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PAYMENTS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(PAYMENTS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PAYMENTS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${PAYMENTS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PAYMENTS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
