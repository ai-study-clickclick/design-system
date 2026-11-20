"use client";

import { MoreVertical, Settings, Share } from "lucide-react";
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
              <Settings aria-hidden className="size-24" />
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
                <Share aria-hidden className="size-24" />
              </TopBarIconButton>
              <TopBarIconButton aria-label="더보기">
                <MoreVertical aria-hidden className="size-24" />
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
      <Part title='variant="line" · 아래 줄(기본)' column>
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
        <Example label="disabled 탭" grow>
          <Tabs defaultValue="a" className="w-[343px]">
            <TabsList>
              <TabsTrigger value="a">국내</TabsTrigger>
              <TabsTrigger value="b" disabled>
                해외
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </Example>
      </Part>
      <Part title='variant="solid" · 둥근 칩(임시)' column>
        <Example label="layout=hug · 필터처럼 고르기" grow>
          <Tabs defaultValue="1m" variant="solid" layout="hug" className="w-[343px]">
            <TabsList>
              {[
                ["1w", "1주일"],
                ["1m", "1개월"],
                ["3m", "3개월"],
                ["6m", "6개월"],
              ].map(([v, l]) => (
                <TabsTrigger key={v} value={v}>
                  {l}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </Example>
      </Part>
    </Board>
  );
}
