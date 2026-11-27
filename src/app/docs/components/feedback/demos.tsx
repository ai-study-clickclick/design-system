"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Banner } from "@/components/ui/banner";
import { BottomSheet, BottomSheetClose } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/ui/list-item";
import { Modal, ModalAction, ModalCancel, ModalFooter } from "@/components/ui/modal";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";
import { Board, Example, Grid, Phone } from "../gallery";

export function ModalDemo() {
  return (
    <Board>
      <Modal trigger={<Button size="md" variant="secondary">버튼 1개 · 확인만</Button>} title="이체 한도를 넘었어요" description="오늘은 1,000만 원까지 보낼 수 있어요">
        <ModalFooter>
          <ModalAction asChild>
            <Button size="md">확인</Button>
          </ModalAction>
        </ModalFooter>
      </Modal>
      <Modal trigger={<Button size="md" variant="secondary">버튼 2개 · 일반</Button>} title="자동이체를 등록할까요?" description="매달 25일에 20만 원이 빠져나가요">
        <ModalFooter>
          <ModalCancel asChild>
            <Button size="md" variant="secondary">취소</Button>
          </ModalCancel>
          <ModalAction asChild>
            <Button size="md">등록하기</Button>
          </ModalAction>
        </ModalFooter>
      </Modal>
      <Modal trigger={<Button size="md" variant="secondary">버튼 2개 · 위험(critical)</Button>} title="계좌를 해지할까요?" description="해지하면 되돌릴 수 없어요">
        <ModalFooter>
          <ModalCancel asChild>
            <Button size="md" variant="secondary">취소</Button>
          </ModalCancel>
          <ModalAction asChild>
            <Button size="md" variant="critical">해지하기</Button>
          </ModalAction>
        </ModalFooter>
      </Modal>
      <Modal
        showCloseButton
        trigger={<Button size="md" variant="secondary">showCloseButton · X 닫기(임시)</Button>}
        title="알림을 켤까요?"
        description="입출금이 생기면 바로 알려 드려요"
      >
        <ModalFooter>
          <ModalAction asChild>
            <Button size="md">알림 켜기</Button>
          </ModalAction>
        </ModalFooter>
      </Modal>
    </Board>
  );
}

function SortOptions() {
  return (
    <RadioGroup size="lg" defaultValue="new">
      <RadioGroupItem value="new" label="최신순" />
      <RadioGroupItem value="old" label="과거순" />
      <RadioGroupItem value="amount" label="금액 큰 순" />
    </RadioGroup>
  );
}

// 고르는 목록: 고른 계좌에 체크, 나머지는 꺼진 체크. 고르면 바로 닫힌다
function AccountSheet() {
  const [value, setValue] = useState("국민은행 1234");
  return (
    <BottomSheet trigger={<Button size="md" variant="secondary">핸들 · 버튼 없음(고르면 바로 닫힘)</Button>} title="계좌 고르기">
      <div className="-mx-(--bottom-sheet-padding)">
        {["국민은행 1234", "신한은행 5678", "토스뱅크 9012"].map((a) => (
          <BottomSheetClose key={a} asChild>
            <ListItem title={a} selected={value === a} onClick={() => setValue(a)} />
          </BottomSheetClose>
        ))}
      </div>
    </BottomSheet>
  );
}

export function BottomSheetDemo() {
  return (
    <Board>
      <AccountSheet />
      <BottomSheet
        trigger={<Button size="md" variant="secondary">핸들 · 버튼 1개</Button>}
        title="정렬"
        footer={
          <BottomSheetClose asChild>
            <Button className="flex-1">적용하기</Button>
          </BottomSheetClose>
        }
      >
        <SortOptions />
      </BottomSheet>
      <BottomSheet trigger={<Button size="md" variant="secondary">닫기 · 버튼 없음</Button>} title="수수료 안내" description="같은 은행 · 다른 은행 모두 무료예요" showCloseButton>
        <p className="text-body-md text-neutral-muted">한 달에 30번까지 수수료 없이 보낼 수 있어요. 그 뒤로는 한 번에 500원이에요.</p>
      </BottomSheet>
      <BottomSheet
        trigger={<Button size="md" variant="secondary">닫기 · 버튼 2개(5:5)</Button>}
        title="이체 시간 바꾸기"
        showCloseButton
        footer={
          <>
            <BottomSheetClose asChild>
              <Button variant="secondary">닫기</Button>
            </BottomSheetClose>
            <BottomSheetClose asChild>
              <Button>바꾸기</Button>
            </BottomSheetClose>
          </>
        }
      >
        <SortOptions />
      </BottomSheet>
      <BottomSheet
        trigger={<Button size="md" variant="secondary">높이 · 긴 목록(최대 높이에서 스크롤)</Button>}
        title="은행 고르기"
        showCloseButton
      >
        <div className="-mx-(--bottom-sheet-padding)">
          {banks.map((b) => (
            <BottomSheetClose key={b} asChild>
              <ListItem title={b} onClick={() => {}} />
            </BottomSheetClose>
          ))}
        </div>
      </BottomSheet>
      <BottomSheet
        trigger={<Button size="md" variant="secondary">높이 · 긴 내용 + 버튼(버튼 고정)</Button>}
        title="약관 확인"
        showCloseButton
        footer={
          <BottomSheetClose asChild>
            <Button className="flex-1">동의하기</Button>
          </BottomSheetClose>
        }
      >
        <div className="flex flex-col gap-12 text-body-md text-neutral-muted">
          {Array.from({ length: 12 }, (_, i) => (
            <p key={i}>
              제{i + 1}조 이 약관은 딸깍 서비스를 이용할 때 회사와 이용자의 권리와 의무를 정합니다. 이용자는 약관에 동의한 뒤 서비스를 이용할 수 있습니다.
            </p>
          ))}
        </div>
      </BottomSheet>
    </Board>
  );
}

const banks = ["국민은행", "신한은행", "우리은행", "하나은행", "농협은행", "기업은행", "토스뱅크", "카카오뱅크", "케이뱅크", "SC제일은행", "씨티은행", "부산은행", "대구은행", "광주은행", "새마을금고", "우체국"];

export function ToastDemo() {
  return (
    <Board>
      <Button size="md" variant="secondary" onClick={() => toast("계좌번호를 복사했어요")}>
        글자만
      </Button>
      <Button size="md" variant="secondary" onClick={() => toast("송금했어요", { icon: <CheckCircle2 aria-hidden /> })}>
        icon(임시)
      </Button>
      <Button
        size="md"
        variant="secondary"
        onClick={() => toast("알림을 껐어요", { icon: <CheckCircle2 aria-hidden />, action: { label: "되돌리기", onClick: () => {} } })}
      >
        icon + 버튼(양끝 정렬)
      </Button>
      <Button
        size="md"
        variant="secondary"
        onClick={() =>
          toast("네트워크가 불안정해서 저장하지 못했어요. 잠시 뒤 다시 시도해 주세요", {
            icon: <AlertCircle aria-hidden />,
            action: { label: "다시 시도", onClick: () => {} },
            duration: 6000,
          })
        }
      >
        2줄 이상
      </Button>
    </Board>
  );
}

export function BannerDemo() {
  return (
    <Grid>
      <Phone label='tone="informative" · dismissible'>
        <Banner tone="informative" description="11월 25일 새벽 2~4시에 점검이 있어요" dismissible />
      </Phone>
      <Phone label='tone="positive" · 제목 있음'>
        <Banner tone="positive" title="연결 완료" description="국민은행 계좌가 연결됐어요" />
      </Phone>
      <Phone label='tone="warning" · 닫기 없음'>
        <Banner tone="warning" description="비밀번호를 바꾼 지 6개월이 지났어요" />
      </Phone>
      <Phone label='tone="critical" · 제목 있음 · 닫기 없음'>
        <Banner tone="critical" title="자동이체 실패" description="잔액이 부족해 적금이 빠져나가지 못했어요" />
      </Phone>
      <Phone label='tone="neutral" · dismissible'>
        <Banner tone="neutral" description="새로운 송금 화면을 써 보세요" dismissible />
      </Phone>
    </Grid>
  );
}

export function SpinnerDemo() {
  return (
    <Board>
      <Example label="size=md · 40 · 전체 화면">
        <Spinner />
      </Example>
      <Example label='tone="brand"'>
        <Spinner tone="brand" />
      </Example>
      <Example label="size=sm · 24 · 요소 안">
        <Spinner size="sm" />
      </Example>
      <Example label='tone="staticWhite" · 어두운 덮개 위'>
        <span className="flex rounded-md bg-overlay p-12">
          <Spinner tone="staticWhite" />
        </span>
      </Example>
    </Board>
  );
}

export function SkeletonDemo() {
  return (
    <Grid>
      <Phone label="목록 불러오는 중 · 아바타 full + 글자 줄 sm" bare>
        <div className="flex flex-col gap-16 p-16">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <Skeleton radius="full" className="size-48" />
              <div className="flex flex-1 flex-col gap-8">
                <Skeleton className="h-16 w-2/3" />
                <Skeleton className="h-12 w-1/3" />
              </div>
            </div>
          ))}
        </div>
      </Phone>
      <Phone label="카드 불러오는 중 · radius=lg">
        <Skeleton radius="lg" className="h-[120px] w-full" />
        <Skeleton className="h-16 w-1/2" />
      </Phone>
    </Grid>
  );
}
