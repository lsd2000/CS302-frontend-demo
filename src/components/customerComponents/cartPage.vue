<template>
  <div class="Cart-Page">
    <h1>Your Cart</h1>

    <div class="Items-Container">
      <!-- for loop begins here -->
      <div
        class="individual-item"
        v-for="(order, orderIndex) in orders"
        :key="orderIndex"
      >
        <div class="product-image-container">
          <img
            :src="getProductImage(order.item_id)"
            alt="Product Image"
            class="product-image"
          />
        </div>
        <div class="product-content">
          <h5>Product Name: {{ order.item_name }}</h5>
          <table class="table" style="margin-top: 5px">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>${{ order.price }}</td>
                <td>{{ order.quantity }} pcs</td>
              </tr>
              <tr>
                <th scope="row" style="width: 25%">Item Description:</th>
                <td style>{{ getProductDes(order.item_id) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button-container">
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-danger"
              @click.prevent="deleteItem(orderIndex)"
            >
              Remove
            </button>
            <button
              type="button"
              class="btn btn-dark"
              data-toggle="modal"
              data-target="#QtyChangeModal"
              @click.prevent="populateData(order)"
            >
              Change Qty
            </button>

            <!-- Modal -->
            <div
              class="modal fade"
              id="QtyChangeModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="QtyChangeModalTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">
                      Edit Qty
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                      style="
                        background-color: transparent;
                        border: none;
                        font-size: 1.5rem;
                        padding: 0.5rem;
                      "
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-row">
                        <div class="col-md-4 mb-3">
                          <label for="QuantityValidation" style="margin: 10px"
                            >Qty Available : <b>{{ qtyAvailable }}</b>
                            <p>Price each: ${{ individualPrice }}</p></label
                          >

                          <input
                            type="text"
                            class="form-control"
                            :class="{
                              'is-valid': isQuantityValid,
                              'is-invalid': !isQuantityValid,
                            }"
                            id="QuantityValidation"
                            placeholder="Quantity"
                            v-model.number="qtyIndicated"
                            required
                            @input="updateTotalPrice"
                          />
                          <div v-if="isQuantityValid" class="valid-feedback">
                            Looks good!
                          </div>
                          <div v-else class="invalid-feedback">
                            {{ qtyWarning }}
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <p>Total Price: ${{ totalPricePerType }}</p>
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                      id="closeModalBtn"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      class="btn btn-primary"
                      @click.prevent="submitEdit()"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="checkout-details">
      <button
        type="button"
        class="btn btn-secondary btn-lg"
        @click="getCheckoutUrl()"
      >
        Check out
      </button>
      <h4 style="color: grey; margin: 7px">Total Amount: ${{ totalPrice }}</h4>
    </div>
  </div>
</template>



<script>
import { inventoryCartInstance, ordersInstance } from "../../views/axios";

export default {
  name: "cartPage",
  components: {},
  props: {
    user_data: {
      type: Object,
      required: true,
    },
    cart_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      orders: [],
      totalPrice: "",
      products: [],
      cartInfo: null,
      checkoutURL: "",

      qtyAvailable: "",
      individualPrice: "",
      qtyIndicated: "",
      totalPricePerType: "",
      itemId: "",
      or: null,
    };
  },
  computed: {
    isQuantityValid() {
      return this.qtyIndicated > 0 && this.qtyIndicated <= this.qtyAvailable;
    },
    qtyWarning() {
      if (this.qtyIndicated > this.qtyAvailable) {
        return "Not enough stock!";
      }
      return "Please choose a quantity";
    },
  },
  async created() {
    const url = `/cart/${this.cart_data.cart_id}/order`;

    try {
      const response = await ordersInstance.get(url);
      this.orders = response.data.orders;
      this.cartInfo = response.data.cart_info;
      this.totalPrice = this.cartInfo.total_price;
      const responseInv = await inventoryCartInstance.get("inventory");
      this.products = responseInv.data.inventories;
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    getProductIndex(item_id) {
      const productIndex = this.products.findIndex(
        (product) => product.item_id === item_id
      );
      return productIndex; // Return the index of the product in the products array
    },
    getProductImage(item_id) {
      const productIndex = this.getProductIndex(item_id);
      if (productIndex !== -1) {
        return this.products[productIndex].image_url;
      } else {
        return ""; // Return an empty string if the product is not found
      }
    },

    updateTotalPrice() {
      this.totalPricePerType = this.qtyIndicated * this.individualPrice;
    },

    getProductAvailableQty(item_id) {
      const productIndex = this.getProductIndex(item_id);
      if (productIndex !== -1) {
        return this.products[productIndex].quantity;
      } else {
        return ""; // Return an empty string if the product is not found
      }
    },

    getProductPrice(item_id) {
      const productIndex = this.getProductIndex(item_id);
      if (productIndex !== -1) {
        return this.products[productIndex].price;
      } else {
        return ""; // Return an empty string if the product is not found
      }
    },

    getProductId(item_id) {
      const productIndex = this.getProductIndex(item_id);
      if (productIndex !== -1) {
        return this.products[productIndex].item_id;
      } else {
        return ""; // Return an empty string if the product is not found
      }
    },
    getProductDes(item_id) {
      const productIndex = this.getProductIndex(item_id);
      if (productIndex !== -1) {
        const description = this.products[productIndex].item_description;
        // Split the description into words and limit to 10 words
        const words = description.split(" ");
        if (words.length > 10) {
          return words.slice(0, 10).join(" ") + "...";
        } else {
          return description;
        }
      } else {
        return ""; // Return an empty string if the product is not found
      }
    },
    async deleteItem(orderId) {
      //orderId here is the index of the order array

      const orderIdtoDeleteInDB = this.orders[orderId].order_id;

      const url = `/cart/delete/${orderIdtoDeleteInDB}`;

      try {
        const response = await ordersInstance.delete(url);
        window.alert("Item is removed from cart successfully!");

        this.totalPrice = this.totalPrice - this.orders[orderId].price;

        if (orderId !== -1) {
          this.orders.splice(orderId, 1);
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async populateData(order) {
      const orderIndex = order.item_id;
      this.qtyAvailable = this.getProductAvailableQty(orderIndex);
      console.log(this.qtyAvailable);
      this.individualPrice = this.getProductPrice(orderIndex);
      this.itemId = this.getProductId(orderIndex);
      console.log(this.itemId);
      this.or = order;
    },

    async submitEdit() { //somehow it is not allowed for us to take order twice. 
    //hence, we have to define order in the data instead from the first method instead
      const orderIndex = this.or.order_id;
      const url = `/cart/order/${orderIndex}`;
      console.log(url);
      const dataToEdit = {
        cart_id: this.cart_data.cart_id,
        item_id: this.itemId,
        quantity: this.qtyIndicated,
      };

      try {
        const response = await ordersInstance.patch(url, dataToEdit);
        window.alert("Product Edit is successful!");
        console.log(response);
        const currentqty = this.or.quantity;
        this.totalPrice = this.totalPrice - currentqty * this.individualPrice;
        const newPrice = this.qtyIndicated * this.individualPrice;
        this.totalPrice = this.totalPrice + newPrice;

        const editedOrderIndex = this.orders.findIndex(
          (o) => o.order_id === this.or.order_id
        );

        this.orders[editedOrderIndex].quantity = this.qtyIndicated;
        this.orders[editedOrderIndex].price = newPrice;
        this.qtyIndicated = "";
      } catch (error) {
        window.alert("Please choose another quantity");
        console.log(error);
      }
    },

    async getCheckoutUrl() {
      const url = `/cart/checkout/${this.cart_data.cart_id}`;

      try {
        const response = await ordersInstance.get(url);
        this.checkoutURL = response.data.payment_url;
        window.location.href = this.checkoutURL;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.Cart-Page {
  text-align: center;
  justify-content: center;
  padding: 15px;
  max-height: 90vh; /* Set a maximum height for the container */
  overflow: auto; /* Show scroll bars when content exceeds the container height */
}

.Items-Container {
  max-width: 70%;
  margin: 0 auto; /* Center the container horizontally */
  border: solid rgb(181, 178, 178) 1px;
  background-color: white;
  padding: 5px;
  margin-top: 20px;
}

.individual-item {
  text-align: left; /* Align text (and content) within .individual-item to the left */
  height: 25vh; /* Set the height to 50% of the viewport height */
  border-bottom: solid rgb(181, 178, 178) 1px;
  padding: 15px;
  display: flex; /* Use flex to control image width */
}

.product-image-container {
  height: 100%;
  width: 20%;
}

.product-image {
  height: 100%;
  width: 100%;
  object-fit: cover; /* Ensure the image covers the container while maintaining aspect ratio */
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
}

.product-content {
  margin-left: 10px;
  width: 50%;
  padding-top: 5px;
}

.table {
  border: none; /* Remove the outer border of the table */
}

.table td,
.table th {
  border: none; /* Remove the border of table cells (inner borders) */
}

.button-container {
  width: 30%;
  display: flex;
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally */
}

.checkout-details {
  max-width: 70%;
  margin: 0 auto; /* Center the container horizontally */
  margin-top: 40px;
  border-top: solid 1px #ddd;
  text-align: right; /* Align text (and content) within .individual-item to the right */
  padding: 10px;
}
</style>
