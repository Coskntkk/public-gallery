import Service from "./Service";
// Type
import type ArtifactType from '../@types/artifact';
type GetArtifactParams = string | number;
type CreateArtifactParams = {
    name: string;
    description: string;
    author: string;
};
type ArtifactResponse = {
    success: boolean;
    message: string;
    data: ArtifactType | ArtifactType[] | { total: number; items: ArtifactType[] };
    total?: number;
};

class ArtifactService {
    async getAllArtifacts( { page = 1, keyword = '' } = {} ): Promise<ArtifactResponse> {
        try {
            let query = `?page=${page}&limit=8` + (keyword ? `&keyword=${keyword}` : '');
            let response = await Service.get("/artifacts" + query);
            let data = response.data as ArtifactResponse;
            return data;
        } catch (error: any) {
            return error;
        }
    }
    async getArtifact(payload: GetArtifactParams): Promise<ArtifactResponse> {
        try {
            let response = await Service.get(`/artifacts/${payload}`);
            let data = response.data as ArtifactResponse;
            return data;
        } catch (error: any) {
            return error;
        }
    }
    async createArtifact(payload: CreateArtifactParams): Promise<ArtifactResponse> {
        try {
            let response = await Service.post("/artifacts", payload);
            let data = response.data as ArtifactResponse;
            return data;
        } catch (error: any) {
            return error;
        }
    }
}

export default new ArtifactService();