/**
 * 계약·청구 상태값 (기획안 '핵심 설계'의 상태 머신 기준)
 * TODO(백엔드 확인): enum 이름을 백엔드와 동일하게 맞추기
 */

export type ContractStatus =
  | 'APPLIED' // 청약
  | 'ACTIVE' // 유지
  | 'LAPSED' // 실효
  | 'PAID_UP' // 납입완료
  | 'PREMIUM_WAIVED' // 납입면제
  | 'TERMINATED'; // 종료

export type ClaimStatus =
  | 'RECEIVED' // 접수
  | 'REVIEWING' // 심사중
  | 'APPROVED' // 승인
  | 'REJECTED' // 거절
  | 'PAID'; // 지급

export const CONTRACT_STATUS_LABEL: Record<ContractStatus, string> = {
  APPLIED: '청약',
  ACTIVE: '유지',
  LAPSED: '실효',
  PAID_UP: '납입완료',
  PREMIUM_WAIVED: '납입면제',
  TERMINATED: '종료',
};

export const CLAIM_STATUS_LABEL: Record<ClaimStatus, string> = {
  RECEIVED: '접수',
  REVIEWING: '심사중',
  APPROVED: '승인',
  REJECTED: '거절',
  PAID: '지급',
};
