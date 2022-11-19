import Service from "./Service";

class ArtifactService {
    async getArtifact(payload) {
        try {
            const response = await Service.get(`/api/artifacts/${payload}`);
            return response.data;
        } catch (error) {
            return error;
        }
    }
    async getArtifacts() {
        try {
            const response = await Service.get("/api/artifacts");
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export default new ArtifactService();