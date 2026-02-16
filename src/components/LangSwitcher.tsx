"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/navigation";
import { useTransition } from "react";

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <button
      className="text-sm font-sans uppercase tracking-widest text-primary hover:text-accent transition-colors disabled:opacity-50"
      onClick={() => handleLocaleChange(locale === "en" ? "ar" : "en")}
      disabled={isPending}>
      {locale === "en" ? "ar" : "en"}
    </button>
  );
}
