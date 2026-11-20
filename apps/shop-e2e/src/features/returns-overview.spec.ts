import { expect, test } from '@playwright/test';
import {
  RETURNS_OVERVIEW_FEATURE,
  RETURNS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-returns-overview';
import { padTo } from '../support/pacing';

test.describe('Returns Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(RETURNS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(RETURNS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(RETURNS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(`${RETURNS_OVERVIEW_FEATURE.testId}-row`);
    await expect(rows).toHaveCount(RETURNS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
