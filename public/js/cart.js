const cartBtns = document.querySelectorAll('.increment, .decrement');
cartBtns.forEach(async (cartBtn) => {

    cartBtn.addEventListener('click', async () => {

        const itemQty = cartBtn.parentElement.children[1];
        let qty = Number(itemQty.innerHTML);
        if (cartBtn.getAttribute('op') === '+') {
            qty++;
        } else if (qty > 0) {
            qty--;
        }

        itemQty.innerHTML = qty;
        let cart = JSON.parse((await cookieStore.get('cart'))?.value || '[]');
        // console.table(cart);
        const itemId = itemQty.getAttribute('item-id');
        const item = cart.find(item => item.id === itemId);
        if (item) {

            if (qty === 0) {
                cart = cart.filter(item => item.id !== itemId);
            } else {
                item.quantity = qty;
            }
        } else if (qty !== 0) {
            cart.push({ id: itemId, quantity: qty });
        }
        await cookieStore.set('cart', JSON.stringify(cart));
        console.table(cart);
    });
});