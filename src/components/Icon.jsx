/**
 * Monochrome outlined icon set (stroke = currentColor), per DESIGN.md's
 * flat-filled / outlined icon language. 24px default.
 */
const paths = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  home: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-5h4v5" />
    </>
  ),
  heart: (
    <path d="M12 20s-7-4.35-9.2-8.5C1.3 8.7 2.7 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.3 0 4.7 3.2 3.2 6C19 15.65 12 20 12 20Z" />
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5c0 4.2 2.9 7.6 7 9 4.1-1.4 7-4.8 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  hands: (
    <>
      <path d="M12 6c1.2-1.8 4.8-2.4 6 0 1 2-1 4-6 7-5-3-7-5-6-7 1.2-2.4 4.8-1.8 6 0Z" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M4 20c0-3 2.2-5 5-5s5 2 5 5" />
      <path d="M16 6.2A3 3 0 0 1 18 12" />
      <path d="M17 15c2 .6 3.5 2.4 3.5 5" />
    </>
  ),
  pill: (
    <>
      <rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(45 12 12)" />
      <path d="M9.5 9.5 14.5 14.5" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14-1 0-1-1-1-1Z" />
      <path d="M9 15c3-4 6-6 9-7" />
    </>
  ),
  house: (
    <>
      <path d="M4 11.5 12 4l8 7.5" />
      <path d="M6 10v9h12v-9" />
    </>
  ),
  phone: (
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5v3c0 1-.8 1.8-1.8 1.7C11 22 4 15 4 6.3 3.9 5.3 4.7 4.5 5.7 4.5" />
  ),
  mail: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.5 7-11a7 7 0 0 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: <path d="m4 12 5 5L20 6" />,
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  sparkle: (
    <path d="M12 3c.6 4.2 1.8 5.4 6 6-4.2.6-5.4 1.8-6 6-.6-4.2-1.8-5.4-6-6 4.2-.6 5.4-1.8 6-6Z" />
  ),
  download: (
    <>
      <path d="M12 4v10m0 0 4-4m-4 4-4-4" />
      <path d="M5 18h14" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m9 15 1.5-4.5L15 9l-1.5 4.5L9 15Z" />
    </>
  ),
};

export default function Icon({ name, size = 24, className, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name] || null}
    </svg>
  );
}
