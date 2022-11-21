const order = {
    patternDate() {
        let date = new Date();
        date.setDate(date.getDate()+1);
        return [date.getFullYear(), ('0' + (date.getMonth() + 1)).slice(-2), date.getDate()].join('-');
    },

    totalPrice() {
        return localStorage.getItem('totalPrice');
    },

    validate_form() {
        const customer_name = document.getElementById("customer_name");
        const customer_surname = document.getElementById("customer_surname");
        const date = document.getElementById("date");
        const street = document.getElementById("street");
        const house_number = document.getElementById("house_number");
        const flat_number = document.getElementById("flat_number");
        const pay_cash = document.getElementById("pay_cash");
        const pay_card = document.getElementById("pay_card");
        const gift_pack = document.getElementById("gift_pack");
        const gift_postcard = document.getElementById("gift_postcard");
        const gift_discount = document.getElementById("gift_discount");
        const gift_pen = document.getElementById("gift_pen");
        const buttonSubmit =  document.getElementById("submit");

        customer_name.innerHTML = customer_name.validationMessage;
        customer_surname.innerHTML = customer_surname.validationMessage;
        date.innerHTML = date.validationMessage;
        street.innerHTML = street.validationMessage;
        house_number.innerHTML = house_number.validationMessage;
        flat_number.innerHTML = flat_number.validationMessage;
        pay_card.innerHTML = pay_card.validationMessage;
        pay_cash.innerHTML = pay_cash.validationMessage;

        if (customer_name.validity.valid &&
            customer_surname.validity.valid &&
            date.validity.valid &&
            street.validity.valid &&
            house_number.validity.valid &&
            flat_number.validity.valid &&
            (pay_card.validity.valid || pay_cash.validity.valid)) {
                buttonSubmit.disabled = false;;
            } else {
                buttonSubmit.disabled = true;
        }
        if (gift_pack.checked && gift_postcard.checked) {
            gift_discount.disabled = true;
            gift_pen.disabled = true;
        }
        if (gift_pack.checked && gift_discount.checked) {
            gift_postcard.disabled = true;
            gift_pen.disabled = true;
        }
        if (gift_pack.checked && gift_pen.checked) {
            gift_discount.disabled = true;
            gift_postcard.disabled = true;
        }
        if (gift_discount.checked && gift_postcard.checked) {
            gift_pack.disabled = true;
            gift_pen.disabled = true;
        }
        if (gift_discount.checked && gift_pen.checked) {
            gift_pack.disabled = true;
            gift_postcard.disabled = true;
        }
        if (gift_pen.checked && gift_postcard.checked) {
            gift_pack.disabled = true;
            gift_discount.disabled = true;
        }
        if (!gift_pack.checked && gift_postcard.checked && !gift_discount.checked && !gift_pen.checked) {
            gift_pack.disabled = false;
            gift_discount.disabled = false;
            gift_pen.disabled = false;
        }
        if (!gift_pack.checked && !gift_postcard.checked && gift_discount.checked && !gift_pen.checked) {
            gift_postcard.disabled = false;
            gift_pack.disabled = false;
            gift_pen.disabled = false;
        }
        if (!gift_pack.checked && !gift_postcard.checked && !gift_discount.checked && gift_pen.checked) {
            gift_postcard.disabled = false;
            gift_discount.disabled = false;
            gift_pack.disabled = false;
        }
    },

    orderChecked() {
        localStorage.setItem('customer_name', document.getElementById("customer_name").value);
        localStorage.setItem('customer_surname', document.getElementById("customer_surname").value);
        localStorage.setItem('date', document.getElementById("date").value);
        localStorage.setItem('street', document.getElementById("street").value);
        localStorage.setItem('house_number', document.getElementById("house_number").value);
        localStorage.setItem('flat_number', document.getElementById("flat_number").value);
        let output = '';
            output = `
            <div class="modal_card">
                <p class="order_status">The order created successfully!
                    <img class="icon_check" src="https://www.freeiconspng.com/uploads/check-mark-icon-png-square-ok-28.png" alt="icon_check"/>
                </p>
                </br>
                <p class="text" >The delivery address is <u><b>${localStorage.getItem('street')}</b></u> street
                    house <u><b>${localStorage.getItem('house_number')}</b></u> flat <u><b>${localStorage.getItem('flat_number')}</b></u>.</p>
                <p class="text">Customer <u><b>${localStorage.getItem('customer_name')} ${localStorage.getItem('customer_surname')}</b></u>.</p>
                <div class="modal_close" type="button">+<div>
            </div>`

        document.querySelector('.modal_container').style.display='block';
        document.querySelector('.modal_container').innerHTML = output;
        const closeButton = document.querySelector('.modal_close');
            closeButton.onclick = () => {
                document.querySelector('.modal_container').style.display='none';
                document.location.href = "../main/index.html";
            }
    }
}

document.getElementById('date').min = order.patternDate();
document.body.addEventListener('mousemove', order.validate_form);
document.getElementById('total_count').innerHTML = `${localStorage.getItem('totalPrice')}`;
document.getElementById('submit').addEventListener('click', order.orderChecked);