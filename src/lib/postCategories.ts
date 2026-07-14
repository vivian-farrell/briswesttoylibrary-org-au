/** Display labels for the Posts collection `category` select values. */
export const POST_CATEGORY_LABELS: Record<string, string> = {
  news: 'News',
  event: 'Event',
  volunteer: 'Volunteer',
  announcement: 'Announcement',
}

export function postCategoryLabel(category: string | null | undefined): string | null {
  if (!category) return null
  return POST_CATEGORY_LABELS[category] ?? category
}
