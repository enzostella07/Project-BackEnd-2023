const carrito = document.getElementsByClassName('cartId');

const purchaseCart = (cartId) => {
  //obteniendo datos de cartId
  fetch(`/api/carts/${cartId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const products = data.payload.products;
      const formatProduct = products.map((product) => {
        return {
          id: product._id,
          quantity: product.quantity,
        };
      });
      // console.log('desde front', formatProduct);

      fetch(`/api/carts/${cartId}/purchase`, {
        method: 'PUT',
        body: JSON.stringify(formatProduct),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          alert(`🎉 Estamos procesando tu compra!. El carrito se vaciará solo con los productos con stock disponible.`);
          window.location.href("/products");
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
