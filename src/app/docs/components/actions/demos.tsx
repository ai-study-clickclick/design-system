"use client";

import { useState } from "react";
import { Bell, Heart, Plus, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { TextButton } from "@/components/ui/text-button";
import { Board, Example, Part, Phone } from "../gallery";

const variants = ["primary", "primaryWeak", "neutral", "secondary", "critical", "outline"] as const;
const sizeTitle = {
  lg: "size=lg · 높이 52 · 라운드 12 · 글자 18 · 하단 고정",
  md: "size=md · 높이 44 · 라운드 10(임시) · 글자 14 · 본문 · 상태 화면",
  sm: "size=sm · 높이 36 · 라운드 8 · 글자 14(임시) · 카드 · 목록 안",
};
const labels = { primary: "송금하기", primaryWeak: "혜택 보기", neutral: "계좌 연결", secondary: "취소", critical: "해지하기", outline: "다시 시도" };

export function ButtonSizes() {
  return (
    <Board column>
      {(["lg", "md", "sm"] as const).map((size) => (
        <Part key={size} title={sizeTitle[size]}>
          {variants.map((variant) => (
            <Example key={variant} label={`variant=${variant}`}>
              <Button variant={variant} size={size}>
                {labels[variant]}
              </Button>
            </Example>
          ))}
        </Part>
      ))}
    </Board>
  );
}

export function ButtonStates() {
  const [loading, setLoading] = useState(false);
  return (
    <Board>
      <Example label="기본">
        <Button>이체하기</Button>
      </Example>
      <Example label="disabled · 다 채우기 전">
        <Button disabled>이체하기</Button>
      </Example>
      <Example label="loading · 1초 뒤 Spinner">
        <Button loading>이체하기</Button>
      </Example>
      <Example label="눌러서 확인 · 3초 로딩">
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          이체하기
        </Button>
      </Example>
      <Example label="outline · disabled">
        <Button variant="outline" disabled>
          다시 시도
        </Button>
      </Example>
      <Example label="size=md · loading">
        <Button size="md" variant="secondary" loading>
          조회하기
        </Button>
      </Example>
    </Board>
  );
}

export function ButtonLayouts() {
  return (
    <Board>
      <Phone label="하단 고정 · 꽉 찬 버튼 1개">
        <Button className="w-full">다음</Button>
      </Phone>
      <Phone label="하단 고정 · 반반 5:5">
        <div className="flex gap-8 *:flex-1">
          <Button variant="secondary">나중에 하기</Button>
          <Button>연결하기</Button>
        </div>
      </Phone>
      <Phone label="하단 고정 · 닫기 + 채움 3:7">
        <div className="flex gap-8">
          <Button variant="secondary" className="flex-3">
            닫기
          </Button>
          <Button className="flex-7">송금하기</Button>
        </div>
      </Phone>
      <Phone label="본문 안 · size=md 버튼 묶음">
        <div className="flex gap-8">
          <Button size="md" variant="secondary">
            내역 보기
          </Button>
          <Button size="md" variant="secondary">
            한도 변경
          </Button>
        </div>
      </Phone>
    </Board>
  );
}

export function IconButtonDemo() {
  return (
    <Board column>
      <Part title='variant="ghost" · 배경 없음'>
        <Example label="size=md · 40(아이콘 24)">
          <IconButton aria-label="검색"><Search aria-hidden /></IconButton>
          <IconButton aria-label="알림"><Bell aria-hidden /></IconButton>
          <IconButton aria-label="설정"><Settings aria-hidden /></IconButton>
        </Example>
        <Example label="size=sm · 32(아이콘 20)">
          <IconButton size="sm" aria-label="검색"><Search aria-hidden /></IconButton>
          <IconButton size="sm" aria-label="알림"><Bell aria-hidden /></IconButton>
          <IconButton size="sm" aria-label="설정"><Settings aria-hidden /></IconButton>
        </Example>
        <Example label="disabled">
          <IconButton aria-label="관심" disabled><Heart aria-hidden /></IconButton>
        </Example>
      </Part>
      <Part title='variant="weak" · 연한 회색 면'>
        <Example label="size=md">
          <IconButton variant="weak" aria-label="추가"><Plus aria-hidden /></IconButton>
        </Example>
        <Example label="size=sm">
          <IconButton variant="weak" size="sm" aria-label="추가"><Plus aria-hidden /></IconButton>
        </Example>
        <Example label="disabled">
          <IconButton variant="weak" aria-label="추가" disabled><Plus aria-hidden /></IconButton>
        </Example>
      </Part>
    </Board>
  );
}

export function TextButtonDemo() {
  return (
    <Board column>
      <Part title='tone="neutral" · 기본'>
        <Example label="size=md">
          <TextButton>다시 보내기</TextButton>
        </Example>
        <Example label="size=md · withArrow(이동)">
          <TextButton withArrow>전체 보기</TextButton>
        </Example>
        <Example label="size=sm · withArrow">
          <TextButton size="sm" withArrow>전체 보기</TextButton>
        </Example>
      </Part>
      <Part title='tone="brand" · 강조'>
        <Example label="size=md">
          <TextButton tone="brand">인증번호 다시 받기</TextButton>
        </Example>
        <Example label="disabled">
          <TextButton tone="brand" disabled>인증번호 다시 받기</TextButton>
        </Example>
      </Part>
      <Part title="실제 화면">
        <Phone label="구역 제목 + 전체 보기">
          <div className="flex items-center justify-between">
            <p className="text-title-sm">최근 거래</p>
            <TextButton withArrow>전체 보기</TextButton>
          </div>
        </Phone>
      </Part>
    </Board>
  );
}
