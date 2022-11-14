let tempCart = [];
let totalPrice = 0;

document.addEventListener('DOMContentLoaded', () => {
    const fragment = document.createDocumentFragment();

    const body = document.querySelector('body');

    //main wrapper
    let wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');
    document.body.appendChild(wrapper);


    //header
    const header = document.createElement('header');

    const header_container = document.createElement('div');
    header_container.classList.add('header_container');

    const h1 = document.createElement('h1');
    h1.textContent = 'Welcome to amazing Book Shop!';

    const headerLogo = document.createElement('div');
    headerLogo.classList.add('header_logo');

    const image = document.createElement('img');
    image.src = "../../assets/images/book_image.png";
    image.alt = "header_logo";

    header.append(header_container);
    header_container.append(h1, headerLogo);
    headerLogo.append(image);

    //main
    const main = document.createElement('main');

    const main_container = document.createElement('div');
    main_container.classList.add('main_container');

    //book catalog
    const book_catalog = document.createElement('div');
    book_catalog.classList.add('book_catalog');

    const catalog_name = document.createElement('h2');
    catalog_name.classList.add('catalog_name');
    catalog_name.innerHTML = 'Catalog';

    //book items
    const book_list = document.createElement('div');
    book_list.classList.add('book_list');

     //cart
    const cart = document.createElement('div');
    cart.classList.add('cart');

    const cart_name = document.createElement('h2');
    cart_name.classList.add('cart_name');
    cart_name.innerHTML = 'Cart';

    //cart items
    const cart_list = document.createElement('div');
    cart_list.classList.add('cart_list');

    //total cart section
    const total = document.createElement('div');
    total.classList.add('total');
    total.innerHTML = `
        <div class="line">
            <hr>
        </div>
        <div class="total_summary">
            <p>Total: <b><span class="total_count">${totalPrice}</span></b></p>
            <button disabled id="button_confirm" type="button"
                onClick="location.href='../delivery/index.html'">Confirm order</button>
        </div>`;

    book_catalog.append(catalog_name, book_list);
    cart.append(cart_name, cart_list, total);

     main_container.append(book_catalog, cart);
     main.append(main_container);

    //modal
    const modalContainer = document.createElement('div');
    modalContainer.classList.add('modal_container');

    //footer
    const footer = document.createElement('footer');
    footer.classList.add('footer');

    const footer_text = document.createElement('h3');
    footer_text.innerHTML = '© 2022 Book Shop - Liudmyla Melnychuk';

    footer.append(footer_text);

    wrapper.append(header, main, modalContainer, footer);

    fetch('./book.json')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let books = data.map((item, index) => ({...item, id: index}));
            return books;
        })
        .then(data => {
            bookCatalog(data);
        });

    fragment.appendChild(wrapper);
    body.appendChild(fragment);
});

//book catalog
function bookCatalog(data) {
    let output = '';
    for (let item of data) {
        output += `
        <div draggable="true" class="book_card">
            <div class="book_info">
                <img src="${item.imageLink}" alt="image_book">
                <div class="about_book">
                    <p class="title">${item.title}</p>
                    <p class="author">${item.author}</p>
                    <p class="price">${item.price}$</p>
                </div>
            </div>
            <div class="book_buttons">
                <button class="button_more" type="button">Show more</button>
                <button class="button_cart" type="button">Add to cart</button>
            </div>
        </div>`
    }

    document.querySelector('.book_list').innerHTML = output;

    const moreButton = document.querySelectorAll('.button_more');
    moreButton.forEach((button, index) => {
      button.onclick = () => {
            openModal(data, index);
      }
    });

    //modal window
    function openModal(data, index) {
    let output = '';
        output = `
        <div class="modal_card">
            <p class="author">${data[index].author}</p>
            <p class="title">${data[index].title}</p>
            <p class="description">${data[index].description}</p>
            <div class="modal_close" type="button">+<div>
        </div>`

    document.querySelector('.modal_container').style.display='block';
    document.querySelector('.modal_container').innerHTML = output;
    const closeButton = document.querySelector('.modal_close');
        closeButton.onclick = () => {
            document.querySelector('.modal_container').style.display='none';
        }
    }

    const cartButton = document.querySelectorAll('.button_cart');
    cartButton.forEach((button, index) => {
        button.onclick = () => {
            addToCart(data, index);
        }
    })
}

//add to cart
function addToCart(data, index) {
    tempCart.push(data[index]);

    totalPrice += data[index].price;
    localStorage.setItem('totalPrice', totalPrice);
    updateCart(tempCart);

    let btn_confirm = document.getElementById('button_confirm');
    btn_confirm.disabled = false;

    return totalPrice;
}

function updateCart(tempCart) {
    if (tempCart.length > 4) {
        alert('Your cart is full!');
    } else {
        let output = '';
        for (let item of tempCart) {
            output += `
                <div class="book_card">
                    <img src="${item.imageLink}" alt="image_book">
                    <div class="about_book">
                        <p class="title">${item.title}</p>
                        <p class="author">${item.author}</p>
                        <button class="button_delete" type="button">
                            <img id="icon_delete" src="../../assets/icons/delete_icon.svg" alt="delete_icon"/>
                        </button>
                    </div>
                </div>`
        }

        document.querySelector('.cart_list').innerHTML = output;
        document.querySelector('.total_count').innerHTML = `${totalPrice}$`;

        const removeButton = document.querySelectorAll('.button_delete');
        removeButton.forEach((button, index) => {
            button.onclick = () => {
                removeFromCart(index);
            }
        })
    }
}

//remove from cart
function removeFromCart(index) {
    if (totalPrice !== 0){
        totalPrice -= tempCart[index].price;
        document.querySelector('.total_count').innerHTML = `${totalPrice}$`;
    }
    tempCart.splice(index, 1);
    updateCart(tempCart);

    if (tempCart.length === 0){
        let btn_confirm = document.getElementById('button_confirm');
        btn_confirm.disabled = true;
        alert('Your cart is empty!');
    }

    localStorage.setItem('totalPrice', totalPrice);
    return tempCart, totalPrice;
}