import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function SubscribePage() {
  return (
    <PagePlaceholder
      figma="04 · 04-1~4 · 12 · 12-1"
      title="가입하기"
      owner="FE A"
      todos={[
        '납입기간·보험기간·가입금액·관계 선택 (Select 공통 컴포넌트)',
        '실제 요율로 월 보험료 계산 결과 표시',
        '12 가입 불가 조합 처리',
      ]}
    />
  );
}
