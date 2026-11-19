import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function DeathClaimNewPage() {
  return (
    <PagePlaceholder
      figma="09 · 09-1 · 09-2"
      title="사망 청구 접수"
      owner="FE B"
      todos={[
        '사망일 선택, 청구인 관계 선택',
        '디자인 변경 가능성 있음',
      ]}
    />
  );
}
