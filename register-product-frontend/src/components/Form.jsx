import { Button, Container, Grid, TextField } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { client } from '../client'
import { Context } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Form = ({ onEdit, setOnEdit }) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const { logged } = useContext(Context)

  useEffect(() => {
    if (onEdit) {
      setName(onEdit.name)
      setDescription(onEdit.description)
      setPrice(onEdit.price)
    }
  }, [onEdit])

  const handleSubmit = async () => {
    if (!name || !description || !price) {
      return Swal.fire({
        icon: 'error',
        title: 'Erro',
        text: 'Preencha todos os campos!'
      })
    }
    if (!onEdit) {
      await client.products.create({ name, description, price })
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Produto Cadastrado',
        didClose: () => {
          window.location.reload()
        }
      })
    } else {
      await client.products.update(onEdit.id, { name, description, price })
      setOnEdit(null)
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Produto Atualizado',
        didClose: () => {
          window.location.reload()
        }
      })
    }
  }

  return (
    <Container disableGutters={true}>
    { logged &&
      <Grid container gap={2}>
      <TextField
            label="Nome"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Descrição"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            label="Preço"
            variant="outlined"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => handleSubmit()} >
            Salvar
          </Button>
      </Grid>
    }
    </Container>

  )
}

export default Form
