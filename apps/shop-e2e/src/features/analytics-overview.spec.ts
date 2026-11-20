import { expect, test } from '@playwright/test';
import {
  ANALYTICS_OVERVIEW_FEATURE,
  ANALYTICS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-analytics-overview';
import { padTo } from '../support/pacing';

test.describe('Analytics Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(ANALYTICS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(ANALYTICS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(ANALYTICS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${ANALYTICS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(ANALYTICS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
