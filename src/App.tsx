
import './App.css'
import Header from './components/Header/Header'
import Description from './components/Description/Description'
import ParametersMenu from './components/ParametersMenu/ParametersMenu'
import PhotoList from './components/PhotoList/PhotoList'
import Footer from './components/Footer/Footer'
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    document.title = 'Mars Viewer App'
  }, [])
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='grow'>
        <Description />
        <ParametersMenu />
        <PhotoList />
      </main>
      <Footer />
    </div>
  )
}

export default App
