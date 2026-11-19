import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ClaimDetailPage() {
  return (
    <PagePlaceholder
      figma="08 · 08-1"
      title="심사 상세"
      owner="FE B"
      todos={[
        '승인 / 거절(사유 필수, 08-1)',
        '상태 이력(감사 로그) 표시',
      ]}
    />
  );
}
