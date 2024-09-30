import Fuse from 'fuse.js'
import data from './data/collection.json'

export default function Search(params) {
  let options = {
    keys: ['Genus', 'Species', 'Family'],
    threshold: 0.1
  }

  let fuse = new Fuse(data, options)

  return fuse.search(params).map((result) => ({
    ...result.item,
    image: '/image',
    id: crypto.randomUUID()
  }))
}
