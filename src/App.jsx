import { useState } from 'react'
import Approutes from './routes/Approutes'
import { Toaster } from 'react-hot-toast'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {

  return (
    <>
      <GoogleOAuthProvider clientId="687742065947-f72rd156jmppr6lals0mep8n0ua330fr.apps.googleusercontent.com">
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Approutes />
      </GoogleOAuthProvider>
    </>
  )
}

export default App
