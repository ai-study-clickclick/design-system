import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// 클래스 합치기. 글자 스타일(text-title-lg 등)을 글자색(text-neutral 등)과 구분해야
// 뒤에 붙인 색이 글자 크기를 지우지 않는다
const typography = [
  "title-lg", "title-md", "title-sm",
  "body-lg", "body-md", "body-sm",
  "emphasis-md", "caption",
  "label-lg", "label-base", "label-md", "label-sm",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: typography }],
      shadow: [{ shadow: ["s1", "s2", "s3"] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
