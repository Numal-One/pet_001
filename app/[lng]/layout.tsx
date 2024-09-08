import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import {useServerTranslation} from "@/i18n";
import { dir } from 'i18next'

import {DEFAULT_LANGUAGE, Languages, languagesCollection} from "@/i18n/settings";

const inter = Inter({ subsets: ["cyrillic", "latin"] });

//генерация метадаты - title и description с учетом выбранного языка
export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: Languages;
  };
}) {
  if (languagesCollection.indexOf(lng) < 0) lng = DEFAULT_LANGUAGE
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useServerTranslation(lng, 'MetaData')
  return {
    title: t('title'),
    description:  t('description')
  }
}
export async function generateStaticParams() {
  return languagesCollection.map((lng) => ({ lng }))
}

export default function RootLayout({children, params: {lng}}: Readonly<{
  children: React.ReactNode;
  params: {lng: Languages}
}>) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
