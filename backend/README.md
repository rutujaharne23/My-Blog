# The Stacks
1. Frontend - React
2. Backend - Cloudflare workers
3. zod as the validation library, type inference for the frontend types
4. Language - Typescript
5. Prisma as the ORM, with connection pooling
6. Database - Postgres
7. jwt for authentication
----------------------------------------------------------------------------------
## Initialize the backend
* Create a new folder called "My-Blog"
`mkdir medium`
`cd medium`

* Initialize a hono based cloudflare worker app 
`npm create hono@latest`

* Target directory › backend
* Which template do you want to use? - cloudflare-workers
* Do you want to install project dependencies? … yes
* Which package manager do you want to use? › npm
----------------------------------------------------------------------------------
## Initialize handlers
Create below routes
1. POST /api/v1/user/signup
2. POST /api/v1/user/signin
3. POST /api/v1/blog
4. PUT /api/v1/blog
5. GET /api/v1/blog/:id
6. GET /api/v1/blog/bulk
----------------------------------------------------------------------------------
## Initialize DB (prisma)
1. Get your connection url from neon.db or aieven.tech
  `postgres://avnadmin:password@host/db`
2. Get connection pool URL from Prisma accelerate (Use link https://www.prisma.io/data-platform/accelerate)
  `prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY`
3. Initialize prisma in your project (Make sure you are in the backend folder)
  `npm i prisma`
  `npx prisma init`

  Replace DATABASE_URL in .env
  `DATABASE_URL="postgres://avnadmin:password@host/db"`
  Add DATABASE_URL as the connection pool url in wrangler.toml
  
  `name = "backend"`
  `compatibility_date = "2023-12-01"`
  `[vars]`
  `DATABASE_URL = "prisma://accelerate.prisma-data.net/?api_key=YOUR_API_KEY"
💡
