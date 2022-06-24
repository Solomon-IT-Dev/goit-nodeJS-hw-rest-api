# ☎️ Contacts manager REST API

Backend for contacts management. Allows to register users and keep private contacts collection.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`DB_HOST`

`SECRET_KEY`

## Run commands

- `npm run start` - to run in prod mode
- `npm run start:dev` - to run in dev mode

## API Reference

#### Register new user account

```http
  POST /api/auth/signup
```

| Body parameters | Type     | Description                                                   |
| :-------------- | :------- | :------------------------------------------------------------ |
| `email`         | `string` | **Required**. Email                                           |
| `password`      | `string` | **Required**. Password                                        |
| `subscription`  | `string` | **Default: "starter"**. Options: "starter", "pro", "business" |

---

#### Login registered user

```http
  POST /api/auth/login
```

| Body parameters | Type     | Description            |
| :-------------- | :------- | :--------------------- |
| `email`         | `string` | **Required**. Email    |
| `password`      | `string` | **Required**. Password |

---

#### Logout user from service

```http
  GET /api/auth/login
```

---

#### Verify email address

```http
  GET /api/auth/verify/:verificationToken
```

| Query string params | Type     | Description                      |
| :------------------ | :------- | :------------------------------- |
| `verificationToken` | `string` | **Required**. Verification token |

---

#### Resend verification email

```http
  POST /api/auth/verify
```

| Body parameters | Type     | Description         |
| :-------------- | :------- | :------------------ |
| `email`         | `string` | **Required**. Email |

---

#### Get current logged in user

```http
  GET /api/users/current
```

---

#### Change user subscription

```http
  PATCH /api/users/
```

| Body parameters | Type     | Description                                        |
| :-------------- | :------- | :------------------------------------------------- |
| `subscription`  | `string` | **Required options**: "starter", "pro", "business" |

---

#### Change user avatar

```http
  PATCH /api/users/avatars
```

| Content type        | Description         |
| :------------------ | :------------------ |
| multipart/form-data | **Required**. Image |

---

#### Get all contacts for currently logged in user

```http
  GET /api/contacts/ (allows query options: ?page=[number]&limit=[number]&favorite=[boole])
```

---

#### Get contact by ID

```http
  GET /api/contacts/:contactId
```

| Query string params | Type     | Description              |
| :------------------ | :------- | :----------------------- |
| `contactId`         | `string` | **Required**. Contact ID |

---

#### Post new contact

```http
  POST /api/contacts/
```

| Body parameters | Type      | Description                       |
| :-------------- | :-------- | :-------------------------------- |
| `name`          | `string`  | **Required**. Name                |
| `email`         | `string`  | Email                             |
| `phone`         | `string`  | Phone                             |
| `favorite`      | `boolean` | **Default: false**. Mark favorite |

---

#### Edit contact by ID

```http
  PUT /api/contacts/:contactId
```

| Query string params | Type     | Description              |
| :------------------ | :------- | :----------------------- |
| `contactId`         | `string` | **Required**. Contact ID |

| Body parameters | Type      | Description        |
| :-------------- | :-------- | :----------------- |
| `name`          | `string`  | **Required**. Name |
| `email`         | `string`  | Email              |
| `phone`         | `string`  | Phone              |
| `favorite`      | `boolean` | Mark favorite      |

---

#### Mark contact as a favorite

```http
  PATCH /api/contacts/:contactId/favorite
```

| Query string params | Type     | Description              |
| :------------------ | :------- | :----------------------- |
| `contactId`         | `string` | **Required**. Contact ID |

| Body parameters | Type      | Description                             |
| :-------------- | :-------- | :-------------------------------------- |
| `favorite`      | `boolean` | **Required**. Mark as "true" or "false" |

---

#### Delete contact by ID

```http
  DELETE /api/contacts/:contactId
```

| Query string params | Type     | Description              |
| :------------------ | :------- | :----------------------- |
| `contactId`         | `string` | **Required**. Contact ID |
