import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@rutujaharne/my-blog";

export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
    },
    Variables: {
        userId: string
    }
  }>();

blogRouter.use('/*', async (c, next) => {
    // get the header
    // verify the header
    // if the header is correct, we can proceed
    // if not, we return the user 403 status code
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1]
    try{
        const response = await verify(header, c.env.JWT_SECRET)
        if(response){
            c.set("userId", response.id);
            await next()
        }else{
            c.status(403)
            return c.json({ error: "Unauthorized!" })
        }
    }catch(e){
        //console.log(e);
        c.status(403);
        return c.json({ error: "You are not logged in" });
    }
})

blogRouter.post('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct!"
        })
    }
    const authorId = c.get("userId");
    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
        }
    });

    return c.json({
        id: blog.id
    });
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message: "Inputs not correct!"
        })
    }
    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    });
    return c.json({
        id: blog.id
    });
})

// Add Pagination
blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    })
})

blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    try{
        const blog = await prisma.blog.findFirst({
            where: {
                id: Number(id)
            }
        });
        return c.json({
            blog
        });
    }catch(e){
        //console.log(e);
        c.status(411);
        return c.json({ error: "Error while fetching blog post!" });
    }
})