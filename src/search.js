import Fuse from 'fuse.js';
import data from './data/collection.json';

export default function Search(params) {
    let options = {
        keys : [
            "Genus",
            "Species",
            "Common Name"
        ],
        threshold : 0.2
    };

    let fuse = new Fuse(data, options);

    return fuse.search(params).map(result => (
        {
            ...result.item, 
            image: '/image',
            id: crypto.randomUUID()
        }
    ));
}
