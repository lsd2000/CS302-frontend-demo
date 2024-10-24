<template>
  <div class="registrationDetails">
    <div class="registration-container">
      <div class="user-details-box">
        <h1>Account Registration</h1>
        <form @submit.prevent="handleSubmit">
          <div class="row">
            <div class="col">
              <input
                type="text"
                class="form-control form-margin"
                placeholder="First name"
                v-model="firstname"
              />
            </div>
            <div class="col">
              <input
                type="text"
                class="form-control form-margin"
                placeholder="Last name"
                v-model="lastname"
              />
            </div>
          </div>

          <div class="form-group form-margin">
            <label for="InputEmail"><p>Email address</p></label>
            <input
              type="email"
              class="form-control"
              id="InputEmail"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group form-margin">
            <label for="InputPassword"><p>Password</p></label>
            <input
              type="password"
              class="form-control"
              id="InputPassword"
              placeholder="Password"
              v-model="password"
            />
          </div>

          <div class="form-group form-margin">
            <label for="ConfirmPassword"><p>Confirm Password</p></label>
            <input
              type="password"
              class="form-control"
              id="ConfirmPassword1"
              placeholder="Password"
              v-model="passwordConfirm"
            />
          </div>

          <div class="form-check form-margin">
            <input
              v-model="role"
              class="form-check-input"
              type="radio"
              name="UserType"
              id="CRadios"
              value="CUSTOMER"
              checked
            />
            <label class="form-check-label" for="CRadios"> Customer </label>
          </div>
          <div class="form-check form-margin">
            <input
              v-model="role"
              class="form-check-input"
              type="radio"
              name="UserType"
              id="Bradios"
              value="BUSINESS"
            />
            <label class="form-check-label" for="Bradios">
              Business Owner
            </label>
          </div>

          <div
            class="form-check"
            style="margin: 10px; position: relative; right: 5px"
          >
            <input
              class="form-check-input"
              type="checkbox"
              value="yes"
              id="flexCheckDefault"
              v-model="subscription"
            />

            <label class="form-check-label" for="flexCheckDefault">
              I agree to receive groceries news and offers from unFairPrice.
            </label>
          </div>

          <a href="/">
            <button type="button" class="btn btn-light">Cancel</button>
          </a>
          <button type="submit" class="btn btn-dark">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { authInstance } from "../views/axios.js";

export default {
  name: "registrationDetails",
  data() {
    return {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      role: "CUSTOMER",
      subscription: false,
    };
  },
  methods: {
    async handleSubmit() {
      const data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm,
        role: this.role,
        subscription: this.subscription,
      };
      console.log(data);
      try {
        const response = await authInstance.post("/auth/register", data);
        console.log(response);

        //Check for response status for success or failure

        
        window.location.href = "/";
      } catch (error) {
        window.alert(
          "Registration is unsuccessful. Please check your credentials"
        );
        console.error(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.registration-container {
  background-color: transparent;
  padding: 20px;
}

.user-details-box {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Ensure it's on top of other elements */
}

.form-check {
  display: flex; /* Use flexbox to align radio buttons and labels horizontally */
  align-items: center; /* Vertically center the radio buttons and labels */
}

.form-check-input {
  margin-right: 5px; /* Add some spacing between the radio button and label */
}

.form-margin {
  margin: 5px;
}

.p {
  margin: 5px;
}
</style>
window.alert("Registration is successful. You can now log in.");