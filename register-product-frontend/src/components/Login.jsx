import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { Context } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Login = () => {
  const { logged, signIn, signOut } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    if (await signIn(email, password)) {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Login realizado',
        didClose: () => {
          window.location.reload()
        }
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Usuario ou Senha Invalidos',
        didClose: () => {
          window.location.reload()
        }
      })
    }
  }

  return (
    <Grid
      container
      p={2}
      justifyContent="end"
      alignItems="center"
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.08)',
        color: (theme) => theme.palette.background.paper

      }}
    >
    {
      !logged
        ? (
          <Grid container gap={2} justifyContent="end">
            <TextField
              label="E-mail"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Senha"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Button sx={{ color: '#000' }} onClick={() => handleLogin()}>
              <Typography variant="h6">
                Entrar
              </Typography>
            </Button>
          </Grid>
          )
        : (
          <Button sx={{ color: '#000' }} onClick={signOut}>
            <Typography variant="h6">
              Sair
            </Typography>
          </Button>
          )
    }
    </Grid>

  )
}

export default Login
