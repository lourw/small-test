import { expect, test } from '@playwright/test';
import {
  CATALOG_OVERVIEW_FEATURE,
  CATALOG_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-catalog-overview';
import { padTo } from '../support/pacing';

test.describe('Catalog Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(CATALOG_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(CATALOG_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(CATALOG_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${CATALOG_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(CATALOG_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
