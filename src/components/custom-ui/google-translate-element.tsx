"use client";

import Script from "next/script";
import { useEffect } from "react";

export const GoogleTranslateElement = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "id",
        autoDisplay: true,
        includedLanguages: "en,id,ja,ko,de,fr,ru,zh-CN,zh-TW",
      },
      "google_translate_element",
    );
  };
  useEffect(() => {
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);
  return (
    <div className="relative">
      <Script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit" />
      <div id="google_translate_element" />
    </div>
  );
};
