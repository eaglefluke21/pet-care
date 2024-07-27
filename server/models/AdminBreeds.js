import mongoose from 'mongoose';

const breedSchema = new mongoose.Schema({
    breedname: { type: String, required: true },
    group: { type: String, required: true },
    lifespan: { type: String, required: true },
    size: { type: String, required: true },
    origin: { type: String, required: true },
    description: { type: String },
    image: { type: String }
});


const AdminBreedModel = mongoose.model('adminBreedModel', breedSchema);

export default AdminBreedModel;
