type DiscountBadgeProps = {
  percentage: number | null;
};

export function DiscountBadge({ percentage }: DiscountBadgeProps) {
  if (!percentage || percentage <= 0) return null;

  return (
    <span className="wardro-discount-badge" aria-label={`${percentage}% discount`}>
      {percentage}% OFF
    </span>
  );
}
