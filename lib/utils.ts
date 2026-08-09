export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function normalizeTable(value?: string | string[]) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return null;

  const match = raw.match(/^\d{1,3}$/);
  if (!match) return null;

  const table = Number.parseInt(raw, 10);
  return table > 0 ? table : null;
}
