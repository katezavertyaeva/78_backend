
# 🚀 TypeScript + Express Setup Guide

## 1. Initialize project

```bash
npm init -y
```

---

## 2. Install dependencies

### Runtime dependency

```bash
npm install express
```

### Dev dependencies

```bash
npm install -D typescript ts-node-dev @types/node @types/express
```

---

## 3. Add scripts to `package.json`

```json
"scripts": {
  "dev": "ts-node-dev src/index.ts",
  "build": "tsc",
  "start": "node dist/index.js"
}
```

---

## 4. Initialize TypeScript

```bash
npx tsc --init
```

---

## 5. Configure `tsconfig.json`

Replace with:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "module": "commonjs",
    "target": "es2020",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

---

## 6. Project structure

```
project/
│
├── src/
│   └── index.ts
├── dist/
├── package.json
├── tsconfig.json
```

---

## 7. Create `src/index.ts`

```ts
import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello!!" });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
```

---

## 8. Run in development

```bash
npm run dev
```

---

## 9. Build project

```bash
npm run build
```

---

## 10. Run production build

```bash
npm start
```

---

# ✅ Result

- Dev server with auto-reload (`ts-node-dev`)
- Compiled output in `/dist`
- Fully typed Express app

---

## 💡 Optional improvements

- Add `.env` support (`dotenv`)
- Use `nodemon` instead of `ts-node-dev`
- Add ESLint + Prettier
- Split routes/controllers

---

Here’s a clear **theory explanation** of the most important Express response methods: `res.status()`, `res.json()`, and `res.redirect()`.

---

# 📘 Express Response Theory

In **Express**, the `res` (response) object is used to send a response back to the client. It provides methods to control:

* HTTP status codes
* Response body (JSON, text, etc.)
* Redirect behavior

---

# 🔢 `res.status()`

## What it does

Sets the **HTTP status code** of the response.

```ts
res.status(200);
```

## Common status codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | OK (success)          |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 500  | Internal Server Error |

## Important

* `res.status()` **does NOT send the response**
* You must chain it with `.send()` or `.json()`

```ts
res.status(404).json({ error: "Not found" });
```

---

# 📦 `res.json()`

## What it does

Sends a **JSON response** to the client.

```ts
res.json({ message: "Hello" });
```

## Key features

* Automatically sets header:

  ```http
  Content-Type: application/json
  ```
* Automatically converts object → JSON string

## Example

```ts
app.get("/user", (_req, res) => {
  res.json({
    id: 1,
    name: "John"
  });
});
```

## With status

```ts
res.status(201).json({ message: "User created" });
```

---

# 🔁 `res.redirect()`

## What it does

Redirects the client to another URL.

```ts
res.redirect("/login");
```

## Default behavior

* Uses HTTP status **302 (Found)**

## Custom status

```ts
res.redirect(301, "/new-url");
```

## Common redirect codes

| Code | Meaning                      |
| ---- | ---------------------------- |
| 301  | Permanent redirect           |
| 302  | Temporary redirect (default) |
| 307  | Temporary (preserves method) |
| 308  | Permanent (preserves method) |

## Example

```ts
app.get("/old-page", (_req, res) => {
  res.redirect(301, "/new-page");
});
```

---

# ⚡ How they work together

### Example: success response

```ts
res.status(200).json({ message: "OK" });
```

### Example: error response

```ts
res.status(400).json({ error: "Invalid data" });
```

### Example: redirect after action

```ts
app.post("/login", (_req, res) => {
  // after login
  res.redirect("/dashboard");
});
```

---

# 🧠 Key Concepts

### 1. One response per request

You can only send **one response**:

```ts
res.json({ a: 1 });
// ❌ can't do another res.json()
```

---

### 2. Order matters

```ts
res.status(200).json({}); // ✅ correct
res.json({}).status(200); // ❌ wrong
```

---

### 3. JSON vs redirect

* `res.json()` → API response (data)
* `res.redirect()` → browser navigation

---

# 🧾 Summary

| Method              | Purpose         |
| ------------------- | --------------- |
| `res.status(code)`  | Set HTTP status |
| `res.json(data)`    | Send JSON       |
| `res.redirect(url)` | Redirect client |

---
