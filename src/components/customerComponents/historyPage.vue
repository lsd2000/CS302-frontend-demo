<template>
  <div class="history-container">
    <div class="history-header">
      <h1>Order History</h1>
    </div>
    <div
      v-for="(history, historyIndex) in histories"
      :key="historyIndex"
      class="col-md-12"
    >
      <div class="border border-secondary" style="margin: 8px">
        <div class="history-content">
          <div class="history-item">
            <div class="order-number">Order #{{ historyIndex + 1 }}</div>
            <div class="order-details" style="white-space: pre-line">
              <p style="margin-right: 50px">
                <b>Created on:</b> {{ history.cart_info.created }}
              </p>
              <br />
              <p style="margin-right: 50px">
                <b>Total price: </b>${{ history.cart_info.total_price }}
              </p>
              <br />
              <p style="margin-right: 50px">
                <b>Status:</b> {{ history.cart_info.status }}
              </p>
            </div>
            <div class="color-boxes">
              <button class="color-button" @click="togglePopup(historyIndex)">View</button>
            </div>
          </div>
        </div>
      </div>
      <div class="popup" v-if="history.showPopup">
        <div class="popup-content">
          <div class="popup-header">
            <h4>Order #{{ historyIndex + 1 }}</h4>
            <span class="close-button" @click="togglePopup(historyIndex)">X</span>
          </div>
          <div
            v-for="(order, orderIndex) in histories[historyIndex].orders"
            :key="orderIndex"
            class="col-md-4"
          >
            <div class="popup-body">
              <div class="popup-text">
                <h2>{{ order.item_name }}</h2>
                <h5>Qty:{{ order.quantity }} Price:${{ order.price }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ordersInstance } from "../../views/axios";

export default {
  name: "historyPage",
  components: {},
  props: {
    user_data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      histories: [],
    };
  },
  async created() {
    // Construct the URL with the user's ID
    const user_id = this.user_data.id;
    // Construct the URL with the user's ID
    const url = `/cart/order_history/user/${user_id}`;
    console.log(url);

    try {
      const response = await ordersInstance.get(url);
      console.log(response);
      this.histories = response.data.history.map(history => {
        return {
          ...history,
          showPopup: false // Add a showPopup property for each history object
        };
      });
    } catch (error) {
      console.log(error);
    }
  },

  methods: {
    togglePopup(index) {
      // Toggle the visibility of the popup for the given index
      this.histories[index].showPopup = !this.histories[index].showPopup;
    },
  },
};
</script>

<style scoped>
.history-container {
  text-align: center;
}

.history-header {
  margin: 20px;
}

.history-item {
  display: flex;
  align-items: center;
}

.order-number {
  width: 100px;
  height: 100px;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  border: 1px solid #e8e8e8;
  font-weight: bold;
  font-family: Montserrat;
  background-color: #e8e8e8;
}

.order-details {
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-family: Montserrat;
}

.color-boxes {
  display: flex;
  flex: 1;
  justify-content: flex-end; /* Align boxes to the right */
  align-items: stretch;
  font-family: Montserrat;
}

.color-button {
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e8e8e8;
  border: 1px solid #e8e8e8;
  cursor: pointer;
}

.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
}

.popup-content {
  background: #ffffff;
  padding: 30px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 100%;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.popup-text {
  font-family: Montserrat;
  flex: 1;
}

.popup-body {
  /* ... */
  padding: 10px; /* Increase padding for larger content inside the popup body */
  border-bottom: 1px solid #ccc;
}

.popup-text h2 {
  font-size: 24px; /* Increase the font size of h2 for larger headings */
  margin-bottom: 10px; /* Increase margin-bottom for more spacing between heading and text */
}

.popup-text h5 {
  font-size: 18px; /* Increase the font size of h5 for larger subheadings */
  color: #888;
  margin: 0;
}


.close-button {
  cursor: pointer;
}

.text {
  margin: 0;
}
</style>
