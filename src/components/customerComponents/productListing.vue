<template>
  <div class="productListing">
    <div class="container">
      <div class="row">
        <div
          class="row"
          style="position: relative; top: 20px; margin-bottom: 60px"
        >
          <h3>Welcome, {{ user_data.first_name }} {{ user_data.last_name }}</h3>
        </div>
        <div
          v-for="(product, productIndex) in products"
          :key="productIndex"
          class="col-md-4"
        >
          <div class="card" style="width: 18rem; margin: 15px">
            <img
              :src="product.image_url"
              class="card-img-top"
              alt="Card image cap"
            />
            <div class="card-body">
              <h5 class="card-title">{{ product.item_name }}</h5>
              <p class="card-text">
                {{ limitWords(product.item_description, 8) }}
              </p>

              <!-- Button trigger modal -->
              <button
                type="button"
                class="btn btn-outline-dark"
                data-toggle="modal"
                data-target="#PurchaseModal"
                @click.prevent="loadProductData(productIndex)"
              >
                Add to cart
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="PurchaseModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="PurchaseModalTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Add to cart
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
                              >Qty Available : <b>{{ inventoryQty }}</b></label
                            >
                            <p>Price each: ${{price}}</p>
                            <input
                              type="text"
                              class="form-control"
                              :class="{
                                'is-valid': isQuantityValid,
                                'is-invalid': !isQuantityValid,
                              }"
                              id="QuantityValidation"
                              placeholder="Quantity"
                              v-model.number="qty"
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
                      <p>Total Price: ${{ totalPrice }}</p>
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
                        @click.prevent="submitOrder"
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul class="list-group list-group-flush" style="text-align: left">
              <li class="list-group-item">
                <b>Price: ${{ product.price }}</b>
              </li>
              <li class="list-group-item">
                <b>Qty Available: {{ product.quantity }}</b>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { inventoryCartInstance, ordersInstance } from "../../views/axios";

export default {
  name: "productListing",
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
      products: [], // Initialize products as an empty array to store the product data
      itemId: "",
      qty: "",
      price: "",
      totalPrice: "",
      inventoryQty: "",
    };
  },
  computed: {
    isQuantityValid() {
      return this.qty > 0 && this.qty <= this.inventoryQty;
    },
    qtyWarning() {
      if (this.qty > this.inventoryQty) {
        return "Not enough stock!";
      }
      return "Please choose a quantity";
    },
  },
  async created() {
    console.log("Print statements for product Listing Page");

    console.log("check productListing.vue");
    console.log(this.cart_data);
    console.log(this.user_data);
    console.log("check productListing.vue");
    // Construct the URL with the user's ID
    const url = `inventory`;

    try {
      const response = await inventoryCartInstance.get(url);
      console.log(response);
      this.products = response.data.inventories; // Set the products data property with the received data
      console.log(response.data);
      console.log(this.products[0]);
    } catch (error) {
      console.log(error);
    }
    console.log(this.products);
  },
  methods: {
    //To change this method after api is done
    onFileChange(event) {
      // Get the selected file
      this.file = event.target.files[0];
      this.fileName = this.file.name;

      // Create a URL for the selected file to display it to the user
      this.imageURL = URL.createObjectURL(this.file);
    },
    limitWords(text, limit) {
      if (!text) return "";
      const words = text.split(" ");
      if (words.length <= limit) return text;
      return words.slice(0, limit).join(" ") + " ...";
    },
    async loadProductData(index) {
      console.log(index);
      const product = this.products[index];
      console.log(product);
      this.price = product.price;
      this.inventoryQty = product.quantity;
      this.itemId = product.item_id;
    
    },
    updateTotalPrice() {
      this.totalPrice = this.qty * this.price;
    },

    async submitOrder() {
      const purchaseData = {
        item_id: this.itemId,
        quantity: this.qty,
        price: this.totalPrice,
      };

      const url = `/cart/${this.cart_data.cart_id}/add`;

      try {
        const response = await ordersInstance.post(url, purchaseData);
        window.alert("Add to cart is successful!");
        console.log(response);
        document.getElementById("closeModalBtn").click();
        this.qty = "";
      } catch (error) {
        window.alert("Item is already in cart!");
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.row {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
}

.productListing {
  overflow-y: auto;
  max-height: 85vh;
}
</style>
