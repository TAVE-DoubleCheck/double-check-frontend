import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function SystemPage() {
  return (
    <PagePlaceholder
      figma="11"
      title="시스템 관리"
      owner="FE B"
      todos={[
        '시계 이동 (+1일 / +1개월 / +1년)',
        '장부 검증 결과, 적재 로그',
      ]}
    />
  );
}
