<template>
  <div class="payment-success">
    <div class="success-icon">
      <img src="../../assets/success-icon.png" alt="Success Icon">
    </div>
    <div class="message">
      <h2>Payment Successful!</h2>
      <p>Thank you for your payment. Your transaction was successful.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "paymentSuccess",
};
</script>

<style scoped>
.payment-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.success-icon img {
  width: 100px; /* Adjust the width of the success icon */
  margin-bottom: 20px;
}

.message {
  text-align: center;
}

h2 {
  font-size: 36px;
  color: #4caf50; /* Green color for success message */
  margin-bottom: 10px;
}

p {
  font-size: 18px;
  color: #333;
}
</style>
