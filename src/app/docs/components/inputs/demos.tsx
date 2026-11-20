"use client";

import { useState } from "react";
import { addDays } from "date-fns";
import type { DateRange } from "react-day-picker";
import { Search } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { DateInput } from "@/components/ui/date-input";
import { Input } from "@/components/ui/input";
import { ListItem } from "@/components/ui/list-item";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio";
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Board, Example, Grid, Part, Phone } from "../gallery";

const banks = [
  { value: "kb", label: "국민은행" },
  { value: "shinhan", label: "신한은행" },
  { value: "woori", label: "우리은행" },
  { value: "hana", label: "하나은행" },
  { value: "toss", label: "토스뱅크" },
];

export function InputStates() {
  return (
    <Grid>
      <Phone label="기본 · 도움말">
        <Input label="받는 분 이름" placeholder="이름을 입력해 주세요" description="계좌 예금주 이름과 같아야 해요" />
      </Phone>
      <Phone label="입력됨">
        <Input label="받는 분 이름" defaultValue="김딸깍" />
      </Phone>
      <Phone label="invalid · 오류 문구">
        <Input label="계좌번호" defaultValue="1234-56" invalid errorMessage="계좌번호를 다시 확인해 주세요" inputMode="numeric" />
      </Phone>
      <Phone label="disabled">
        <Input label="예금주" defaultValue="김딸깍" disabled />
      </Phone>
      <Phone label="suffix · 단위">
        <Input label="보낼 금액" placeholder="0" suffix="원" inputMode="numeric" />
      </Phone>
      <Phone label="prefix · 아이콘">
        <Input label="검색" placeholder="은행 · 증권사 이름" prefix={<Search className="size-20" aria-hidden />} />
      </Phone>
    </Grid>
  );
}

export function DateInputDemo() {
  return (
    <Grid>
      <Phone label="기본 · 누르면 바텀시트 캘린더">
        <DateInput label="이체 예약일" description="오늘 이후 날짜만 고를 수 있어요" disabledDates={{ before: new Date() }} />
      </Phone>
      <Phone label="입력됨">
        <DateInput label="생년월일" defaultValue={new Date(1995, 4, 12)} />
      </Phone>
      <Phone label="invalid">
        <DateInput label="만기일" invalid errorMessage="만기일을 골라 주세요" />
      </Phone>
    </Grid>
  );
}

export function TextareaDemo() {
  const [text, setText] = useState("");
  return (
    <Grid>
      <Phone label="autoSize=true(기본) · maxLength">
        <Textarea
          label="문의 내용"
          placeholder="궁금한 점을 적어 주세요"
          maxLength={300}
          value={text}
          onChange={(e) => setText(e.target.value)}
          description="글이 늘면 칸도 늘어나요"
        />
      </Phone>
      <Phone label="autoSize=false · 2줄 고정">
        <Textarea label="송금 메모" placeholder="받는 분에게 보일 메모" autoSize={false} />
      </Phone>
      <Phone label="invalid">
        <Textarea label="해지 사유" invalid errorMessage="사유를 10자 이상 적어 주세요" defaultValue="그냥요" />
      </Phone>
    </Grid>
  );
}

export function SelectDemo() {
  return (
    <Board column>
      <Part>
        <Phone label="variant=box · 기본">
          <Select label="은행" options={banks} placeholder="은행을 골라 주세요" />
        </Phone>
        <Phone label="variant=box · 선택됨">
          <Select label="은행" options={banks} defaultValue="shinhan" />
        </Phone>
        <Phone label="variant=box · invalid">
          <Select label="통신사" options={[]} invalid errorMessage="통신사를 골라 주세요" />
        </Phone>
      </Part>
      <Part title="variant=plain · 테두리 없는 작은 선택(정렬 · 기간 필터)">
        <Example label="정렬">
          <Select
            variant="plain"
            sheetTitle="정렬"
            defaultValue="new"
            options={[
              { value: "new", label: "최신순" },
              { value: "old", label: "과거순" },
            ]}
          />
        </Example>
        <Example label="기간">
          <Select
            variant="plain"
            sheetTitle="조회 기간"
            defaultValue="1m"
            options={[
              { value: "1w", label: "1주일" },
              { value: "1m", label: "1개월" },
              { value: "3m", label: "3개월" },
            ]}
          />
        </Example>
      </Part>
    </Board>
  );
}

export function CheckboxDemo() {
  const items = ["서비스 이용약관 동의(필수)", "개인정보 수집 · 이용 동의(필수)", "마케팅 정보 수신 동의(선택)"];
  const [checked, setChecked] = useState([true, false, false]);
  const all = checked.every(Boolean);
  const some = checked.some(Boolean);
  return (
    <Board column>
      <Part title="variant=square">
        <Example label="size=md · 꺼짐">
          <Checkbox label="동의해요" />
        </Example>
        <Example label="size=md · 켜짐">
          <Checkbox label="동의해요" defaultChecked />
        </Example>
        <Example label="size=md · 일부 선택">
          <Checkbox label="전체 동의" checked="indeterminate" />
        </Example>
        <Example label="size=lg">
          <Checkbox label="전체 동의" size="lg" defaultChecked />
        </Example>
        <Example label="disabled">
          <Checkbox label="동의해요" disabled />
        </Example>
        <Example label="invalid">
          <Checkbox label="필수 약관 동의" invalid />
        </Example>
      </Part>
      <Part title="variant=ghost · 필수가 아니고 3개 이하">
        <Example label="꺼짐">
          <Checkbox variant="ghost" label="자동 이체 알림" />
        </Example>
        <Example label="켜짐">
          <Checkbox variant="ghost" label="자동 이체 알림" defaultChecked />
        </Example>
        <Example label="size=lg · 켜짐">
          <Checkbox variant="ghost" size="lg" label="자동 이체 알림" defaultChecked />
        </Example>
      </Part>
      <Part title="실제 화면">
        <Phone label="약관 동의(부모 · 자식 묶음)">
          <Checkbox
            size="lg"
            label="전체 동의"
            checked={all ? true : some ? "indeterminate" : false}
            onCheckedChange={() => setChecked(items.map(() => !all))}
          />
          <div className="flex flex-col border-t border-neutral-weak pt-8">
            {items.map((label, i) => (
              <Checkbox
                key={label}
                label={label}
                checked={checked[i]}
                onCheckedChange={(v) => setChecked(checked.map((c, j) => (j === i ? v === true : c)))}
              />
            ))}
          </div>
        </Phone>
      </Part>
    </Board>
  );
}

export function RadioDemo() {
  return (
    <Board column>
      <Part title="size">
        <Example label="size=md">
          <RadioGroup defaultValue="a">
            <RadioGroupItem value="a" label="켜짐" />
            <RadioGroupItem value="b" label="꺼짐" />
          </RadioGroup>
        </Example>
        <Example label="size=lg">
          <RadioGroup size="lg" defaultValue="a">
            <RadioGroupItem value="a" label="켜짐" />
            <RadioGroupItem value="b" label="꺼짐" />
          </RadioGroup>
        </Example>
        <Example label="disabled">
          <RadioGroup defaultValue="a" disabled>
            <RadioGroupItem value="a" label="켜짐" />
            <RadioGroupItem value="b" label="꺼짐" />
          </RadioGroup>
        </Example>
      </Part>
      <Part title="실제 화면">
        <Phone label="결제 수단 고르기">
          <p className="text-title-sm">결제 수단</p>
          <RadioGroup size="lg" defaultValue="account">
            <RadioGroupItem value="account" label="연결 계좌 · 국민은행 1234" />
            <RadioGroupItem value="card" label="신용카드 · 딸깍카드" />
            <RadioGroupItem value="point" label="딸깍 포인트 · 12,300P" />
            <RadioGroupItem value="phone" label="휴대폰 결제(지금 쓸 수 없어요)" disabled />
          </RadioGroup>
        </Phone>
      </Part>
    </Board>
  );
}

export function SwitchDemo() {
  return (
    <Board column>
      <Part title="size">
        <Example label="size=sm · 16">
          <Switch size="sm" label="알림" defaultChecked />
        </Example>
        <Example label="size=md · 24(기본)">
          <Switch label="알림" defaultChecked />
        </Example>
        <Example label="size=lg · 32">
          <Switch size="lg" label="알림" defaultChecked />
        </Example>
        <Example label="꺼짐">
          <Switch label="알림" />
        </Example>
        <Example label="disabled">
          <Switch label="알림" disabled defaultChecked />
        </Example>
      </Part>
      <Part title="실제 화면">
        <Phone label="알림 설정(ListItem + Switch)" bare>
          <div className="py-8">
            <ListItem title="입출금 알림" description="돈이 들어오고 나갈 때" suffix={<Switch aria-label="입출금 알림" defaultChecked />} />
            <ListItem title="카드 결제 알림" suffix={<Switch aria-label="카드 결제 알림" defaultChecked />} />
            <ListItem title="혜택 · 이벤트 알림" description="광고성 정보 수신" suffix={<Switch aria-label="혜택 이벤트 알림" />} />
          </div>
        </Phone>
      </Part>
    </Board>
  );
}

export function CalendarDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>({ from: new Date(), to: addDays(new Date(), 6) });
  return (
    <Grid>
      <Phone label='mode="single" · 하루 고르기'>
        <Calendar mode="single" selected={date} onSelect={setDate} />
      </Phone>
      <Phone label='mode="range" · 기간 고르기(거래 내역 조회)'>
        <Calendar mode="range" selected={range} onSelect={setRange} />
      </Phone>
    </Grid>
  );
}
