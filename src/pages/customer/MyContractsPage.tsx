import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function MyContractsPage() {
  return (
    <PagePlaceholder
      figma="05 · 13"
      title="내 계약"
      owner="FE B"
      todos={[
        '계약 목록·상태 배지 (StatusBadge)',
        '납입 내역, 납입하기, 자동이체 ON/OFF',
        '13 계약 실효 상태 표시',
      ]}
    />
  );
}
