import { useSearchParams } from 'react-router-dom'

export default function useQueryParams() {
  const [searchParam] = useSearchParams()
  return Object.fromEntries([...searchParam])
}
