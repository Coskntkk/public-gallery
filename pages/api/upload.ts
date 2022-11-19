// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../utils/connectMongo';
import Artifact from '../../models/artifact';
import path from 'path'
import fs from 'fs'
type Data = {
    success: boolean,
    message: string,
    data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        if (req.method === 'POST') {
            await connectMongo()
            Upload(req, res);
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}

const Upload = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    // Create a model with the image
    let newItem = {
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
    }
    let createdItem = await Artifact.create(newItem)
    
    // Convert the buffer to a png/jpg file and save it on the server
    const file = req.body.image
    const fileName = createdItem._id + '.png'
    const filePath = path.join(process.cwd(), 'public', 'images', fileName)
    const base64Data = file.replace(/^data:([A-Za-z-+/]+);base64,/, '')
    fs.writeFileSync(filePath, base64Data, { encoding: 'base64' });
    res.status(200).json({ success: true, message: 'Image uploaded successfully', data: createdItem._id });
}
