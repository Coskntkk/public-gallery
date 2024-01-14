import { Schema, model, models } from 'mongoose';

// Create a schema
const artifactSchema = new Schema({
    name: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
    url: {
        type: String,
    },
});


const Artifact = models.Artifact || model('Artifact', artifactSchema);

export default Artifact;