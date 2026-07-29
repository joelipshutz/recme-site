type BrandMarkProps = {
  compact?: boolean;
};

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className={compact ? "brand-mark brand-mark--compact" : "brand-mark"}>
      <span className="brand-pin" aria-hidden="true">
        <span />
      </span>
      <span className="brand-wordmark">rec.me</span>
    </span>
  );
}
