"use client";

import { useState } from "react";
import { Bell, Search, Settings } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Banner } from "@/components/ui/banner";
import { BottomSheet, BottomSheetClose } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/list-item";
import { Modal, ModalAction, ModalCancel, ModalFooter } from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Select } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";
import { TopBar, TopBarBackButton, TopBarIconButton } from "@/components/ui/top-bar";

// 갤러리 견본. 사이트 틀이라 견본 배치에만 대괄호 값을 쓴다(docs/CONVENTIONS.md "코드에서 쓰기" 예외)
function Preview({ children, column }: { children: React.ReactNode; column?: boolean }) {
  return (
    <div
      className={
        column
          ? "flex max-w-[375px] flex-col gap-16 rounded-lg border border-neutral-weak bg-layer-default p-24"
          : "flex flex-wrap items-center gap-12 rounded-lg border border-neutral-weak bg-layer-default p-24"
      }
    >
      {children}
    </div>
  );
}

export function ButtonDemo() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex flex-col gap-16">
      <Preview>
        <Button>확인</Button>
        <Button variant="secondary">취소</Button>
        <Button variant="critical">삭제하기</Button>
        <Button variant="outline">다시 시도</Button>
      </Preview>
      <Preview>
        <Button size="md">확인</Button>
        <Button size="md" variant="secondary">취소</Button>
        <Button size="md" variant="critical">삭제하기</Button>
        <Button size="md" variant="outline">다시 시도</Button>
      </Preview>
      <Preview>
        <Button disabled>확인</Button>
        <Button variant="outline" disabled>다시 시도</Button>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 3000);
          }}
        >
          저장하기
        </Button>
      </Preview>
    </div>
  );
}

export function SpinnerDemo() {
  return (
    <Preview>
      <Spinner />
      <Spinner tone="brand" />
      <Spinner size="sm" />
      <Spinner size="sm" tone="brand" />
      <span className="flex rounded-md bg-overlay p-12">
        <Spinner tone="staticWhite" />
      </span>
    </Preview>
  );
}

const tones = ["neutral", "brand", "informative", "positive", "warning", "critical"] as const;

export function BadgeDemo() {
  return (
    <div className="flex flex-col gap-16">
      {(["weak", "solid", "outline"] as const).map((variant) => (
        <Preview key={variant}>
          {tones.map((tone) => (
            <Badge key={tone} variant={variant} tone={tone}>
              {tone}
            </Badge>
          ))}
        </Preview>
      ))}
    </div>
  );
}

export function SkeletonDemo() {
  return (
    <Preview column>
      <div className="flex items-center gap-12">
        <Skeleton radius="full" className="size-48" />
        <div className="flex flex-1 flex-col gap-8">
          <Skeleton className="h-16 w-2/3" />
          <Skeleton className="h-12 w-1/3" />
        </div>
      </div>
      <Skeleton radius="lg" className="h-[120px] w-full" />
    </Preview>
  );
}

export function AvatarDemo() {
  return (
    <Preview>
      <Avatar fallback="한" />
      <Avatar />
    </Preview>
  );
}

export function CardDemo() {
  return (
    <Preview column>
      <Card>
        <CardHeader>
          <CardTitle>이번 달 소비</CardTitle>
          <Badge tone="brand">새 리포트</Badge>
        </CardHeader>
        <CardDescription>지난달보다 12만 원 덜 썼어요</CardDescription>
        <CardContent>1,240,000원</CardContent>
        <CardFooter>
          <Button size="md" variant="secondary">
            자세히 보기
          </Button>
        </CardFooter>
      </Card>
    </Preview>
  );
}

export function InputDemo() {
  return (
    <Preview column>
      <Input label="이름" placeholder="이름을 입력해 주세요" description="실명으로 입력해 주세요" />
      <Input label="이메일" defaultValue="abc@" invalid errorMessage="이메일 형식이 맞지 않아요" />
      <Input label="금액" placeholder="0" suffix="원" inputMode="numeric" />
      <Input label="검색" placeholder="검색어" prefix={<Search className="size-20" aria-hidden />} />
      <Input label="아이디" defaultValue="clickclick" disabled />
    </Preview>
  );
}

export function TextareaDemo() {
  const [text, setText] = useState("");
  return (
    <Preview column>
      <Textarea
        label="후기"
        placeholder="후기를 남겨 주세요"
        maxLength={200}
        value={text}
        onChange={(e) => setText(e.target.value)}
        description="글이 늘면 칸도 늘어나요"
      />
      <Textarea label="메모" placeholder="짧게 적어 주세요" autoSize={false} />
    </Preview>
  );
}

export function SelectDemo() {
  return (
    <Preview column>
      <Select
        label="은행"
        options={[
          { value: "kb", label: "국민은행" },
          { value: "shinhan", label: "신한은행" },
          { value: "woori", label: "우리은행" },
          { value: "hana", label: "하나은행" },
        ]}
        placeholder="은행을 골라 주세요"
      />
      <Select label="통신사" options={[]} invalid errorMessage="통신사를 골라 주세요" />
    </Preview>
  );
}

export function CheckboxDemo() {
  return (
    <Preview column>
      <Checkbox label="전체 동의" size="lg" />
      <Checkbox label="서비스 이용약관 동의(필수)" defaultChecked />
      <Checkbox label="일부 선택" checked="indeterminate" />
      <Checkbox label="마케팅 수신 동의" variant="ghost" defaultChecked />
      <Checkbox label="비활성" disabled />
    </Preview>
  );
}

export function RadioDemo() {
  return (
    <Preview column>
      <RadioGroup defaultValue="card">
        <RadioGroupItem value="card" label="카드" />
        <RadioGroupItem value="account" label="계좌이체" />
        <RadioGroupItem value="phone" label="휴대폰 결제" disabled />
      </RadioGroup>
      <RadioGroup size="lg" defaultValue="a">
        <RadioGroupItem value="a" label="큰 크기" />
        <RadioGroupItem value="b" label="큰 크기" />
      </RadioGroup>
    </Preview>
  );
}

export function SwitchDemo() {
  return (
    <Preview column>
      <Switch size="sm" label="작은 크기" defaultChecked />
      <Switch label="알림 받기" defaultChecked />
      <Switch size="lg" label="큰 크기" />
      <Switch label="비활성" disabled />
    </Preview>
  );
}

export function TabsDemo() {
  return (
    <Preview column>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="in">입금</TabsTrigger>
          <TabsTrigger value="out">출금</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="pt-16 text-body-md">전체 내역</TabsContent>
        <TabsContent value="in" className="pt-16 text-body-md">입금 내역</TabsContent>
        <TabsContent value="out" className="pt-16 text-body-md">출금 내역</TabsContent>
      </Tabs>
      <Tabs defaultValue="1" size="sm" layout="hug">
        <TabsList>
          {["추천", "인기", "새로 나온", "할인", "브랜드", "카테고리"].map((t, i) => (
            <TabsTrigger key={t} value={String(i + 1)}>
              {t}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </Preview>
  );
}

export function ListItemDemo() {
  return (
    <div className="max-w-[375px] overflow-hidden rounded-lg border border-neutral-weak bg-layer-default py-8">
      <ListItem title="알림" description="새 소식을 알려 드려요" prefix={<Bell className="size-24" aria-hidden />} withArrow onClick={() => {}} />
      <ListItem title="한나" description="오늘 오후 2:30" prefix={<Avatar fallback="한" />} suffix={<Badge tone="positive">완료</Badge>} />
      <ListItem title="자동 로그인" suffix={<Switch aria-label="자동 로그인" defaultChecked />} />
      <ListItem title="비활성" withArrow disabled />
    </div>
  );
}

export function TopBarDemo() {
  return (
    <div className="max-w-[375px] overflow-hidden rounded-lg border border-neutral-weak">
      <TopBar
        title="내 정보"
        left={<TopBarBackButton />}
        right={
          <TopBarIconButton aria-label="설정">
            <Settings className="size-24" aria-hidden />
          </TopBarIconButton>
        }
      />
    </div>
  );
}

export function BottomSheetDemo() {
  return (
    <Preview>
      <BottomSheet
        trigger={<Button variant="secondary">시트 열기</Button>}
        title="정렬"
        description="원하는 순서를 골라 주세요"
        showCloseButton
        footer={
          <BottomSheetClose asChild>
            <Button className="flex-1">적용하기</Button>
          </BottomSheetClose>
        }
      >
        <RadioGroup defaultValue="new">
          <RadioGroupItem value="new" label="최신순" />
          <RadioGroupItem value="price" label="가격 낮은순" />
        </RadioGroup>
      </BottomSheet>
    </Preview>
  );
}

export function ModalDemo() {
  return (
    <Preview>
      <Modal
        trigger={<Button variant="critical">탈퇴하기</Button>}
        title="정말 탈퇴할까요?"
        description="탈퇴하면 내역을 되돌릴 수 없어요"
      >
        <ModalFooter>
          <ModalCancel asChild>
            <Button variant="secondary">취소</Button>
          </ModalCancel>
          <ModalAction asChild>
            <Button variant="critical">탈퇴하기</Button>
          </ModalAction>
        </ModalFooter>
      </Modal>
    </Preview>
  );
}

export function ToastDemo() {
  return (
    <Preview>
      <Button variant="secondary" onClick={() => toast("저장했어요")}>
        Toast 띄우기
      </Button>
      <Button variant="secondary" onClick={() => toast("삭제했어요", { action: { label: "되돌리기", onClick: () => {} } })}>
        버튼 있는 Toast
      </Button>
    </Preview>
  );
}

export function BannerDemo() {
  return (
    <div className="flex max-w-[375px] flex-col gap-12">
      <Banner tone="informative" description="점검으로 오늘 밤 12시부터 1시간 동안 쉬어요" dismissible />
      <Banner tone="positive" title="연결됨" description="계좌가 연결됐어요" />
      <Banner tone="warning" description="비밀번호를 바꾼 지 6개월이 지났어요" />
      <Banner tone="critical" title="결제 실패" description="카드 한도를 확인해 주세요" />
      <Banner tone="neutral" description="새 기능이 생겼어요" dismissible />
    </div>
  );
}

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Preview>
      <Calendar mode="single" selected={date} onSelect={setDate} />
    </Preview>
  );
}
