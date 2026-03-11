import { removeFromCart } from "../../services/Order.js";

export class OrderPage extends HTMLElement {
  connectedCallback() {
    window.addEventListener("appcartchange", () => this.render());
    this.render();
  }

  render() {
    const cart = app.store.cart;

    this.innerHTML = `
      <h1>Tu orden</h1>
      ${cart.length === 0 
        ? "<p>El carrito está vacío</p>" 
        : cart.map(item => `
            <div>
              <p>${item.product.name}</p>
              <p>Cantidad: ${item.quantity}</p>
              <p>Precio: $${item.product.price}</p>
              <button data-id="${item.product.id}">Eliminar</button>
            </div>
          `).join("")
      }
    `;

    this.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", () => {
        removeFromCart(button.dataset.id);
      });
    });
  }
}

customElements.define("order-page", OrderPage);