import { ToastContainer } from 'react-toastify'
import useRouteEmlement from './useRouteEmlement'
import 'react-toastify/dist/ReactToastify.css'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from 'src/utils/auth'
import { AppContext } from 'src/contexts/app.context'

function App() {
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])
  return (
    <div>
      {useRouteEmlement()}
      <ToastContainer />
    </div>
  )
}

export default App
