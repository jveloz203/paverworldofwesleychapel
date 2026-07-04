export default function PaverPattern({
  className = "",
  opacity = 0.12,
}: {
  className?: string;
  opacity?: number;
}) {
  return (
    <svg className={className} aria-hidden="true" style={{ opacity }}>
      <defs>
        <pattern id="paver-bond" width="96" height="48" patternUnits="userSpaceOnUse">
          <rect width="96" height="48" fill="none" />
          <rect x="1" y="1" width="46" height="22" rx="2" fill="currentColor" />
          <rect x="49" y="1" width="46" height="22" rx="2" fill="currentColor" />
          <rect x="-23" y="25" width="46" height="22" rx="2" fill="currentColor" />
          <rect x="25" y="25" width="46" height="22" rx="2" fill="currentColor" />
          <rect x="73" y="25" width="46" height="22" rx="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#paver-bond)" />
    </svg>
  );
}
