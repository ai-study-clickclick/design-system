"use client";

import { Gift, Home, LayoutGrid, MoreVertical, Settings, Share, Wallet } from "lucide-react";
import { useState } from "react";
import { BottomNavigation } from "@/components/ui/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TopBar, TopBarBackButton, TopBarCloseButton, TopBarIconButton } from "@/components/ui/top-bar";
import { Board, Example, Grid, Part, Phone } from "../gallery";

export function TopBarDemo() {
  return (
    <Grid>
      <Phone label="뒤로가기 + 제목" bare>
        <TopBar title="이체 내역" left={<TopBarBackButton />} />
      </Phone>
      <Phone label="뒤로가기 + 제목 + 아이콘 1개" bare>
        <TopBar
          title="딸깍 통장"
          left={<TopBarBackButton />}
          right={
            <TopBarIconButton aria-label="설정">
              <Settings aria-hidden />
            </TopBarIconButton>
          }
        />
      </Phone>
      <Phone label="뒤로가기 + 제목 + 아이콘 2개" bare>
        <TopBar
          title="카드 상세"
          left={<TopBarBackButton />}
          right={
            <>
              <TopBarIconButton aria-label="공유">
                <Share aria-hidden />
              </TopBarIconButton>
              <TopBarIconButton aria-label="더보기">
                <MoreVertical aria-hidden />
              </TopBarIconButton>
            </>
          }
        />
      </Phone>
      <Phone label="닫기(위로 덮은 화면 · 완료 화면)" bare>
        <TopBar title="송금 완료" right={<TopBarCloseButton />} />
      </Phone>
      <Phone label="제목 없음 · 뒤로가기만" bare>
        <TopBar left={<TopBarBackButton />} />
      </Phone>
    </Grid>
  );
}

export function TabsDemo() {
  return (
    <Board column>
      <Part title='아래 줄 · 고르면 줄이 미끄러져 이동' column>
        <Example label="size=md · layout=fill · 5개 이하" grow>
          <Tabs defaultValue="all" className="w-[343px]">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="in">입금</TabsTrigger>
              <TabsTrigger value="out">출금</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="pt-16 text-body-md text-neutral-muted">
              전체 거래 내역
            </TabsContent>
            <TabsContent value="in" className="pt-16 text-body-md text-neutral-muted">
              입금 내역
            </TabsContent>
            <TabsContent value="out" className="pt-16 text-body-md text-neutral-muted">
              출금 내역
            </TabsContent>
          </Tabs>
        </Example>
        <Example label="size=sm · layout=hug · 6개 이상" grow>
          <Tabs defaultValue="0" size="sm" layout="hug" className="w-[343px]">
            <TabsList>
              {["전체", "예금", "적금", "대출", "카드", "투자", "보험"].map((t, i) => (
                <TabsTrigger key={t} value={String(i)}>
                  {t}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Example>
      </Part>
    </Board>
  );
}

export function SegmentedControlDemo() {
  const two = [
    { value: "domestic", label: "국내" },
    { value: "overseas", label: "해외" },
  ];
  const three = [
    { value: "1m", label: "1개월" },
    { value: "3m", label: "3개월" },
    { value: "6m", label: "6개월" },
  ];
  return (
    <Board column>
      <Part title="size=md · 높이 40 · 놓인 자리 폭을 똑같이 나눔" column>
        <Example label="2개" grow>
          <div className="w-[343px]">
            <SegmentedControl aria-label="송금 종류" options={two} />
          </div>
        </Example>
        <Example label="3개" grow>
          <div className="w-[343px]">
            <SegmentedControl aria-label="조회 기간" options={three} />
          </div>
        </Example>
      </Part>
      <Part title="size=sm · 높이 32 · 글자만큼">
        <Example label="2개">
          <SegmentedControl size="sm" aria-label="송금 종류" options={two} />
        </Example>
        <Example label="3개">
          <SegmentedControl size="sm" aria-label="조회 기간" options={three} />
        </Example>
      </Part>
    </Board>
  );
}

export function StepperDemo() {
  const [step, setStep] = useState(1);
  return (
    <Grid>
      <Phone label="실제 화면(375 × 812) · TopBar 바로 아래 · 다음을 누르면 늘어남" screen>
        <TopBar title="계좌 개설" left={<TopBarBackButton onClick={() => setStep((v) => Math.max(1, v - 1))} />} />
        <Stepper value={step} total={4} />
        <div className="flex flex-1 flex-col gap-24 px-16 pt-nav-to-title">
          <p className="text-title-lg">{["이름을 알려 주세요", "주민등록번호를 넣어 주세요", "본인 인증을 해 주세요", "비밀번호를 정해 주세요"][step - 1]}</p>
          <Input aria-label="입력" placeholder={["이름", "생년월일 6자리", "휴대폰 번호", "비밀번호 6자리"][step - 1]} />
        </div>
        <div className="px-16 pb-screen-bottom">
          <Button className="w-full" onClick={() => setStep((v) => (v === 4 ? 1 : v + 1))}>
            {step === 4 ? "처음부터" : "다음"}
          </Button>
        </div>
      </Phone>
    </Grid>
  );
}

const navItems = [
  { value: "home", label: "홈", icon: <Home aria-hidden /> },
  { value: "asset", label: "자산", icon: <Wallet aria-hidden /> },
  { value: "benefit", label: "혜택", icon: <Gift aria-hidden /> },
  { value: "all", label: "전체", icon: <LayoutGrid aria-hidden /> },
];

export function BottomNavigationDemo() {
  const [four, setFour] = useState("home");
  const [three, setThree] = useState("home");
  return (
    <Grid>
      <Phone label="항목 4개" bare>
        <BottomNavigation items={navItems} value={four} onValueChange={setFour} />
      </Phone>
      <Phone label="항목 3개" bare>
        <BottomNavigation items={navItems.filter((i) => i.value !== "asset")} value={three} onValueChange={setThree} />
      </Phone>
    </Grid>
  );
}
