// 숫자 포맷터 소수점두자리수,
export function formatNumber(value: number, digit: number = 0) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  }).format(value);
}

export function truncateToTwoDecimals(num: number) {
  return Math.floor(num * 100) / 100;
}

export function truncateToEok(num: number) {
  const eokValue = Math.floor(num / 1e8);
  // '억원' 문자열을 붙여서 반환
  return `${eokValue}억원`;
}
