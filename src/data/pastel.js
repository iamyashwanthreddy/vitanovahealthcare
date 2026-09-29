/** Maps a pastel name to its CSS custom property and a matching dark ink. */
const map = {
  mint: { bg: 'var(--color-mint-wash)', ink: 'var(--color-canopy-green)' },
  sage: { bg: 'var(--color-sage-wash)', ink: 'var(--color-canopy-green)' },
  sky: { bg: 'var(--color-sky-wash)', ink: 'var(--color-deep-teal)' },
  cream: { bg: 'var(--color-cream)', ink: 'var(--color-aubergine)' },
  lilac: { bg: 'var(--color-lilac-wash)', ink: 'var(--color-indigo-bloom)' },
  peach: { bg: 'var(--color-peach-wash)', ink: 'var(--color-aubergine)' },
  lavender: { bg: 'var(--color-lavender-mist)', ink: 'var(--color-indigo-bloom)' },
};

export default function pastel(name) {
  return map[name] || map.mint;
}
