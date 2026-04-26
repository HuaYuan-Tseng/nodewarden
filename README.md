<p align="center">
  <img src="./NodeWarden.png" alt="NodeWarden Logo" />
</p>

<p align="center">
  運行於 Cloudflare Workers 上的第三方 Bitwarden 相容服務端。
</p>

[![Powered by Cloudflare](https://img.shields.io/badge/Powered%20by-Cloudflare-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com/)
[![License: LGPL-3.0](https://img.shields.io/badge/License-LGPL--3.0-2ea44f)](./LICENSE)
[![Latest Release](https://img.shields.io/github/v/release/shuaiplus/NodeWarden?display_name=tag)](https://github.com/shuaiplus/NodeWarden/releases/latest)
[![Sync Upstream](https://github.com/shuaiplus/NodeWarden/actions/workflows/sync-upstream.yml/badge.svg)](https://github.com/shuaiplus/NodeWarden/actions/workflows/sync-upstream.yml)

[更新日誌](./RELEASE_NOTES.md) | [回報問題](https://github.com/shuaiplus/NodeWarden/issues/new/choose) | [最新發布](https://github.com/shuaiplus/NodeWarden/releases/latest)

[文件首頁](./nodewarden.wiki/Home.md) | [快速開始](./nodewarden.wiki/快速開始.md)

[Telegram 頻道](https://t.me/NodeWarden_News) | [Telegram 群組](https://t.me/NodeWarden_Official)

English: [`README_EN.md`](./README_EN.md)

> **免責聲明**  
> 本專案僅供學習與交流使用，請定期備份您的密碼庫。  
> 本專案與 Bitwarden 官方無關，請勿向 Bitwarden 官方回報 NodeWarden 的問題。

---

## 與 Bitwarden 官方服務端功能比較

| 功能 | Bitwarden | NodeWarden | 說明 |
|---|---|---|---|
| 網頁密碼庫 | ✅ | ✅ | **原創 Web Vault 介面** |
| 全量同步 `/api/sync` | ✅ | ✅ | 已針對官方客戶端進行相容性優化 |
| 附件上傳 / 下載 | ✅ | ✅ | Cloudflare R2 或 KV |
| Send | ✅ | ✅ | 支援文字與檔案 Send |
| 匯入 / 匯出 | ✅ | ✅ | 支援 Bitwarden JSON / CSV / **ZIP 匯入（含附件）** |
| **雲端備份中心** | ❌ | ✅ | **支援 WebDAV / E3 排程備份** |
| 密碼提示（網頁端） | ⚠️ 有限 | ✅ | **無需發送電子郵件** |
| TOTP / Steam TOTP | ✅ | ✅ | 含 `steam://` 支援 |
| 多使用者 | ✅ | ✅ | 支援邀請碼註冊 |
| 組織 / 集合 / 成員權限 | ✅ | ❌ | 尚未實作 |
| 登入 2FA | ✅ | ⚠️ 部分支援 | 目前僅支援使用者層級 TOTP |
| SSO / SCIM / 企業目錄 | ✅ | ❌ | 尚未實作 |

---

## 已測試客戶端

- ✅ Windows 桌面版
- ✅ 手機 App
- ✅ 瀏覽器擴充功能
- ✅ Linux 桌面版
- ⚠️ macOS 桌面版尚未完整驗證

---

## 網頁部署

1. 將 `NodeWarden` 儲存庫 Fork 到自己的 GitHub 帳號
2. 前往 [Cloudflare Workers 建立頁面](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create)
3. 選擇 `Continue with GitHub`
4. 選擇您剛剛 Fork 的儲存庫
5. 保持預設設定繼續部署
6. 若您打算使用 KV 模式，請將部署指令改為 `npm run deploy:kv`
7. 等部署完成後，開啟產生的 Workers 網域
8. 依照頁面提示設定 `JWT_SECRET`，不建議隨意填寫。此值直接關係到權杖簽發安全性，正式環境請至少使用 32 個字元以上的隨機字串。

> [!TIP] 
> 預設 R2 與可選 KV 的差異：
>   | 儲存方式 | 是否需要綁定信用卡 | 單一附件/Send 檔案上限 | 免費額度 |
>   |---|---|---|---|
>   | R2 | 需要 | 100 MB（軟限制可調整） | 10 GB |
>   | KV | 不需要 | 25 MiB（Cloudflare 限制） | 1 GB |


## 更新方式：
- 手動：開啟您 Fork 的 GitHub 儲存庫，看到頂部同步提示後，點擊 `Sync fork` ➜ `Update branch`
- 自動：進入您的 Fork 儲存庫 ➜ `Actions` ➜ `Sync upstream` ➜ `Enable workflow`，將於每天凌晨 3 點自動同步上游。



## CLI 部署

```powershell
git clone https://github.com/shuaiplus/NodeWarden.git
cd NodeWarden

npm install
npx wrangler login

# 預設：R2 模式
npm run deploy

# 可選：KV 模式
npm run deploy:kv

# 本地開發
npm run dev
npm run dev:kv
```

---

## 雲端備份說明

- 遠端備份支援 **WebDAV** 與 **E3**
- 勾選「包含附件」後：
  - ZIP 內仍只包含 `db.json` 與 `manifest.json`
  - 真實附件會單獨存放於 `attachments/`
  - 後續備份會依穩定的 blob 名稱複用已有附件，不會每次全量重傳
- 遠端還原時：
  - 會從 `attachments/` 目錄依需求讀取附件
  - 缺少的附件會被安全略過
  - 被略過的附件不會在還原後的資料庫中留下髒記錄

---

## 匯入 / 匯出

目前支援的匯入來源包括：

- Bitwarden JSON
- Bitwarden CSV
- Bitwarden 密碼庫 + 附件 ZIP
- NodeWarden JSON
- 網頁匯入器中可見的多種瀏覽器 / 密碼管理器格式

目前支援的匯出方式包括：

- Bitwarden JSON
- Bitwarden 加密 JSON
- 含附件的 ZIP 匯出
- NodeWarden JSON 系列
- 備份中心中的執行個體層級完整手動匯出

---


## 開源授權

LGPL-3.0 License

---

## 致謝

- [Bitwarden](https://bitwarden.com/) - 原始設計與客戶端
- [Vaultwarden](https://github.com/dani-garcia/vaultwarden) - 服務端實作參考
- [Cloudflare Workers](https://workers.cloudflare.com/) - 無伺服器平台

---

## Star 歷史

[![Star History Chart](https://api.star-history.com/svg?repos=shuaiplus/NodeWarden&type=timeline&legend=top-left)](https://www.star-history.com/#shuaiplus/NodeWarden&type=timeline&legend=top-left)
