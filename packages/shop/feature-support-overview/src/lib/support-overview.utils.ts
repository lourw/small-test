import { asyncNumber } from '@org/shop-util-async-number';
import { storagePhone } from '@org/shop-util-storage-phone';
import { validateText } from '@org/shop-util-validate-text';
import {
  emptySupportOverviewTotals,
  type SupportOverviewItem,
  type SupportOverviewStatus,
  type SupportOverviewTotals,
} from './support-overview.model';

export type SupportOverviewSortKey =
  'name' | 'amount' | 'quantity' | 'createdAt';

export function totalSupportOverview(
  items: ReadonlyArray<SupportOverviewItem>,
): SupportOverviewTotals {
  const totals = emptySupportOverviewTotals();
  for (const item of items) {
    totals.amount += item.amount;
    totals.quantity += item.quantity;
    totals[item.status] += 1;
  }
  return totals;
}

export function groupSupportOverviewByStatus(
  items: ReadonlyArray<SupportOverviewItem>,
): Record<SupportOverviewStatus, SupportOverviewItem[]> {
  const grouped: Record<SupportOverviewStatus, SupportOverviewItem[]> = {
    active: [],
    pending: [],
    archived: [],
  };
  for (const item of items) {
    grouped[item.status].push(item);
  }
  return grouped;
}

export function filterSupportOverview(
  items: ReadonlyArray<SupportOverviewItem>,
  query: string,
): SupportOverviewItem[] {
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

export function sortSupportOverview(
  items: ReadonlyArray<SupportOverviewItem>,
  key: SupportOverviewSortKey,
  direction: 'asc' | 'desc' = 'asc',
): SupportOverviewItem[] {
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

export function describeSupportOverviewItem(item: SupportOverviewItem): string {
  const amount = asyncNumber(item.amount);
  const name = validateText(storagePhone(item.name));
  return `${name} · ${amount} · ${item.quantity} pcs · ${item.status}`;
}

export function formatSupportOverviewAmount(amount: number): string {
  return asyncNumber(amount);
}

export function supportOverviewStatusTone(
  status: SupportOverviewStatus,
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

export function pickSupportOverviewHighlights(
  items: ReadonlyArray<SupportOverviewItem>,
  limit = 3,
): SupportOverviewItem[] {
  return sortSupportOverview(items, 'amount', 'desc').slice(
    0,
    Math.max(0, limit),
  );
}
