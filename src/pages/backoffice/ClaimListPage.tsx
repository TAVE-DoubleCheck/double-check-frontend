import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ClaimListPage() {
  return (
    <PagePlaceholder
      figma="07 · 07-1"
      title="청구 목록"
      owner="FE B"
      todos={[
        '청구 목록 Table + 상태 필터',
        '디자인 변경 가능성 있음: 로직(API 훅) 먼저',
      ]}
    />
  );
}
