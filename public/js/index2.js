const cartInfoElement = document.querySelector('.cartInfo');
const putIntoCart = (id) => {
  const cartIdValue = cartInfoElement?.getAttribute("id");
  fetch(`/api/carts/${cartIdValue}/products/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(
        `Producto con el id: ${id} se agregó al cart con id: ${cartIdValue}`
      );
    })
    .catch((err) => console.log(err));
};



