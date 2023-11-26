export default function urlBuilder(
  id: string | undefined,
  page: string,
  count: string,
  searchString: string
): string {
  let baseUrl: string = '/';
  if (id) {
    baseUrl += `${id.startsWith('/') ? id.slice(1) : id}`;
  }
  return (
    baseUrl +
    `?search=${encodeURIComponent(searchString)}&page=${encodeURIComponent(
      page
    )}&count=${encodeURIComponent(count)}`
  );
}
