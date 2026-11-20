import { CoreBadgeGroup } from '@org/shop-ui-core-badge';
import { FormsPanel } from '@org/shop-ui-forms-panel';
import { MediaToolbar } from '@org/shop-ui-media-toolbar';
import type { AccountOverviewItem } from './account-overview.model';
import { ACCOUNT_OVERVIEW_FEATURE } from './account-overview.routes';
import { describeAccountOverviewItem } from './account-overview.utils';

export interface AccountOverviewPanelProps {
  selected: AccountOverviewItem | null;
  onClear: () => void;
}

export function AccountOverviewPanel({
  selected,
  onClear,
}: AccountOverviewPanelProps) {
  if (!selected) {
    return (
      <aside
        className="feature-panel"
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel`}
      >
        <p className="feature-panel-hint">
          Select an entry to see its details.
        </p>
      </aside>
    );
  }

  return (
    <aside
      className="feature-panel"
      data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel`}
    >
      <h2
        className="feature-panel-title"
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-panel-name`}
      >
        {selected.name}
      </h2>
      <p className="feature-panel-description">
        {describeAccountOverviewItem(selected)}
      </p>
      <CoreBadgeGroup
        title="Details"
        items={[
          { id: 'amount', label: 'Amount', value: selected.amount },
          { id: 'quantity', label: 'Quantity', value: selected.quantity },
          { id: 'status', label: 'Status', value: selected.status },
          { id: 'price', label: 'Unit price', value: selected.product.price },
          { id: 'rating', label: 'Rating', value: selected.product.rating },
        ]}
      />
      <div className="feature-panel-extra">
        <FormsPanel
          label="Forms Panel"
          value={selected.product.rating}
          size="sm"
        />
        <MediaToolbar
          label="Media Toolbar"
          value={selected.product.rating}
          size="sm"
        />
      </div>
      <ul className="feature-tags">
        {selected.tags.map((tag) => (
          <li key={tag} className="feature-tag">
            {tag}
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="feature-button secondary"
        onClick={onClear}
        data-testid={`${ACCOUNT_OVERVIEW_FEATURE.testId}-clear`}
      >
        Clear selection
      </button>
    </aside>
  );
}
