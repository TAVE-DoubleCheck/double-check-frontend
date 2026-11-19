import { PagePlaceholder } from '@/components/common/PagePlaceholder';

export function ProductListPage() {
  return (
    <PagePlaceholder
      figma="01 · 01-1"
      title="보험 상품"
      owner="FE A"
      todos={[
        '상품 목록 API 연동 (적재된 우체국보험 상품)',
        '상품 상세: 보장 내용, 약관 링크',
        '가입하기 버튼 → /products/:id/subscribe',
      ]}
    />
  );
}
