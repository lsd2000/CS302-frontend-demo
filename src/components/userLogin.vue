<template>
  <div class="userLogin">
    <div>
      <h2 style="position: relative; top: 60px; left: 25px"><b>Sign in</b></h2>
      <div
        style="position: relative; top: 90px; left: 20px"
        class="d-grid gap-2 col-6 mx-auto"
      >
        <button class="btn btn-primary" type="button">
          <div class="button-content">
            <img
              src="@/assets/google-logo.png"
              alt="Google Logo"
              class="logo"
            />
            <span>Sign in with Google</span>
          </div>
        </button>
        <button class="btn btn-primary" type="button">
          <div class="button-content">
            <img
              src="@/assets/microsoft-logo.png"
              alt="Microsoft Logo"
              class="logo"
            />
            <span>Sign in with Microsoft</span>
          </div>
        </button>
        <button class="btn btn-primary" type="button">
          <div class="button-content">
            <img src="@/assets/apple-logo.png" alt="Apple Logo" class="logo" />
            <span>Sign in with Apple</span>
          </div>
        </button>
      </div>
      <div class="separator" style="position: relative; top: 130px"></div>

      <form @submit.prevent="handleLogin">
        <div
          class="input-group-container"
          style="position: relative; top: 175px"
        >
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Recipient's Email"
              aria-describedby="basic-addon2"
              v-model="email"
            />
            <span class="input-group-text" id="basic-addon2">@example.com</span>
          </div>

          <div class="input-group mb-3">
            <input
              type="password"
              class="form-control"
              placeholder="Password"
              aria-label="Recipient's Password"
              aria-describedby="basic-addon2"
              v-model="password"
            />
          </div>
          <div class="forgot-password-link" style="position: absolute">
            <a href="#" style="color: #3498db">Forgot Password?</a>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-light btn-lg"
          style="
            position: relative;
            top: 210px;
            background-color: #e8e8e8;
            color: #1e488f;
            width: 30%;
          "
        >
          Sign in
        </button>
      </form>

      <div class="create-account-link" style="position: relative; top: 220px">
        <a href="registration.html" style="color: #3498db">or Create Account</a>
      </div>

      <div class="tos-privacy-link" style="position: relative; top: 300px">
        <p style="color: grey">
          By using unFairPrice you agree to the
          <a href="#" style="color: #3498db">Terms of Service</a> and
          <a href="#" style="color: #3498db">Privacy Policy</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { authInstance } from "../views/axios.js";

export default {
  name: "userLogin",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleLogin() {
      const data = {
        email: this.email,
        password: this.password,
      };

      try {
        const response = await authInstance.post(
          "/auth/authenticate",
          data
        );

        localStorage.setItem("access_token", response.data.access_token);
        console.log("Bearer " + localStorage.getItem("access_token"));

        //get currenturl of User

        const currentURL = window.location.href;
        const customerURL = "http://unfairprice.sg/";
        const businessURL = "http://unfairprice.sg/business";

        console.log(currentURL);
        console.log(response);

        const role = response.data.Role;
        console.log(role);

        if (currentURL === customerURL && role === "CUSTOMER") {
          window.location.href = "/home";
          console.log("User is a customer!");
        } else if (currentURL === businessURL && role === "BUSINESS") {
          window.location.href = "/businessHome";
          console.log("User is a business owner!");
        } else {
          window.alert("Please check your role.");
        }
      } catch (error) {
        window.alert("Login is unsuccessful. Please check your credentials");
        console.error(error);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->



<style scoped>
.btn-success {
  background-color: #1d951a;
  color: #dbd4b7;
  border: 1px solid black;
  margin-bottom: 5px;
}

/* Style the separator line */
.separator {
  height: 2px; /* Adjust the height of the line as needed */
  background-color: #d9d8d8f7; /* Set the background color of the line */
  text-align: center; /* Center the text (OR) if needed */
  color: #d9d8d8f7; /* Set the text color */
  font-weight: bold; /* Apply font styles if desired */
  margin: 10px auto; /* Adjust the margin to center the line horizontally and add space */
  max-width: 85%; /* Adjust the maximum width as needed */
  position: relative; /* Enable absolute positioning */
}

.input-group-container {
  width: 65%; /* Adjust the percentage as needed */
  margin: 0 auto; /* Center the container horizontally */
}

/* Use flexbox to center content horizontally */
.button-content {
  display: flex;
  align-items: center;
  justify-content: center; /* Center horizontally */
}

button {
  margin-bottom: 5px;
}

.logo {
  width: 18px; /* Adjust the width of the logo as needed */
  margin-right: 3px; /* Add spacing between the image and text */
  margin-bottom: 4px;
}

.custom-input-group {
  width: 150px; /* Adjust the width as needed */
}

.logo-microsoft {
  width: 15px; /* Adjust the width of the logo as needed */
  margin-right: 3px; /* Add spacing between the image and text */
  margin-bottom: 4px;
}

.btn-primary {
  background-color: white;
  color: black;
  border: 1px solid rgb(146, 146, 146);
  border-radius: 0px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
