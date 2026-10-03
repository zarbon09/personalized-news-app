export function formatRelativeTime(iso: string) {
  const hours = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 3_600_000));
  return hours < 24 ? `${hours}h ago` : `${Math.round(hours / 24)}d ago`;
}

export function cn(...values: Array<string | false | null | undefined>) { return values.filter(Boolean).join(" ") }
