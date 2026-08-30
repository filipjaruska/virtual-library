import type { CSSProperties } from "react";

/**
 * Covers are drawn rather than fetched. The original cover images lived in the
 * CMS's media library and went away with it, and generating them from the slug
 * means every book has a stable, unique cover with no external image host and
 * nothing to 404.
 */

const WIDTH = 300;
const HEIGHT = 450;
const MOTIF_COUNT = 6;

function hash(value: string): number {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Greedy wrap; the cover is fixed-width so character counts are good enough. */
function wrap(text: string, maxChars: number, maxLines: number): string[] {
  const lines: string[] = [];
  let line = "";

  for (const word of text.split(/\s+/)) {
    const candidate = line ? `${line} ${word}` : word;
    if (candidate.length <= maxChars) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);

  if (lines.length <= maxLines) return lines;
  const trimmed = lines.slice(0, maxLines);
  trimmed[maxLines - 1] = `${trimmed[maxLines - 1].replace(/[\s.,;:]+$/, "")}…`;
  return trimmed;
}

function Motif({ index, hue }: { index: number; hue: number }) {
  const stroke = `hsl(${hue} 70% 78%)`;
  const fill = `hsl(${(hue + 40) % 360} 65% 70%)`;
  const common = { stroke, strokeWidth: 1.5, fill: "none", opacity: 0.45 };

  switch (index) {
    case 0:
      return (
        <g {...common}>
          {[0, 1, 2, 3, 4].map((i) => (
            <circle key={i} cx={WIDTH / 2} cy={150} r={26 + i * 20} />
          ))}
        </g>
      );
    case 1:
      return (
        <g {...common}>
          {Array.from({ length: 9 }, (_, i) => (
            <line key={i} x1={30} y1={80 + i * 16} x2={WIDTH - 30} y2={80 + i * 16} />
          ))}
        </g>
      );
    case 2:
      return (
        <g {...common}>
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M 40 ${230 - i * 34} Q ${WIDTH / 2} ${140 - i * 34} ${WIDTH - 40} ${230 - i * 34}`}
            />
          ))}
        </g>
      );
    case 3:
      return (
        <g {...common}>
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 3 }, (_, col) => (
              <rect
                key={`${row}-${col}`}
                x={46 + col * 70}
                y={82 + row * 44}
                width={48}
                height={30}
              />
            ))
          )}
        </g>
      );
    case 4:
      return (
        <g {...common}>
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <polyline
              key={i}
              points={`40,${210 - i * 26} ${WIDTH / 2},${160 - i * 26} ${WIDTH - 40},${210 - i * 26}`}
            />
          ))}
        </g>
      );
    default:
      return (
        <g opacity={0.4}>
          <circle cx={WIDTH / 2} cy={152} r={62} fill={fill} opacity={0.55} />
          <circle cx={WIDTH / 2} cy={152} r={62} stroke={stroke} strokeWidth={1.5} fill="none" />
          <circle cx={WIDTH / 2 + 22} cy={134} r={62} stroke={stroke} strokeWidth={1.5} fill="none" />
        </g>
      );
  }
}

interface BookCoverProps {
  title: string;
  author: string;
  slug: string;
  className?: string;
  style?: CSSProperties;
  /** Larger renderings get the full title; grid thumbnails get a tighter clamp. */
  compact?: boolean;
}

export function BookCover({
  title,
  author,
  slug,
  className,
  style,
  compact = false,
}: BookCoverProps) {
  const seed = hash(slug);
  const hue = seed % 360;
  const motif = seed % MOTIF_COUNT;

  const titleLines = wrap(title, compact ? 16 : 18, compact ? 3 : 4);
  const authorLines = wrap(author, 22, 2);
  const titleSize = titleLines.length > 3 ? 25 : 29;
  const titleTop = 300 - (titleLines.length - 1) * (titleSize * 0.6);

  const gradientId = `cover-${seed.toString(36)}`;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      style={style}
      role="img"
      aria-label={`${title} by ${author}`}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={`hsl(${hue} 48% 30%)`} />
          <stop offset="100%" stopColor={`hsl(${(hue + 34) % 360} 55% 15%)`} />
        </linearGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} fill={`url(#${gradientId})`} />

      {/* Spine */}
      <rect width={12} height={HEIGHT} fill="#000" opacity={0.22} />
      <rect x={12} width={2} height={HEIGHT} fill={`hsl(${hue} 70% 80%)`} opacity={0.3} />

      <Motif index={motif} hue={hue} />

      <line
        x1={44}
        y1={245}
        x2={WIDTH - 44}
        y2={245}
        stroke={`hsl(${hue} 70% 82%)`}
        strokeWidth={1}
        opacity={0.6}
      />

      <text
        textAnchor="middle"
        fill="hsl(40 40% 96%)"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={titleSize}
        fontWeight={700}
      >
        {titleLines.map((line, index) => (
          <tspan key={line} x={WIDTH / 2} y={titleTop + index * titleSize * 1.2}>
            {line}
          </tspan>
        ))}
      </text>

      <text
        textAnchor="middle"
        fill={`hsl(${hue} 45% 84%)`}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize={16}
        letterSpacing={1.4}
      >
        {authorLines.map((line, index) => (
          <tspan key={line} x={WIDTH / 2} y={382 + index * 20}>
            {line.toUpperCase()}
          </tspan>
        ))}
      </text>
    </svg>
  );
}
