// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../utils/connectMongo';
import Artifact from '../../../models/artifact';
type Data = {
    success: boolean,
    message: string,
    data: any
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        if (req.method === 'GET') {
            await connectMongo()
            getArtifact(req, res);
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}

const getArtifact = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        // Create a model with the image
        let id = req.query.id
        console.log(id)
        const artifact = await Artifact.findById(id);
        if (!artifact) {
            res.status(400).json({ success: false, message: 'No artifact found', data: null });
        }
        let data = {
            id: artifact._id,
            name: artifact.name,
            description: artifact.description,
            author: artifact.author,
            createdAt: artifact.createdAt,
        }
        res.status(200).json({ success: true, message: 'Artifact found', data: data });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}