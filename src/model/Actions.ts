const categoryActions: Record<string, string> = {
  digital: 'download',
  subscription: 'subscribe',
  service: 'request',
};

export function getActionWord(category: string | null): string {
  if (!category) return 'buy';

  return categoryActions[category] ?? 'buy';
}
