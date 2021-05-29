## Agent Management System APIs

This document contains the RESTful APIs for the agent management system

## Overview
* Each agent has information like username, email and unique member id
* It supports CRUD
* It supports pagination. When read items with pagination, please pass two parameters: limit and page
* It supports searching by username and memberId
* It integrates a free email api of SendGrid. Once new agent is registered successfully, it will automatically send a welcome email

## Authentication
* To access SendGrid email service, you will need create an API key using following link - https://app.sendgrid.com/settings/api_keys. Once the API key is created, copy and paste it into 'sendgrid.env' file. After that, run 'export SENDGRID_API_KEY='YOUR_API_Key' in your terminal before running the server. For more detail, please go to https://app.sendgrid.com/guide/integrate/langs/nodejs.


### GET
#### **API:** GET /
---

Get the homepage.

**Parameters:**

none

**cURL Example:**
```
curl -L -X GET "https://antai-ams.herokuapp.com/"

```

**Response status code:**
* 200 -- success



#### **API:** GET /api/agents
---

Get all agents' information.

**Parameters:**

none

**cURL Example:**
```
curl -L -X GET "https://antai-ams.herokuapp.com/api/agents"

```

**Response status code:**
* 200 -- success



#### **API:** GET /api/agents/page
---

Get a list of agents with pagination. You can indicate how many agents per page and the page number you want to access by changing the value of the parameters, limit and page, in query.

**Parameters:**

| name | type | description |
| ---- | ---- | ---------------- |
| limit | int | This param is used to define number of agents per page. |
| page | int | This param is used to define the page you want to visit.  |

**cURL Example:**
```
curl -L -X GET "https://antai-ams.herokuapp.com/api/agents/page?limit=3&page=1"

```

**Response status code:**
* 200 -- success



#### **API:** GET /api/agents/id/:memberId
---

Search and get the information of a specific agent using memberId. You can indicate which agent you want to access by changing the value of ':memberId'.

**Path Variable:**

| name | type | description |
| ---- | ---- | ---------------- |
| memberId | int | It should be a numeric digit of an existed agent's memberId |

**cURL Example:**
```
curl -L -X GET "https://antai-ams.herokuapp.com/api/agents/id/1"

```

**Response status code:**
* 200 -- success



#### **API:** GET /api/agents/username/:username
---

Search and get the information of a specific agent using username. You can indicate which agent you want to access by changing the value of ':username'.

**Path Variable:**

| name | type | description |
| ---- | ---- | ---------------- |
| username | int | It should be a value of an exited agent's username |

**cURL Example:**
```
curl -L -X GET "https://antai-ams.herokuapp.com/api/agents/username/Tony"

```

**Response status code:**
* 200 -- success



#### **API:** POST /api/agents
---

Create an agent by providing a username and email address.

**Parameters:**

body:

| name | type | description |
| ---- | ---- | ---------------- |
| username | string | the username you want to used to create a new agent. |
| email | string | the email you want to used to create a new agent. |

**cURL Example:**
```
curl -L -X POST "https://antai-ams.herokuapp.com/api/agents" \
-H "Content-Type: application/json" \
--data-raw "{
    \"username\": \"Joji\",
    \"email\": \"Joji@agent.com\"
}"

```

**Response status code:**
* 200 -- success



#### **API:** PUT /api/agents/:memberId
---

Update an agent's information(username & email) using memberId. You can indicate which agent you want to update by changing the value of ':memberId'.

**Path Variables:**

| name | type | description |
| ---- | ---- | ---------------- |
| memberId | int | It should be a numeric digit of an existed agent's memberId |

**cURL Example:**
```
curl -L -X PUT "https://antai-ams.herokuapp.com/api/agents/1" \
-H "Content-Type: application/json" \
--data-raw "{
    \"username\": \"Pete\",
    \"email\": \"pete@agent.com\"
}"

```

**Response status code:**
* 200 -- success



#### **API:** DELETE /api/agents/:memberId
---

Delete an agent using memberId. You can indicate which agent you want to delete by changing the value of ':memberId'.

**Path Variables:**

| name | type | description |
| ---- | ---- | ---------------- |
| memberId | int | It should be a numeric digit of an existed agent's memberId |

**cURL Example:**
```
curl -L -X DELETE "https://antai-ams.herokuapp.com/api/agents/8"

```

**Response status code:**
* 200 -- success
