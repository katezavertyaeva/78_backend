## 🧪 Задание: Проверка `x-api-key` в middleware

### 📌 Условие

Создай сервер на Express.js с middleware, который проверяет наличие API-ключа в заголовке запроса.

---

### 🔧 Требования

1. Создай middleware `checkApiKey`
2. Middleware должен:
   - читать заголовок `x-api-key`
   - сравнивать его со значением `"12345"`

3. Если ключ:
   - ✅ верный → вызвать `next()`
   - ❌ неверный → вернуть `401 Unauthorized`

---

### 📡 Роут

Создай защищённый endpoint:

```http
GET /secure
```

Он должен:

- быть доступен только с правильным API-ключом
- возвращать: `"Access granted"`

---

### 📥 Пример запроса

С правильным ключом:

```http
GET /secure
x-api-key: 12345
```

Ответ:

```
Access granted
```

---

С неправильным ключом:

```http
GET /secure
x-api-key: wrong
```

Ответ:

```
401 Unauthorized
```

---
