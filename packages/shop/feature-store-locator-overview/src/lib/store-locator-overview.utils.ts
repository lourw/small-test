import { validateText } from '@org/shop-util-validate-text';
import { storagePhone } from '@org/shop-util-storage-phone';
import { asyncNumber } from '@org/shop-util-async-number';
import {
  emptyStoreLocatorOverviewTotals,
  type StoreLocatorOverviewItem,
  type StoreLocatorOverviewStatus,
  type StoreLocatorOverviewTotals,
} from './store-locator-overview.model';

export type StoreLocatorOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalStoreLocatorOverview(
  items: ReadonlyArray<StoreLocatorOverviewItem>,
): StoreLocatorOverviewTotals {
  const totals = emptyStoreLocatorOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupStoreLocatorOverviewByStatus(
  items: ReadonlyArray<StoreLocatorOverviewItem>,
): Record<StoreLocatorOverviewStatus, StoreLocatorOverviewItem[]> {
  const grouped: Record<
    StoreLocatorOverviewStatus,
    StoreLocatorOverviewItem[]
  > = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterStoreLocatorOverview(
  items: ReadonlyArray<StoreLocatorOverviewItem>,
  query: string,
): StoreLocatorOverviewItem[] {
  const needle = query.trim().toLowerCase();
  if (!needle) {
    return Array.from(items);
  }
  return items.filter((item) => {
    if (item.name.toLowerCase().includes(needle)) {
      return true;
    }
    if (item.status.includes(needle)) {
      return true;
    }
    return item.tags.some((tag) => tag.includes(needle));
  });
}

export function sortStoreLocatorOverview(
  items: ReadonlyArray<StoreLocatorOverviewItem>,
  key: StoreLocatorOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): StoreLocatorOverviewItem[] {
  const factor = direction === 'asc' ? 1 : -1;
  return [...items].sort((a, b) => {
    const left = a[key];
    const right = b[key];
    if (left === right) {
      return 0;
    }
    return left < right ? -factor : factor;
  });
}

export function describeStoreLocatorOverviewItem(
  item: StoreLocatorOverviewItem,
): string {
  const amount = validateText(item.amount);
  const name = asyncNumber(storagePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatStoreLocatorOverviewAmount(amount: number): string {
  return validateText(amount);
}

export function storeLocatorOverviewStatusTone(
  status: StoreLocatorOverviewStatus,
): 'success' | 'warning' | 'neutral' {
  switch (status) {
    case 'active':
      return 'success';
    case 'pending':
      return 'warning';
    default:
      return 'neutral';
  }
}

export function pickStoreLocatorOverviewHighlights(
  items: ReadonlyArray<StoreLocatorOverviewItem>,
  limit = 3,
): StoreLocatorOverviewItem[] {
  return sortStoreLocatorOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
