import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>()

app.use('/api/v1/blog/*', async (c, next) => {
  // get the header
  // verify the header
  // if the header is correct, we can proceed
  // if not, we return the user 403 status code
  const header = c.req.header("authorization") || "";
  const token = header.split(" ")[1]
  const response = await verify(header, c.env.JWT_SECRET)
  if(response.id){
    next()
  }else{
    c.status(403)
    return c.json({ error: "Unauthorized!" })
  } 
})

app.post('/api/vi/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try{
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password
      }
    })
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
    return c.json({
      jwt: token
    })
  }catch(e){
    c.status(403);
    return c.json({ error: "Error while signing up!" });
  }
})

app.post('/api/v1/signin', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json(); 
  const user = await prisma.user.findUnique({
    where: {
      email: body.email
    }
  })

  if (!user) {
    c.status(403);
    return c.json({ error: "User not found!" });
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({
    jwt: token
  });
})

app.post('/api/v1/blog', (c) => {
  return c.text('Blog Page')
})

app.put('/api/v1/blog', (c) => {
  return c.text('Hello Hono!')
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text('Hello Hono!')
})

export default app
