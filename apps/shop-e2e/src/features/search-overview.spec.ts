import { expect, test } from '@playwright/test';
import {
  SEARCH_OVERVIEW_FEATURE,
  SEARCH_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-search-overview';
import { padTo } from '../support/pacing';

test.describe('Search Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SEARCH_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(SEARCH_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SEARCH_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${SEARCH_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(SEARCH_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
