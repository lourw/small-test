import { expect, test } from '@playwright/test';
import {
  PROMOTIONS_OVERVIEW_FEATURE,
  PROMOTIONS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-promotions-overview';
import { padTo } from '../support/pacing';

test.describe('Promotions Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(PROMOTIONS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(PROMOTIONS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(PROMOTIONS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${PROMOTIONS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(PROMOTIONS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
