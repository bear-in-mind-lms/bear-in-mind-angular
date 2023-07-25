import { ApiResponse } from '../app/api/api-response';

export function toPageApiResponse<ContentType>(
  content: ContentType[],
  page: number,
  pageSize: number,
) {
  const start = pageSize * page;
  const end = start + pageSize - 1;

  return ApiResponse.success({
    content: content.slice(start, end),
    totalPages: Math.ceil(content.length / pageSize),
  });
}
