import { useState } from 'react'
import { useSelector } from 'react-redux';
import {Router as Route} from './routes/router.jsx'


function App() {
    const token = useSelector((state) => state.auth.token);
  return (
    <>
<Route></Route>

    </>
  )
}

export default App
