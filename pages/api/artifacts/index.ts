// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../utils/connectMongo';
import Artifact from '../../../models/artifact';
type Data = {
    success: boolean,
    message: string,
    data: any,
    total?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    try {
        if (req.method === 'GET') {
            await connectMongo()
            getArtifacts(req, res);
        } else if (req.method === 'POST') {
            await connectMongo()
            createArtifact(req, res);
        }
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}

const getArtifacts = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        // Qurey params
        let keyword = req.query.keyword || '';
        let page = req.query.page ? parseInt(req.query.page as string) : 1;
        let limit = req.query.limit ? parseInt(req.query.limit as string) : 8;
        let skip = (page - 1) * limit;
        // Query
        let artifacts = await Artifact.find(
            { $or: [
                { name: { $regex: keyword, $options: 'i' } }, 
                { description: { $regex: keyword, $options: 'i' } }, 
                { author: { $regex: keyword, $options: 'i' } }
            ] })
            .skip(skip)
            .limit(limit);
        let totalItems = await Artifact.countDocuments();
        let dataItems = artifacts.map((artifact) => {
            return {
                id: artifact._id,
                name: artifact.name,
                description: artifact.description,
                author: artifact.author,
                createdAt: artifact.createdAt,
                image: artifact.image
            }
        });
        res.status(200).json({ success: true, message: 'Artifacts found', data: dataItems, total: totalItems });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}

const createArtifact = async (
    req: NextApiRequest,
    res: NextApiResponse<Data>
) => {
    try {
        // Create a model with the image
        let newItem = {
            name: req.body.name,
            description: req.body.description,
            author: req.body.author,
            image: req.body.image
        }
        let createdItem = await Artifact.create(newItem)
        res.status(200).json({ success: true, message: 'Image uploaded successfully', data: createdItem._id });
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message, data: null });
    }
}