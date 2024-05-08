import React, { useState, useEffect } from "react"
import Axios from "axios"
import SelectSimpleController from "./SelectSimpleController"
import NumberFormatFree from "components/Core/NumberFormat/NumberFormatFree"
import { Controller } from "react-hook-form"

export default function ProductController(props) {
  const { errors, control, objForm, index, ...rest } = props
  const [products, setProducts] = useState([])
  const [offices, setOffcies] = useState([])

  async function getProducts() {
    const prod = await Axios.post("/dbo/toolkit/get_list_of_products")
    const offi = await Axios.post("/dbo/toolkit/get_list_of_offices")
    setProducts(prod.data.p_cursor)
    setOffcies(offi.data.p_cursor)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <>
      <SelectSimpleController
        {...rest}
        control={control}
        label="Producto"
        name={`p_product_${index}`}
        array={products}
        required={false}
      />
      <SelectSimpleController
        {...rest}
        control={control}
        label="Oficina"
        name={`p_office_${index}`}
        array={offices}
        required={false}
      />
      <Controller
        name="p_policy_number"
        control={control}
        rules={{ required: false }}
        render={({ field }) => (
          <NumberFormatFree
            {...field}
            label="Número de póliza"
            variant="standard"
            fullWidth
          />
        )}
      />
    </>
  )
}
