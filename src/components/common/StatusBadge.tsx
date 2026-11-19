import {
  CLAIM_STATUS_LABEL,
  CONTRACT_STATUS_LABEL,
  type ClaimStatus,
  type ContractStatus,
} from '@/types/status';

/**
 * 계약·청구 상태 배지. 가입자·백오피스 화면에서 공통으로 사용.
 * TODO: 색상은 디자인 시스템 확정 후 교체
 */
const COLOR: Record<ContractStatus | ClaimStatus, string> = {
  APPLIED: 'bg-gray-100 text-gray-700',
  ACTIVE: 'bg-blue-50 text-blue-700',
  LAPSED: 'bg-red-50 text-red-700',
  PAID_UP: 'bg-green-50 text-green-700',
  PREMIUM_WAIVED: 'bg-purple-50 text-purple-700',
  TERMINATED: 'bg-gray-200 text-gray-600',
  RECEIVED: 'bg-gray-100 text-gray-700',
  REVIEWING: 'bg-yellow-50 text-yellow-700',
  APPROVED: 'bg-blue-50 text-blue-700',
  REJECTED: 'bg-red-50 text-red-700',
  PAID: 'bg-green-50 text-green-700',
};

type Props =
  | { type: 'contract'; status: ContractStatus }
  | { type: 'claim'; status: ClaimStatus };

export function StatusBadge(props: Props) {
  const label =
    props.type === 'contract'
      ? CONTRACT_STATUS_LABEL[props.status]
      : CLAIM_STATUS_LABEL[props.status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${COLOR[props.status]}`}
    >
      {label}
    </span>
  );
}
