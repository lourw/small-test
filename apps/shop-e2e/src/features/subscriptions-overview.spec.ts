import { expect, test } from '@playwright/test';
import {
  SUBSCRIPTIONS_OVERVIEW_FEATURE,
  SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-subscriptions-overview';
import { padTo } from '../support/pacing';

test.describe('Subscriptions Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(SUBSCRIPTIONS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(SUBSCRIPTIONS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(SUBSCRIPTIONS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(
      `${SUBSCRIPTIONS_OVERVIEW_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(SUBSCRIPTIONS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
