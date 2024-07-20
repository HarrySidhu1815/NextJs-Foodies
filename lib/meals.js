import sql from 'better-sqlite3'
import slugify from 'slugify'
import xss from 'xss'
import fs from 'node:fs'
import { S3 } from '@aws-sdk/client-s3'

const s3 = new S3({
    region: 'us-east-2'
  });
const db = sql('meals.db')

export async function getMeals(){
    await new Promise((resolve) => setTimeout(resolve, 2000))
    return db.prepare('SELECT * FROM meals').all()
}

export function getMeal(slug){
    return db.prepare('SELECT * FROM meals WHERE slug=?').get(slug)
}

export async function saveMeal(meal){
    meal.slug = slugify(meal.title, {lower: true})
    meal.instructions = xss(meal.instructions)

    const extension = meal.image.name.split('.').pop()
    const filename = `${meal.slug}.${extension}`

    const bufferImage = await meal.image.arrayBuffer()

    s3.putObject({
        Bucket: 'harjobanpreet-nextjs-demo-user-image',
        Key: filename,
        Body: Buffer.from(bufferImage),
        ContentType: meal.image.type,
      });

    meal.image = filename

    db.prepare(`
        INSERT into meals
        (title, summary, image, creator, creator_email, instructions, slug)
        VALUES (
            @title,
            @summary,
            @image,
            @creator,
            @creator_email,
            @instructions,
            @slug
        )
        `).run(meal)
    
}