// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import connectMongo from '../../../utils/connectMongo';
import Artifact from '../../../models/artifact';
import path from 'path'
import fs from 'fs'
type Data = {
    success: boolean,
    message: string,
    data: any
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
        const artifacts = await Artifact.find();
        let data = artifacts.map((artifact) => {
            return {
                id: artifact._id,
                name: artifact.name,
                description: artifact.description,
                author: artifact.author,
                createdAt: artifact.createdAt,
                image: artifact.image
            }
        });
        res.status(200).json({ success: true, message: 'Artifacts found', data: data });
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
        console.log(req.body.image)
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