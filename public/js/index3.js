const carrito = document.getElementsByClassName('cartId');

const purchaseCart = (cartId) => {
  //obteniendo datos de cartId
  console.log(cartId);
  fetch(`http://localhost:8080/api/carts/${cartId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const products = data.payload;
      const formatProduct = products.map((product) => {
        return {
          id: product.id._id,
          quantity: product.quantity,
        };
      });
      // console.log('desde front', formatProduct);
    });

  fetch(`http://localhost:8080/api/carts/${cartId}/purchase`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const id = data.payload._id;
      setTimeout(() => {
        window.location.href = `/api/carts/purchase/${id}`;
      }, 3000);
      alert(
        `🎉 Estamos procesando tu compra!. El carrito se vaciará solo con los productos con stock disponible.`,
      );
    })
    .catch((err) => console.log(err));
};
