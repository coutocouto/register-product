import { Container, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, ToggleButtonGroup, ToggleButton } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { client } from '../client'
import DeleteIcon from '@mui/icons-material/Delete'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { Context } from '../context/AuthContext'
import Swal from 'sweetalert2'

const Grid = ({ setOnEdit }) => {
  const [products, setProducts] = useState([])
  const { logged } = useContext(Context)
  const [parameters, setParameters] = useState(() => ['Nome', 'Descrição', 'Preço', ''])

  // eslint-disable-next-line no-unused-vars
  const [columns, setColumns] = useState(['Nome', 'Descrição', 'Preço', ''])

  const formatCurrency = (value) => {
    return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  }

  useEffect(() => {
    const getProducts = async () => {
      const response = await client.products.findAll()
      setProducts(response)
    }
    getProducts()
  }, [])

  const handleDelete = async (id) => {
    await client.products.delete(id)
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: 'Produto Deletado',
      didClose: () => {
        window.location.reload()
      }
    })
  }

  const handleUpdate = async (item) => {
    setOnEdit(item)
  }

  const handleColumns = (event, newColumns) => {
    setParameters(newColumns)
  }

  return (
    <Container disableGutters={true}>
      {
        logged &&
        <ToggleButtonGroup
          sx={{ py: 2 }}
          value={parameters}
          onChange={handleColumns}
          aria-label="text formatting"
        >
          <ToggleButton value="Nome" >
            Nome
          </ToggleButton>
          <ToggleButton value="Descrição">
            Descrição
          </ToggleButton>
          <ToggleButton value="Preço" >
            Preço
          </ToggleButton>
          <ToggleButton value="">
            Funções
          </ToggleButton>
        </ToggleButtonGroup>
      }

     <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead sx={{ display: 'table-header-group' }}>
          <TableRow>
            {
              columns.length
                ? columns.map((column) => (
                  <TableCell
                    key={column}
                    sx={{ display: parameters.includes(column) ? 'table-cell' : 'none' }}
                    align="center">{column}</TableCell>
                ))
                : <></>
            }
          </TableRow>
        </TableHead>
        <TableBody>
          { products.length
            ? products?.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell
                align="center"
                scope="row"
                sx={{ display: parameters.includes('Nome') ? 'table-cell' : 'none' }}
              >
                  {product.name}
              </TableCell>
              <TableCell
                align="center"
                sx={{ display: parameters.includes('Descrição') ? 'table-cell' : 'none' }}
              >
                {product.description}
              </TableCell>
              <TableCell
                align="center"
                sx={{ display: parameters.includes('Preço') ? 'table-cell' : 'none' }}
              >
                {formatCurrency(parseFloat(product.price))}
              </TableCell>
               {
                logged &&
                <>
                  <TableCell
                    align="center"
                    sx={{ display: parameters.includes('') ? 'table-cell' : 'none' }}
                  >
                    <IconButton sx={{ height: '1ch' }} onClick={() => handleUpdate(product)}>
                      <ModeEditIcon />
                    </IconButton>
                     <IconButton sx={{ height: '1ch' }} onClick={() => handleDelete(product.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </>
               }
            </TableRow>
            ))
            : <></>
        }
        </TableBody>
      </Table>
    </TableContainer>
    </Container>

  )
}

export default Grid
