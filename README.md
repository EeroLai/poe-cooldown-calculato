# POE Cooldown Tick Calculator

這是一個用 Vue 3 ESM 模組拆分的靜態前端工具，用來計算 Path of Exile 的冷卻、tick 檔位、CDR 門檻與建議 APS。

## 特色

- 可直接部署到 GitHub Pages 等靜態網站
- 使用 Vue 3，但不需要額外建置流程
- 已內建繁體中文與英文
- 計算邏輯、元件、翻譯文字分開管理，方便後續擴充
- Vue 透過 CDN ESM 載入，適合先快速上線靜態版

## 結構

- `index.html`: 靜態入口
- `src/main.js`: Vue 啟動點
- `src/App.js`: 頁面組裝
- `src/components/*`: 各區塊元件
- `src/utils/calculator.js`: 計算核心
- `src/i18n/messages.js`: 多國語言文案

## 本機使用

直接開啟 `index.html` 即可使用。若瀏覽器對本機模組載入有限制，也可以用任意靜態伺服器開啟。

## Git 靜態頁面部署

把目前這個資料夾內容推到 GitHub Pages、Cloudflare Pages 或其他靜態託管即可。
