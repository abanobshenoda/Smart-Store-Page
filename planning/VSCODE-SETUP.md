# Professional VS Code Setup for Web Development

## Theme

- **Theme**: One Dark Pro
- **Marketplace**: https://marketplace.visualstudio.com/items?itemName=zhuangtongfa.Material-theme

---

## Fonts (Professional)

### Recommended Font (Choose ONE):

1. **JetBrains Mono** (أفضل خيار)
   - https://www.jetbrains.com/lp/mono/
   - خط مونو بروفيشنال مصمم للمطورين
   - Ligatures (ربط الحروف) → `=>` تصبح `⇒`

2. **Fira Code** (البديل المفضل)
   - https://github.com/tonsky/FiraCode
   - مشهور جداً وخفيف

3. **Cascadia Code** (من Microsoft)
   - https://github.com/microsoft/cascadia-code
   - خط افتراضي في Windows Terminal

**الأفضل**: JetBrains Mono مع Ligatures

---

## settings.json (الإعدادات الكاملة)

```jsonc
{
  // ───────────── Theme & Appearance ─────────────
  "workbench.colorTheme": "One Dark Pro",
  "workbench.iconTheme": "material-icon-theme",
  "workbench.startupEditor": "none",
  "workbench.editor.enablePreview": false,
  "workbench.editor.tabActiveBorder": "#61afef",
  "workbench.tree.indent": 16,
  "workbench.sideBar.location": "left",
  "window.titleBarStyle": "custom",
  "window.commandCenter": true,
  "window.zoomLevel": 0,

  // ───────────── Font & Editor ─────────────
  "editor.fontFamily": "'JetBrains Mono', 'Fira Code', Consolas, monospace",
  "editor.fontSize": 15,
  "editor.fontLigatures": true,
  "editor.lineHeight": 1.7,
  "editor.letterSpacing": 0.3,
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.indentSize": 2,
  "editor.detectIndentation": true,
  "editor.wordWrap": "off",
  "editor.lineNumbers": "on",
  "editor.minimap.enabled": true,
  "editor.minimap.renderCharacters": false,
  "editor.minimap.maxColumn": 120,
  "editor.guides.bracketPairs": "active",
  "editor.bracketPairColorization.enabled": true,
  "editor.renderWhitespace": "none",
  "editor.renderControlCharacters": false,
  "editor.rulers": [80, 120],
  "editor.roundedSelection": true,
  "editor.cursorBlinking": "smooth",
  "editor.cursorSmoothCaretAnimation": "on",
  "editor.cursorSurroundingLines": 4,
  "editor.smoothScrolling": true,
  "editor.mouseWheelZoom": true,
  "editor.scrollBeyondLastLine": false,
  "editor.multiCursorModifier": "ctrlCmd",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.organizeImports": "explicit",
  },
  "editor.linkedEditing": true,
  "editor.wordBasedSuggestions": "matchingDocuments",

  // ───────────── Files & Explorer ─────────────
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,
  "files.eol": "\n",
  "files.insertFinalNewline": true,
  "files.trimTrailingWhitespace": true,
  "files.exclude": {
    "**/.next": true,
    "**/node_modules": true,
    "**/.git": true,
  },
  "explorer.confirmDragAndDrop": true,
  "explorer.confirmDelete": false,
  "explorer.compactFolders": false,
  "explorer.sortOrder": "type",

  // ───────────── Terminal ─────────────
  "terminal.integrated.fontFamily": "'JetBrains Mono', monospace",
  "terminal.integrated.fontSize": 14,
  "terminal.integrated.defaultProfile.windows": "PowerShell",
  "terminal.integrated.cursorBlinking": true,
  "terminal.integrated.cursorStyle": "line",
  "terminal.integrated.smoothScrolling": true,

  // ───────────── Git ─────────────
  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "git.autofetch": true,
  "git.autorefresh": true,
  "git.decorations.enabled": true,

  // ───────────── Emmet (HTML/CSS shortcuts) ─────────────
  "emmet.includeLanguages": {
    "javascript": "javascriptreact",
    "typescript": "typescriptreact",
  },
  "emmet.showExpandedAbbreviation": "always",
  "emmet.triggerExpansionOnTab": true,

  // ───────────── TypeScript / JavaScript ─────────────
  "typescript.updateImportsOnFileMove.enabled": "always",
  "javascript.updateImportsOnFileMove.enabled": "always",
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "javascript.preferences.importModuleSpecifier": "non-relative",
  "typescript.suggest.autoImports": true,
  "typescript.suggest.paths": true,
  "typescript.preferences.quoteStyle": "single",
  "typescript.format.semicolons": "insert",
  "typescript.format.insertSpaceAfterTypeAnnotation": true,
  "javascript.preferences.quoteStyle": "single",
  "javascript.format.semicolons": "insert",

  // ───────────── Tailwind CSS ─────────────
  "tailwindCSS.experimental.classRegex": [
    "clsx\\(([^)]*)\\)",
    "className: [`'\"]([^'\"`]*)",
    "cn\\(([^)]*)\\)",
  ],
  "tailwindCSS.includeLanguages": {
    "typescript": "javascript",
    "typescriptreact": "javascript",
  },

  // ───────────── Vercel / Next.js ─────────────
  "nextjs.url": "http://localhost:3000",

  // ───────────── Spell Check ─────────────
  "cSpell.language": "en,ar",
  "cSpell.words": [
    "zustand",
    "neondatabase",
    "nextjs",
    "nextauth",
    "fawry",
    "instapay",
    "valU",
    "uploadthing",
    "tailwindcss",
  ],
  "cSpell.ignoreWords": ["eu", "egp", "sku", "glb"],

  // ───────────── Settings Sync ─────────────
  "settingsSync.ignoredSettings": [],

  // ───────────── Security & Privacy ─────────────
  "security.workspace.trust.untrustedFiles": "open",
  "telemetry.telemetryLevel": "off",
  "update.showReleaseNotes": false,
}
```

---

## تحسينات إضافية مفيدة

### Terminal PowerShell Profile (بونص)

أضف لملف `$PROFILE` في PowerShell:

```powershell
# تبسيط الـ prompt
function prompt { "PS $($executionContext.SessionState.Path.CurrentLocation) > " }

# Alias سريعة
Set-Alias g git
Set-Alias np npm
Set-Alias npx2 npx
```

### .editorconfig (توحيد الإعدادات لكل المطورين)

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
indent_style = space
indent_size = 2

[*.md]
trim_trailing_whitespace = false
```

---

## الخطوات المطلوبة منك

1. **ثبّت الخط** (JetBrains Mono):
   - حمّله من https://www.jetbrains.com/lp/mono/
   - فك الضغط → Install Font
   - بعدها يقدر VS Code يستخدمه

2. **ثبّت الإضافات** في VS Code (Enum):

   ```bash
   # Themes & Appearance
   code --install-extension zhuangtongfa.Material-theme
   code --install-extension PKief.material-icon-theme

   # Language Support
   code --install-extension dbaeumer.vscode-eslint
   code --install-extension esbenp.prettier-vscode

   # Tailwind
   code --install-extension bradlc.vscode-tailwindcss

   # React / JS
   code --install-extension wix.vscode-import-cost

   # Other
   code --install-extension streetsidesoftware.code-spell-checker
   code --install-extension aaron-bond.better-comments
   code --install-extension formulahendry.auto-close-tag
   code --install-extension formulahendry.auto-rename-tag
   code --install-extension eamodio.gitlens
   code --install-extension ms-vscode.vscode-typescript-next

   # Database
   code --install-extension waderyan.gitblame
   code --install-extension nicolo-ribaudo.neon-extension
   ```

3. **افتح settings.json**:
   - Ctrl+Shift+P → "Open User Settings (JSON)"
   - الصق الإعدادات

---

## الإضافات الأساسية وشرحها

| Extension                 | الغرض                          |
| ------------------------- | ------------------------------ |
| One Dark Pro              | الثيم                          |
| Material Icon Theme       | أيقونات ملفات مميزة            |
| ESLint                    | اكتشاف أخطاء الكود             |
| Prettier                  | تنسيق الكود تلقائياً           |
| Tailwind CSS IntelliSense | أتمتة أكواد Tailwind           |
| Import Cost               | حجم كل import                  |
| Code Spell Checker        | فحص الإملاء بالعربي والإنجليزي |
| Better Comments           | ألوان التعليقات                |
| Auto Close Tag            | إغلاق وسوم HTML تلقائياً       |
| Auto Rename Tag           | إعادة تسمية الوسوم تلقائياً    |
| GitLens                   | معلومات Git في الكود           |

---

## لإعدادات الحالية المرئية (تعرف على طريقة الألوان)

بعد تثبيت One Dark Pro سترى:

- **الخلفية**: غامقة (#282c34)
- **النصوص**: فاتحة واضحة
- **الكلمات المفتاحية**: بنفسجي
- **السلاسل**: برتقالي/أخضر
- **الدوال**: أزرق
- **التعليقات**: رمادي/أخضر باهت
