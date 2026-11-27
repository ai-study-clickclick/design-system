"use client";

import { ArrowLeftRight, Bell, ChevronRight, CreditCard, PiggyBank, Wallet } from "lucide-react";
import { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardHeading, CardImageSlot, CardTitle } from "@/components/ui/card";
import { ListItem } from "@/components/ui/list-item";
import { Board, Example, Grid, Part, Phone } from "../gallery";

// 견본 이미지 대신 쓰는 회색 면(실제 이미지 자리). 라운드는 CardImageSlot이 정한다
function ImagePlaceholder({ label }: { label: string }) {
  return (
    <CardImageSlot className="flex aspect-video items-center justify-center bg-neutral-weak text-label-sm text-neutral-subtle">
      {label}
    </CardImageSlot>
  );
}

// 견본용 가짜 로고(실제 회사 로고 아님). 이미지 안의 색이라 토큰이 아닌 그림 색을 쓴다
function fakeLogo(bg: string, fg: string, shape: "circle" | "bars" | "diamond") {
  const mark =
    shape === "circle"
      ? `<circle cx="24" cy="24" r="10" fill="${fg}"/><circle cx="24" cy="24" r="4" fill="${bg}"/>`
      : shape === "bars"
        ? `<rect x="14" y="14" width="6" height="20" rx="3" fill="${fg}"/><rect x="24" y="20" width="6" height="14" rx="3" fill="${fg}"/>`
        : `<rect x="16" y="16" width="16" height="16" rx="4" transform="rotate(45 24 24)" fill="${fg}"/>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="${bg}"/>${mark}</svg>`)}`;
}
const logos = {
  coffee: fakeLogo("#1fb877", "#ffffff", "circle"),
  person: fakeLogo("#7c5cff", "#ffe066", "diamond"),
  saving: fakeLogo("#ff8a3d", "#ffffff", "bars"),
};

export function CardDemo() {
  return (
    <Grid>
      <Phone label="기본 · 제목 + 부제">
        <Card>
          <CardHeading>
            <CardTitle>이번 달 소비</CardTitle>
            <CardDescription>11월 1일 ~ 11월 20일</CardDescription>
          </CardHeading>
          <CardContent className="text-title-lg">1,240,000원</CardContent>
        </Card>
      </Phone>
      <Phone label="태그 + 오른쪽 이동">
        <Card>
          <CardHeader>
            <CardHeading>
              <CardTitle>딸깍 적금</CardTitle>
              <CardDescription>연 3.5% · 12개월</CardDescription>
            </CardHeading>
            <Badge tone="brand">
              추천
            </Badge>
          </CardHeader>
        </Card>
      </Phone>
      <Phone label="아이콘 + 행동(작은 버튼)">
        <Card>
          <CardHeader>
            <span className="flex size-40 shrink-0 items-center justify-center rounded-md bg-neutral-weak">
              <Wallet aria-hidden className="size-24" />
            </span>
            <CardHeading>
              <CardTitle>국민은행 통장</CardTitle>
              <CardDescription>1234-56-789012</CardDescription>
            </CardHeading>
            <CardAction>
              <Button size="sm" variant="secondary">
                송금
              </Button>
            </CardAction>
          </CardHeader>
        </Card>
      </Phone>
      <Phone label="이미지 + 꽉 찬 버튼">
        <Card>
          <ImagePlaceholder label="이벤트 이미지" />
          <CardHeading>
            <CardTitle>첫 송금하면 1,000원</CardTitle>
            <CardDescription>11월 30일까지 한 번만 받을 수 있어요</CardDescription>
          </CardHeading>
          <CardFooter>
            <Button size="md" className="w-full">
              혜택 받기
            </Button>
          </CardFooter>
        </Card>
      </Phone>
      <Phone label="버튼 없음 · 누르면 이동">
        <Card>
          <CardHeader>
            <CardHeading>
              <CardTitle>신용점수 조회</CardTitle>
              <CardDescription>조회해도 점수가 떨어지지 않아요</CardDescription>
            </CardHeading>
            <ChevronRight aria-hidden className="size-(--chevron-size) shrink-0 text-neutral-subtle" />
          </CardHeader>
        </Card>
      </Phone>
    </Grid>
  );
}

function SelectableRows() {
  const [value, setValue] = useState("국민은행 1234");
  return (
    <div className="w-[343px] rounded-md border border-neutral-weak">
      {["국민은행 1234", "신한은행 5678"].map((a) => (
        <ListItem key={a} title={a} selected={value === a} onClick={() => setValue(a)} />
      ))}
    </div>
  );
}

export function ListItemDemo() {
  return (
    <Board column>
      <Part title="한 줄 구성" column>
        <Example label="title만" grow>
          <div className="w-[343px] rounded-md border border-neutral-weak">
            <ListItem title="계좌 관리" />
          </div>
        </Example>
        <Example label="title + selected(고르는 목록 · 꺼짐 · 켜짐)" grow>
          <SelectableRows />
        </Example>
        <Example label="title + description + withArrow(이동)" grow>
          <div className="w-[343px] rounded-md border border-neutral-weak">
            <ListItem title="이체 한도" description="1회 500만 원 · 1일 1,000만 원" withArrow onClick={() => {}} />
          </div>
        </Example>
        <Example label="prefix 아이콘 + suffix 값" grow>
          <div className="w-[343px] rounded-md border border-neutral-weak">
            <ListItem title="포인트" prefix={<PiggyBank aria-hidden className="size-24" />} suffix={<span className="text-label-base">12,300P</span>} />
          </div>
        </Example>
        <Example label="prefix Avatar + suffix Badge" grow>
          <div className="w-[343px] rounded-md border border-neutral-weak">
            <ListItem title="김딸깍" description="오늘 오후 2:30" prefix={<Avatar src={logos.person} fallback="김" />} suffix={<Badge tone="positive">완료</Badge>} />
          </div>
        </Example>
        <Example label="disabled" grow>
          <div className="w-[343px] rounded-md border border-neutral-weak">
            <ListItem title="해외 송금" description="지금은 쓸 수 없어요" withArrow disabled />
          </div>
        </Example>
      </Part>
      <Part title="실제 화면">
        <Phone label="거래 내역" bare>
          <div className="py-8">
            <p className="px-16 pt-8 pb-4 text-label-md text-neutral-subtle">11월 20일</p>
            <ListItem size="md" title="스타벅스" description="오전 8:42 · 체크카드" prefix={<Avatar src={logos.coffee} fallback="스" />} suffix={<span className="text-label-base">-5,600원</span>} onClick={() => {}} />
            <ListItem size="md" title="김딸깍" description="오전 11:05 · 이체" prefix={<Avatar src={logos.person} fallback="김" />} suffix={<span className="text-label-base text-informative">+30,000원</span>} onClick={() => {}} />
            <ListItem size="md" title="딸깍 적금" description="오후 1:00 · 자동이체" prefix={<Avatar src={logos.saving} fallback="적" />} suffix={<span className="text-label-base">-200,000원</span>} onClick={() => {}} />
          </div>
        </Phone>
        <Phone label="메뉴 목록" bare>
          <div className="py-8">
            <ListItem title="계좌" prefix={<Wallet aria-hidden className="size-24" />} withArrow onClick={() => {}} />
            <ListItem title="카드" prefix={<CreditCard aria-hidden className="size-24" />} suffix={<Badge tone="brand">새 혜택</Badge>} withArrow onClick={() => {}} />
            <ListItem title="송금 · 이체" prefix={<ArrowLeftRight aria-hidden className="size-24" />} withArrow onClick={() => {}} />
            <ListItem title="알림" prefix={<Bell aria-hidden className="size-24" />} withArrow onClick={() => {}} />
          </div>
        </Phone>
      </Part>
    </Board>
  );
}

const tones = ["neutral", "brand", "informative", "positive", "warning", "critical"] as const;
const toneLabels = { neutral: "보통", brand: "추천", informative: "안내", positive: "완료", warning: "확인 필요", critical: "실패" };

export function BadgeDemo() {
  return (
    <Board title="최소 높이 24 · 글자 12" column>
      {(["weak", "solid", "outline"] as const).map((variant) => (
        <Example key={variant} label={`variant=${variant}`}>
          {tones.map((tone) => (
            <Badge key={tone} variant={variant} tone={tone}>
              {toneLabels[tone]}
            </Badge>
          ))}
        </Example>
      ))}
    </Board>
  );
}

export function AvatarDemo() {
  return (
    <Board>
      <Example label="사진 없음 · 글자">
        <Avatar fallback="김" />
      </Example>
      <Example label="사진 없음 · 기본 아이콘">
        <Avatar />
      </Example>
    </Board>
  );
}
