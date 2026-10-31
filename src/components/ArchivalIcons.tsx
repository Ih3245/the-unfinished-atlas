import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export function CompassMark({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <polygon points="12,4.5 14.3,12 12,19.5 9.7,12" fill="currentColor" fillOpacity="0.18" />
      <line x1="12" y1="2" x2="12" y2="5" />
      <line x1="2" y1="12" x2="5" y2="12" />
      <line x1="19" y1="12" x2="22" y2="12" />
    </svg>
  );
}

export function SearchLensIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="15.4" y1="15.4" x2="21" y2="21" />
    </svg>
  );
}

export function BookmarkRibbonIcon({
  size = 16,
  filled = false,
  className,
}: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <path d="M6 3.5h12v17l-6-4.2-6 4.2v-17z" />
    </svg>
  );
}

export function FolioBoardIcon({ size = 16, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={className}
    >
      <rect x="3.5" y="4" width="17" height="16" rx="1" />
      <line x1="8" y1="4" x2="8" y2="20" />
      <line x1="11.5" y1="9" x2="17" y2="9" />
      <line x1="11.5" y1="13" x2="16" y2="13" />
    </svg>
  );
}

export function StrataSliderIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="4.5" width="18" height="15" rx="1" />
      <line x1="12" y1="2.5" x2="12" y2="21.5" />
      <polyline points="9,10 6.8,12 9,14" />
      <polyline points="15,10 17.2,12 15,14" />
    </svg>
  );
}

export function NetworkNodesIcon({ size = 17, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
      className={className}
    >
      <circle cx="6" cy="7" r="2.6" />
      <circle cx="18" cy="6.5" r="2.6" />
      <circle cx="12" cy="17.5" r="3" />
      <line x1="8.2" y1="8.3" x2="10.4" y2="15" />
      <line x1="15.8" y1="8.3" x2="13.6" y2="15" />
      <line x1="8.6" y1="7" x2="15.4" y2="6.6" />
    </svg>
  );
}

export function EpistemicGlyph({
  status,
  size = 13,
}: {
  status: 'verified' | 'interpreted' | 'unresolved';
  size?: number;
}) {
  if (status === 'verified') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="12" height="12" />
        <polyline points="4.5,8.3 7,10.8 11.5,5.2" />
      </svg>
    );
  }
  if (status === 'interpreted') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 16 16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <polygon points="8,1.8 14.2,13.5 1.8,13.5" />
        <circle cx="8" cy="9.8" r="1" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="6" strokeDasharray="2.5 1.8" />
      <path d="M6.4 6.2a1.7 1.7 0 0 1 3.3.6c0 1.2-1.7 1.4-1.7 2.5" />
      <circle cx="8" cy="11.8" r="0.8" fill="currentColor" />
    </svg>
  );
}

export function CloseCrossIcon({ size = 18, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <line x1="6" y1="6" x2="18" y2="18" />
      <line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  );
}

export function MenuRulesIcon({ size = 20, className }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
      className={className}
    >
      <line x1="3" y1="7" x2="21" y2="7" />
      <line x1="3" y1="12" x2="17" y2="12" />
      <line x1="3" y1="17" x2="21" y2="17" />
    </svg>
  );
}
