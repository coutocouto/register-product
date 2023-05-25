import React, { useState } from 'react'
import { Container, Typography } from '@mui/material'
import './App.css'
import Form from './components/Form'
import Grid from './components/Grid'
import { AuthProvider } from './context/AuthContext'
import Login from './components/Login'

function App () {
  const [onEdit, setOnEdit] = useState()
  return (
    <div className="App">
      <AuthProvider>
        <Container disableGutters={true}>
          <Login />
          <Typography sx={{ py: 2 }} variant="h4">Produtos</Typography>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} />
          <Grid setOnEdit={setOnEdit} />
        </Container>
      </AuthProvider>
    </div>
  )
}

export default App
