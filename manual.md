# 作業記録：環境構築

## 2024/06/09

### 1. Homebrew のインストール

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

- インストール後、PATH を通す：

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
  eval "$(/opt/homebrew/bin/brew shellenv)"
```

### 2. Node.js のインストール

```bash
brew install node
```

### 3. インストール確認

```bash
node --version
npm --version
npx --version
```

---

今後も作業内容をこのファイルに追記していきます。
