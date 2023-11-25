export default function urlBuilder(
  id: string | undefined,
  page: string,
  count: string,
  searchString: string
): string {
  let baseUrl: string = '';
  if (id) {
    baseUrl += `${id}`;
  }
  return (
    baseUrl +
    `?search=${encodeURIComponent(searchString)}&page=${encodeURIComponent(
      page
    )}&count=${encodeURIComponent(count)}`
  );
}
