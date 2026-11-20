import { storagePhone } from '@org/shop-util-storage-phone';
import { LayoutStat } from '@org/shop-ui-layout-stat';
import type { TypographyBadgeProps } from './typography-badge.types';
import { resolveTypographyBadgeStyle } from './typography-badge-variants';

export function TypographyBadge({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-typography-badge',
  onSelect,
  children,
}: TypographyBadgeProps) {
  const formatted = value === undefined ? '' : storagePhone(value);
  const style = resolveTypographyBadgeStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-typography-badge ui-element"
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
      <LayoutStat label="Layout Stat" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default TypographyBadge;
