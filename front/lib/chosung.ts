// 초성, 중성, 종성의 유니코드 시작점
const GA_START = 0xAC00;

// 초성 리스트
const INITIAL_CONSONANTS = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
];

/**
 * 한글 문자의 초성을 분리합니다.
 * @param char - 한글 문자 하나
 * @returns 분리된 초성, 한글이 아닐 경우 원본 문자 반환
 */
function getInitialConsonant(char: string): string {
  const charCode = char.charCodeAt(0);

  if (charCode < GA_START || charCode > 0xD7A3) {
    return char; // 한글 범위 밖
  }

  const hangulIndex = charCode - GA_START;
  const initialIndex = Math.floor(hangulIndex / (21 * 28));

  return INITIAL_CONSONANTS[initialIndex];
}

/**
 * 주어진 텍스트의 초성 문자열을 생성합니다.
 * @param text - 원본 텍스트
 * @returns 초성으로만 이루어진 문자열
 */
function getChosungString(text: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += getInitialConsonant(text[i]);
  }
  return result;
}

/**
 * 텍스트에 쿼리(초성 포함)가 포함되어 있는지 확인합니다.
 * @param text - 검색 대상 텍스트 (예: "대한민국")
 * @param query - 검색어 (예: "ㄷㅎ", "대한")
 * @returns 포함 여부 (boolean)
 */
export function chosungIncludes(text: string, query: string): boolean {
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();

    // 1. 원본 텍스트에 검색어가 그대로 포함되어 있는지 확인
    if (lowerText.includes(lowerQuery)) {
        return true;
    }

    // 2. 초성으로 변환하여 확인
    const chosungText = getChosungString(lowerText);
    return chosungText.includes(lowerQuery);
}


