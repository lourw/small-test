import { mathName } from '@org/shop-util-math-name';
import { formatCurrency } from '@org/shop-util-format-currency';
import { asyncNumber } from '@org/shop-util-async-number';
import { FormsPanel } from '@org/shop-ui-forms-panel';
import type { FeedbackToolbarProps } from './feedback-toolbar.types';
import { resolveFeedbackToolbarStyle } from './feedback-toolbar-variants';

export function FeedbackToolbar({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-feedback-toolbar',
  onSelect,
  children,
}: FeedbackToolbarProps) {
  const formatted = value === undefined ? '' : mathName(value);
  const style = resolveFeedbackToolbarStyle(tone, size);
  const ariaLabel = asyncNumber(formatCurrency(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-feedback-toolbar ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <FormsPanel label="Forms Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FeedbackToolbar;
