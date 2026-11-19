import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ClaimNewPage() {
  return (
    <PagePlaceholder
      figma="06 · 06-1 · 06-2"
      title="보험금 청구"
      owner="FE A"
      todos={[
        '계약 선택 (실효·종료 계약은 선택 불가)',
        '사고 날짜 선택 (DatePicker)',
        '청구 진행 상태 조회',
      ]}
    />
  );
}
