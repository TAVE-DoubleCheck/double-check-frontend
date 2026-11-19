/** 33070 → "33,070원" */
export const formatWon = (amount: number) => `${amount.toLocaleString('ko-KR')}원`;

/** "2026-11-19" → "2026.11.19" */
export const formatDate = (iso: string) => iso.slice(0, 10).replace(/-/g, '.');
