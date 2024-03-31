import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@rutujaharne/my-blog";

export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    }
  }>();

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct!"
        })
    }
    try{
        const user = await prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            name: body.name
        }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json({
        jwt: token
        })
    }catch(e){
        //console.log(e)
        c.status(403);
        return c.json({ error: "Error while Signing Up!" });
    }
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json(); 
    const { success } = signinInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct!"
        })
    }
    try{
        const user = await prisma.user.findFirst({
        where: {
            username: body.username,
            password: body.password
        }
        })

        if (!user) {
        c.status(403);
        return c.json({ error: "Incorrect Credentials" });
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({
        jwt: token
        });
    }catch(e){
        //console.log(e);
        c.status(403);
        return c.json({ error: "Error while Signing In!" });
    }
})