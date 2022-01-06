import { useState } from "react"

function ProductRow(props) {
  const name = props.product.stocked ?
    props.product.name :
    <span style={{ color: 'red' }}>{props.product.name}</span>
  return (
    <tr>
      <td>{name}</td>
      <td>{props.product.price}</td>
    </tr>
  )
}

function ProductCategoryRow(props) {
  return (
    <tr>
      <th colSpan="2">{props.category}</th>
    </tr>
  )
}

function ProductTable(props) {
  const { products, filterText, inStockOnly } = props
  const rows = []
  let lastCategory = null

  products.forEach(product => {
    if (product.name.indexOf(filterText) === -1) {
      return
    }

    if (inStockOnly && !product.stocked) {
      return
    }

    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      )
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    )
    lastCategory = product.category
  })

  return (
    <table style={{ margin: 'auto' }}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function SearchBar(props) {
  return (
    <form>
      <input
        type="text"
        value={props.filterText}
        placeholder="Search..."
        onChange={handleFilterTextChange}
      />
      <p>
        <input
          type="checkbox"
          checked={props.inStockOnly}
          onChange={handleInStockChange}
        />
        Only show products in stock
      </p>
    </form>
  )

  function handleFilterTextChange(e) {
    props.onFilterTextChange(e.target.value)
  }

  function handleInStockChange(e) {
    props.onInStockChange(e.target.checked)
  }
}

function FilterableProductTable(props) {
  const [filterText, setFilterText] = useState('')
  const [inStockOnly, setInStockOnly] = useState(false)

  return (
    <div>
      <SearchBar
        filterText={filterText}
        inStockOnly={inStockOnly}
        onFilterTextChange={setFilterText}
        onInStockChange={setInStockOnly}
      />
      <ProductTable
        products={props.products}
        filterText={filterText}
        inStockOnly={inStockOnly}
      />
    </div>
  )
}

export const PRODUCTS = [
  { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
  { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
  { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
  { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
  { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
  { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
]

export default FilterableProductTable