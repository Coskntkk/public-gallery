import Service from "./Service";

class UploadService {
    async uploadImage(payload) {
        try {
            const response = await Service.post("/api/upload", payload);
            return response.data;
        } catch (error) {
            return error;
        }
    }
}

export default new UploadService();