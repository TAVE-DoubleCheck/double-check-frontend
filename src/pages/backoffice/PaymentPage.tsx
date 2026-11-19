import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function PaymentPage() {
  return (
    <PagePlaceholder
      figma="10 · 14"
      title="지급"
      owner="FE B"
      todos={[
        '지급 대기 목록, 지급 실행, 지급 내역',
        '14 이미 지급된 건: 중복 지급(409) 에러 처리 + 버튼 연타 방지',
      ]}
    />
  );
}
