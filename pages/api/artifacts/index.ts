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
function dataURLtoFile(dataurl: any, filename: any) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
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
            {
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { author: { $regex: keyword, $options: 'i' } }
                ]
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        let totalItems = await Artifact.countDocuments({
            $or: [
                { name: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
                { author: { $regex: keyword, $options: 'i' } }
            ]
        });
        let dataItems = artifacts.map((artifact) => {
            return {
                id: artifact._id,
                name: artifact.name,
                description: artifact.description,
                author: artifact.author,
                createdAt: artifact.createdAt,
                url: artifact.url,
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
    // try {
    // Create a model with the image
    let newItem = {
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        url: ""
    }

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Client-ID ${process.env.CLIENT_ID as string}`);
    var formdata = new FormData();
    //Usage example:
    var file = dataURLtoFile(`data:image/png;base64,${req.body.image.split(",")[1]}`, 'image.png');
    formdata.append("image", file);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
    };

    fetch("https://api.imgur.com/3/image", requestOptions as any)
        .then(response => response.json())
        .then(async result => {
            console.log(result);
            newItem.url = result.data.link
            console.log(newItem);
            let createdItem = await Artifact.create(newItem)
            res.status(200).json({ success: true, message: 'Image uploaded successfully', data: createdItem._id });
        })
        .catch((error: any) => {
            console.log('error', error)
            res.status(200).json({ success: true, message: 'Image uploaded successfully', data: error.toJSON() });
        });
}
