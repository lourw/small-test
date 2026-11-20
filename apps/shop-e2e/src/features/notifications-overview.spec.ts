import { expect, test } from '@playwright/test';
import {
  NOTIFICATIONS_OVERVIEW_FEATURE,
  NOTIFICATIONS_OVERVIEW_ITEM_COUNT,
} from '@org/shop-feature-notifications-overview';
import { padTo } from '../support/pacing';

test.describe('Notifications Overview', () => {
  test('renders the feature and lists every item', async ({ page }) => {
    const startedAt = Date.now();
    await page.goto(NOTIFICATIONS_OVERVIEW_FEATURE.route);
    await expect(
      page.getByTestId(NOTIFICATIONS_OVERVIEW_FEATURE.testId),
    ).toBeVisible();
    const heading = page
      .getByTestId(`${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-header`)
      .getByRole('heading', { level: 1 });
    await expect(heading).toHaveText(NOTIFICATIONS_OVERVIEW_FEATURE.title);
    const rows = page.getByTestId(
      `${NOTIFICATIONS_OVERVIEW_FEATURE.testId}-row`,
    );
    await expect(rows).toHaveCount(NOTIFICATIONS_OVERVIEW_ITEM_COUNT);
    await padTo(startedAt);
  });
});
