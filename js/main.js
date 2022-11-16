/*QUANTITY INPUT*/

let minusBtn = document.querySelector('.input__minus');
let plusBtn = document.querySelector('.input__plus');
let userImput = document.querySelector('.input__number');

//valor input
let userInputNumber = 0;

//evento para escuchar click en boton MAS y ejecutar funcion flecha.
plusBtn.addEventListener('click', () => {
    //aumentar en 1
    userInputNumber++;
    //impresion de valores en input
    userImput.value = userInputNumber;
});

//evento para escuchar click en boton MENOS y ejecutar funcion flecha.
minusBtn.addEventListener('click', () => {
    //disminuir en 1
    userInputNumber--;
    //condicional para no disminuir mas de 0
    if (userInputNumber <= 0) {
        userInputNumber = 0;
    }
    //impresion de valores en input
    userImput.value = userInputNumber;
});

/////////////////////////////////////////////////////////////////////

/*ADD TO CART TOTAL*/

const addToCartBtn = document.querySelector('.details__button');
let cartNotification = document.querySelector('.header__cart--notification');
//variable del valor anterior y convertimos en numero
let lastValue = parseInt(cartNotification.innerText);

//evento para aactualizar valor en carrito
addToCartBtn.addEventListener('click', () => {
    //sumamos lo que tenemos mas el actual
    lastValue = lastValue + userInputNumber;
    //agregamos valor del input al notification
    cartNotification.innerText = lastValue;
    //cambiamos estilos a el elemento para que aparesca.
    cartNotification.style.display = 'block';
    //llamado funcion para dibujar producto en modal
    drawProductInModal();
});

/////////////////////////////////////////////////////////////////////

/*MOSTRAR MODAL CON EL DETALLE DEL CARRITO*/

const cartIconBtn = document.querySelector('.header__cart');
const cartModal = document.querySelector('.cart-modal');
const productContainer = document.querySelector('.cart-modal__checkout-container');

cartIconBtn.addEventListener('click', () => {
    //modificamos estilos el display.
        //cartModal.style.display = 'block';

    //agregamos una clase con la funcion toggle
    cartModal.classList.toggle ('show');

    //condicional para que solo funcione cuando el valor sea igual a0
    if (lastValue === 0) {
        //agregamos un elemento p al contenedor principal, este sobreescribe lo anterios y solo deja el texto que vamos a ingresar
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    } else {
        //dibuja item en mini cart
        drawProductInModal();
    }

    //insertar una etiqueta html e insertamos variables en el html y multiplicamos por el precio que es fijo
    /*priceModal.innerHTML = `$125.00 x${lastValue} <span>${lastValue*125}.00</span>`;*/

})

/////////////////////////////////////////////////////////////////////

/*BORRAR LOS DETALLES DEL CARRITO*/

//funcion para eliminar
function deleteProduct() {

    const deleteProductBtn = document.querySelector('.cart-modal__delete');

    //evento click
    deleteProductBtn.addEventListener('click', () => {
        //agregamos un elemento p al contenedor principal, este sobreescribe lo anterios y solo deja el texto que vamos a ingresar
        productContainer.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        //reiniciamos valor del flotante del carrito
        lastValue = 0;
        //para reiniciar valor del flotante del carrito
        cartNotification.innerText = lastValue;

    })
};

/////////////////////////////////////////////////////////////////////

/*CAMBIO DE IMAGENES BOTONES FLECHAS*/

//seleccionamos contenedor
const imageContainer = document.querySelector('.gallery__image-container');
//botones
const previousGalleryBtn = document.querySelector('.gallery__previous');
const nextGalleryBtn = document.querySelector('.gallery__next');
let imgIndex = 1;

previousGalleryBtn.addEventListener('click', () => {
    changePreviustImage(imageContainer);

});
nextGalleryBtn.addEventListener('click', () => {
    changeNextImage(imageContainer);
});

/////////////////////////////////////////////////////////////////////
/*CAMBIO IMAGENES DE GALERIA CON THUMBNAILS*/

let thunmails = document.querySelectorAll('.gallery__thunmail');

//convertir en arreglo, expred operation, nos agregan muchisimos mas metodos.
thunmails = [...thunmails];

thunmails.forEach(thunmails => {
    //le damos un nombre al evento para recogerlo y luego imprimirlo
    thunmails.addEventListener('click', event => {
        console.log(event.target.id);
        imageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id}.jpg')`;
    })
});

/////////////////////////////////////////////////////////////////////
/*MOSTAR  MODAL VISTA RAPIDA AL HACER CLICK EN LA IMAGEN PRINCIAPL*/

const imageModal= document.querySelector('.modal-gallery__background')

imageContainer.addEventListener('click', () => {
   imageModal.style.display = 'grid';
});

/////////////////////////////////////////////////////////////////////
/*CERRAR VISTA RAPIDA*/

const closeModalBtn = document.querySelector('.modal-gallery__close');

closeModalBtn.addEventListener('click', () => {
    imageModal.style.display = 'none';
});

/////////////////////////////////////////////////////////////////////
/*CAMBIO DE IMAGENES BOTONES MODAL*/

const modalImageContainer = document.querySelector('.modal-gallery__image-container');
const previousModalBtn = document.querySelector('.modal-gallery__previous');
const nextModalBtn = document.querySelector('.modal-gallery__next');

previousModalBtn.addEventListener('click', () => {
    changePreviustImage(modalImageContainer);

});
nextModalBtn.addEventListener('click', () => {
    changeNextImage(modalImageContainer);
});

/////////////////////////////////////////////////////////////////////
/*CAMBIO IMAGENES DE VISTA RAPIDA CON THUMBNAILS*/

let modalThunmails = document.querySelectorAll('.modal-gallery__thunmail');

//convertir en arreglo, expred operation, nos agregan muchisimos mas metodos.
modalThunmails = [...modalThunmails];

modalThunmails.forEach(modalThunmails => {
    //le damos un nombre al evento para recogerlo y luego imprimirlo
    modalThunmails.addEventListener('click', event => {
        console.log(event.target.id[1]);
        /*
        tambien se puede cortar la primera parte del arreglo con
             console.log(event.target.id.slice(-1);
        */
        modalImageContainer.style.backgroundImage = `url('../images/image-product-${event.target.id[1]}.jpg')`;
    })
});


/////////////////////////////////////////////////////////////////////
/*MOSTAR NAVBAR HAMBURGUESA.*/

const modalNavbar = document.querySelector('.modal-navbar__background');
const navbar = document.querySelector('.header__menu');

navbar.addEventListener('click', () => {
    modalNavbar.style.display = 'block';
    imageContainer.style.zIndex = '-1';
});

/////////////////////////////////////////////////////////////////////
/*CERRAR MENU HAMBURGUESA*/

const closeNavbar = document.querySelector('.modal-navbar__close-icon');

closeNavbar.addEventListener('click', () => {
    modalNavbar.style.display = 'none';
    imageContainer.style.zIndex = '0';
});


/////////////////////////////////////////////////////////////////////

/*FUNCIONES*/

//funcion para crear producto en carrito
function drawProductInModal () {
    //dibujamos item a mini carrito
    productContainer.innerHTML = `
        <div class="cart-modal__details-container">
          <!--imagen articulo-->
          <img class="cart-modal__image" src="./images/image-product-1-thumbnail.jpg" alt="thumbnail">
          <!--descripcion articulo-->
          <div>
            <p class="cart-modal__product">Autumn Limited Edition...</p>
            <p class="cart-modal__price">$125.000 x 3 <span>$375.00</span></p>
          </div>
          <!--icono para borrar articulo-->
          <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="delete">
        </div>
        <!--procesar pago-->
         <button class="cart-modal__checkout">Checkout</button>
        `
    //llamamos funicon eliminar para que seleccione el valor que deseamos en ese mommento
    deleteProduct();

    //variables para que sea agarrada y pueda dar dinamismo a items
    let priceModal = document.querySelector('.cart-modal__price');
    //duplicamos este codigo para asegurarnos que siempre se nos actualizen las cantidades.
    priceModal.innerHTML = `$125.00 x${lastValue} <span>${lastValue*125}.00</span>`;

};

//funciones para cambiar imagenes flecha

//anterior imagen
function changePreviustImage(imgContainer) {
    if (imgIndex === 1) {
        imgIndex = 4;
    } else {
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
};

//siguiente imagen
function changeNextImage(imgContainer) {
    if (imgIndex === 4) {
        imgIndex = 1;
    } else {
        imgIndex++;
    }
    imgContainer.style.backgroundImage = `url('../images/image-product-${imgIndex}.jpg')`
};


