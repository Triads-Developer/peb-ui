import Fuse from 'fuse.js'
import { usePapaParse } from 'react-papaparse'

export default function Search(params, setResults) {
  const API_BASE_URL =
    process.env.NODE_ENV === 'production' ? 'http://paleoethnobotany.research-stage.artsci.wustl.edu:3001' : 'http://localhost:3001'

  let options = {
    keys: ['Genus', 'Species', 'Family'],
    threshold: 0.1
  }

  const { readRemoteFile } = usePapaParse()

  readRemoteFile(`${API_BASE_URL}/data/`, {
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      let fuse = new Fuse(results.data.flat(), options)

      if (!params) {
        setResults(
          results.data.flat().map((item) => ({
            ...item,
            image: '/image',
            id: crypto.randomUUID()
          }))
        )
      } else {
        setResults(
          fuse.search(params).map((result) => ({
            ...result.item,
            image: '/image',
            id: crypto.randomUUID()
          }))
        )
      }
    },
    error: (err) => {
      console.error('Error fetching data:', err)
    }
  })
}
