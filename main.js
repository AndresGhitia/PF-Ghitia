const comprarEfecto = document.getElementById("comprarEfecto")
const Carrito = document.getElementById("Carrito")
const ventanaCompras = document.getElementById("ventanaCompras")
const cantidadCarrito = document.getElementById("cantidadCarrito")

const modelos =[
    {
        id:1,
        nombre: "Andromeda",
        precio: 49000,
        cantidad: 1,
        img: "../images/modelos/Andromeda.png",
    },
    {
        id:2,
        nombre: "Teleport",
        precio: 49000,
        cantidad: 1,
        img: "../images/modelos/Teleport.png",
    },
    {
        id:3,
        nombre: "Nautilus",
        precio: 45000,
        cantidad: 1,
        img: "../images/modelos/Nautilus.png",
    },
    {
        id:4,
        nombre: "Saturno",
        precio: 45000,
        cantidad: 1,
        img: "../images/modelos/Saturno.png",
    },
];

let carrito = JSON.parse(localStorage.getItem("Backup")) || [];

modelos.forEach((effect)=>{
    let efectos = document.createElement("article");
    efectos.className = "card";
    efectos.innerHTML = `
        <img src ="${effect.img}" class ="img-pdls"/>
        <p class="card-txt"> ${effect.nombre}</p>
        <p class="card-txt">$${effect.precio}</p>
    `;
    comprarEfecto.append(efectos);

    let comprar = document.createElement("button")
    comprar.className ="btn-buy";
    comprar.innerText = "Agregar al carrito" ;

    efectos.append(comprar)
    comprar.addEventListener("click", () => {
        const repeat = carrito.some((repeatProduct) => repeatProduct.id === effect.id);
        if(repeat) {
            carrito.map((prod) => {
                if (prod.id === effect.id){
                    prod.cantidad++;
                }
            });
        } else{ 
            carrito.push({
                id: effect.id,
                img: effect.img,
                nombre: effect.nombre,
                precio: effect.precio,
                cantidad: effect.cantidad,            
            });
        }
        carritoCounter();
        saveLocal();
    })
})

    const llenarCarrito = () => {
        ventanaCompras.innerHTML = "";
        ventanaCompras.style.display = "flex";
        
    const ventanaTitulo = document.createElement("div");
        ventanaTitulo.className = "header";
        ventanaTitulo.innerHTML = `<h1 class="carrito-nombre">carrito</h1>`;
        ventanaCompras.append(ventanaTitulo);

    const botonCerrar = document.createElement("h1");
        botonCerrar.innerText = "x";
        botonCerrar.className = "btn-cerrar";
        botonCerrar.addEventListener("click", () => {
        ventanaCompras.style.display = "none";
    });

        ventanaTitulo.append(botonCerrar);

    carrito.forEach((effect) => {
        let carritoModelos = document.createElement("div");
        carritoModelos.className = "carrito-modelos";
        carritoModelos.innerHTML =`
            <img src= "${effect.img}" class="img-buy">
            <p class="card-txt">${effect.nombre}</p>
            <p class="card-txt">$${effect.precio}</p>
            <p class="card-txt">Cantidad: ${effect.cantidad}</p>
            <p class="card-txt">Total: $${effect.cantidad * effect.precio}</p>
        `;
        ventanaCompras.append(carritoModelos);
        
        let eliminar = document.createElement("span");
        eliminar.innerText = "x";
        eliminar.className = "elimnar-prducto";
        carritoModelos.append(eliminar);
        eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
    const totalFinal = document.createElement("div")
        totalFinal.className = "carrito-total"
        totalFinal.innerHTML = `Total a Pagar: $${total}`;
        ventanaCompras.append(totalFinal);
};

Carrito.addEventListener("click", llenarCarrito);

const eliminarProducto = () =>{
    const foundId = carrito.find((element) => element.id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !==foundId;
    });
    carritoCounter ();
    saveLocal();
    llenarCarrito();
};


const carritoCounter = () => {
    cantidadCarrito.style.display = "block";
    const carritoLength = carrito.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));  
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));    
};

carritoCounter();

const saveLocal=() =>{
    localStorage.setItem("Backup",JSON.stringify(carrito))
};

