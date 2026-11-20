import { mathName } from '@org/shop-util-math-name';
import { validateText } from '@org/shop-util-validate-text';
import { asyncNumber } from '@org/shop-util-async-number';
import { TypographyBadge } from '@org/shop-ui-typography-badge';
import type { ChartsBannerProps } from './charts-banner.types';
import { resolveChartsBannerStyle } from './charts-banner-variants';

export function ChartsBanner({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-charts-banner',
  onSelect,
  children,
}: ChartsBannerProps) {
  const formatted = value === undefined ? '' : mathName(value);
  const style = resolveChartsBannerStyle(tone, size);
  const ariaLabel = asyncNumber(validateText(label));

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-charts-banner ui-element"
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
      <TypographyBadge
        label="Typography Badge"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default ChartsBanner;
