const routes = require('express').Router()
const multer = require('multer')
const { v4: uuid } = require('uuid');
const aws = require('aws-sdk')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const connection = require('./database/connection')
const multerConfig = require('./config/multer')

const uploadConfiguration = multer(multerConfig)

const s3 = new aws.S3()

routes.get('/posts', async (req, resp) => {
    const posts = await connection('posts').select('*')
    return resp.json(posts)
})

routes.post('/upload', uploadConfiguration.single('file'), async (req, resp) => {
    console.log(req.file)

    const {
        originalname: name,
        size,
        key,
        location: url = `${process.env.APP_URL}/storage/${key}`
    } = req.file

    const id = uuid()

    await connection('posts').insert({
        id,
        name,
        size,
        key,
        url,
    })

    return resp.json({
        msg: 'File successfully uploaded'
    })

})

routes.delete('/posts/:id', async (req, resp) => {
    const { id } = req.params

    const { key } = await connection('posts').where('id', id).select('key').first()
    
    if (process.env.STORAGE_TYPE === 's3') {
        await s3.deleteObject({
            Bucket: process.env.AWS_BUCKET,
            key
        })
    }

    if(process.env.STORAGE_TYPE === 'local') {
        promisify(fs.unlink)(path.resolve(__dirname, '..', 'temp', 'uploads', key))
    }

    await connection('posts').where('id', id).del()

    return resp.json({
        msg: 'File Deleted'
    })
})

module.exports = routes