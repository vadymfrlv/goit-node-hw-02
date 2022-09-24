Створений аккаунт на [MongoDB Atlas](https://www.mongodb.com/cloud/atlas). Через Compass створена
база даних `db-contacts` і в ній колекція `contacts`. Написаний код для створення підключення до
MongoDB за допомогою [Mongoose](https://mongoosejs.com/).

Схема моделі колекції `contacts`:

```js
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Set phone for contact'],
      unique: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  }
```

REST API підтримує такі раути:

### @ GET /api/contacts

- нічого не отримує
- викликає функцію `listContacts` для роботи з json-файлом `contacts.json`
- повертає масив всіх контактів в json-форматі зі статусом `200`

### @ GET /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- викликає функцію `getById` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає об'єкт контакту в json-форматі зі статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

### @ POST /api/contacts

- Отримує `body` в форматі `{name, email, phone}` (усі поля обов'язкові)
- Якщо в `body` немає якихось обов'язкових полів, повертає json з ключем
  `{"message": "missing required name field"}` і статусом `400`
- Якщо з `body` все добре, додає унікальний ідентифікатор в об'єкт контакту
- Викликає функцію `addContact(body)` для збереження контакту в файлі `contacts.json`
- За результатом роботи функції повертає об'єкт з доданим `id` `{id, name, email, phone}` і статусом
  `201`

### @ DELETE /api/contacts/:id

- Не отримує `body`
- Отримує параметр `id`
- Викликає функцію `removeContact` для роботи з json-файлом `contacts.json`
- якщо такий `id` є, повертає json формату `{"message": "contact deleted"}` і статусом `200`
- якщо такого `id` немає, повертає json з ключем `"message": "Not found"` і статусом `404`

### @ PUT /api/contacts/:id

- Отримує параметр `id`
- Отримує `body` в json-форматі з оновленням будь-яких полів `name, email и phone`
- Якщо `body` немає, повертає json з ключем `{"message": "missing fields"}` і статусом `400`
- Якщо з `body` все добре, викликає функцію `updateContact(contactId, body)`. (Напиши її) для
  поновлення контакту в файлі `contacts.json`
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом `200`. В іншому
  випадку, повертає json з ключем `"message": "Not found"` і статусом `404`

### @ PATCH /api/contacts/:id/favorite

- Отримує параметр `contactId`
- Отримує `body` в json-форматі з оновленням поля` favorite`
- Якщо `body` немає, повертає json з ключем`{ "message": "missing field favorite"}`і статусом` 400`
- Якщо з `body` все добре, викликає функцію` updateStatusContact (contactId, body)` (напиши її) для
  поновлення контакту в базі)
- За результатом роботи функції повертає оновлений об'єкт контакту і статусом `200`. В іншому
  випадку, повертає json з ключем `" message ":" Not found "` і статусом `404`

Маршрути що приймають дані (`POST`, ` PUT` та `PATCH `) мають валідацію отриманих даних.

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед
  кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
