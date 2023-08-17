export const genereteUserErrorInfo= (product)=>{
    return `
    Una o mas propiedades del usuario son invalidas!!
    Lista de propiedades invalidas:
    title: ${product.title}
    description: ${product.description}
    price: ${product.price}
    `	
    
}
