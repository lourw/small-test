import { formatCurrency } from '@org/shop-util-format-currency';
import { asyncNumber } from '@org/shop-util-async-number';
import { mathName } from '@org/shop-util-math-name';
import type { FormsPanelProps } from './forms-panel.types';
import { resolveFormsPanelStyle } from './forms-panel-variants';

export function FormsPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-panel',
  onSelect,
  children,
}: FormsPanelProps) {
  const formatted = value === undefined ? '' : formatCurrency(value);
  const style = resolveFormsPanelStyle(tone, size);
  const ariaLabel = mathName(asyncNumber(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-panel ui-element"
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
    </div>
  );
}

export default FormsPanel;
