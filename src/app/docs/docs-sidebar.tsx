"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navGroups } from "./nav-items";

// 왼쪽 메뉴. 지금 보는 문서를 회색 면으로 표시한다
export default function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav aria-label="라이브러리 메뉴" className="space-y-24">
      {navGroups.map((group) => (
        <div key={group.title}>
          <p className="px-12 text-label-sm text-neutral-subtle">{group.title}</p>
          <ul className="mt-6 space-y-2">
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  {item.ready ? (
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={`block rounded-sm px-12 py-6 text-body-md ${
                        active ? "bg-neutral-weak text-neutral" : "text-neutral-muted hover:bg-neutral-muted"
                      }`}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="block px-12 py-6 text-body-md text-disabled">
                      {item.title} · 준비 중
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
