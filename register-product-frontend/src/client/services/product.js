const ProductService = (http) => ({
  findAll: async () => {
    const { data } = await http.get('/products')
    return data
  },
  create: async (product) => {
    const { data } = await http.post('/products', product)
    return data
  },
  update: async (id, value) => {
    const { data } = await http.patch(`/products/${id}`, value)
    return data
  },
  delete: async (id) => {
    const { data } = await http.delete(`/products/${id}`)
    return data
  }
})

export default ProductService
