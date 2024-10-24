<template>
  <div class="businessProductListing">
    <div class="container">
      <div class="row">
        <div
          class="row custom-text-container"
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
                data-target="#ProductEditDisplay"
                @click.prevent="loadProductData(productIndex)"
              >
                Edit Product
              </button>

              <!-- Modal -->
              <div
                class="modal fade"
                id="ProductEditDisplay"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ProductEditDisplayTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        Edit Product Details
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
                          <div class="col-md-8 mb-3">
                            <label for="NameValidation">Product Name</label>
                            <input
                              type="text"
                              class="form-control"
                              :class="{
                                'is-valid': productName,
                                'is-invalid': !productName,
                              }"
                              id="NameValidation"
                              placeholder="Product name"
                              v-model="productName"
                              required
                            />
                            <div v-if="productName" class="valid-feedback">
                              Looks good!
                            </div>
                            <div v-else class="invalid-feedback">
                              Please choose a product name.
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <label for="PriceValidation">Price</label>
                            <input
                              type="text"
                              class="form-control"
                              :class="{
                                'is-valid': price,
                                'is-invalid': !price,
                              }"
                              id="PriceValidation"
                              placeholder="Price"
                              v-model.number="price"
                              required
                            />
                            <div v-if="price" class="valid-feedback">
                              Looks good!
                            </div>
                            <div v-else class="invalid-feedback">
                              Please choose a price.
                            </div>
                          </div>
                          <div class="col-md-4 mb-3">
                            <label for="QuantityValidation"
                              >Qty Available</label
                            >
                            <input
                              type="text"
                              class="form-control"
                              :class="{
                                'is-valid': qty,
                                'is-invalid': !qty,
                              }"
                              id="QuantityValidation"
                              placeholder="Quantity"
                              v-model.number="qty"
                              required
                            />
                            <div v-if="qty" class="valid-feedback">
                              Looks good!
                            </div>
                            <div v-else class="invalid-feedback">
                              Please choose a quantity
                            </div>
                          </div>
                        </div>

                        <div class="form-group">
                          <label for="productDescription"
                            >Product Description</label
                          >
                          <textarea
                            class="form-control"
                            id="DescrptionValidation"
                            rows="3"
                            type="text"
                            :class="{
                              'is-valid': productDescription,
                              'is-invalid': !productDescription,
                            }"
                            placeholder="Product Description"
                            v-model="productDescription"
                            required
                          ></textarea>
                          <div v-if="qty" class="valid-feedback">
                            Looks good!
                          </div>
                          <div v-else class="invalid-feedback">
                            Please provide a description
                          </div>
                        </div>

                        <!-- To change this form after api is done -->
                        <div class="custom-file">
                          <input
                            type="file"
                            class="custom-file-input"
                            id="validatedCustomFile"
                            required
                            @change="onFileChange"
                          />
                          <label
                            class="custom-file-label"
                            for="validatedCustomFile"
                            >{{ fileName }}</label
                          >
                          <div class="invalid-feedback">
                            Example invalid custom file feedback
                          </div>
                          <img
                            v-if="imageURL"
                            :src="imageURL"
                            alt="Uploaded Image"
                          />
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
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
                        class="btn btn-danger"
                        @click.prevent="deleteListing"
                      >
                        Delete Product
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        @click.prevent="submitChanges"
                      >
                        Save changes
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
import { inventoryCartInstance } from "../../views/axios";
import AWS from "aws-sdk";


export default {
  name: "businessProductListing",
  components: {},
  props: {
    user_data: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      itemId: "",
      products: [], // Initialize products as an empty array to store the product data
      productName: "",
      price: "",
      qty: "",
      productDescription: "",
      fileName: "Choose file...",
      file: null,
      imageURL: null,
    };
  },
  async created() {
    const user_id = this.user_data.id;
    // Construct the URL with the user's ID
    const url = `/inventory/user/${user_id}`;

    try {
      const response = await inventoryCartInstance.get(url);
      console.log(response);
      this.products = response.data.inventories; // Set the products data property with the received data
      console.log(response.data);
      console.log(this.products[0]);
    } catch (error) {
      console.log(error);
    }
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
      this.productName = product.item_name;
      this.price = product.price;
      this.qty = product.quantity;
      this.productDescription = product.item_description;
      this.imageURL = product.image_url;
      this.itemId = product.item_id;
    },

    async submitChanges() {


      const userid = this.user_data.id;
      let uploadURL = null;

      //Initialise AWS s3 & move variables to env file
      const region = process.env.VUE_APP_AWS_REGION;
      const bucketName = process.env.VUE_APP_AWS_BUCKET_NAME;
      const accessKeyId = process.env.VUE_APP_AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.VUE_APP_AWS_SECRET_ACCESS_KEY;

      AWS.config.update({
        region: region,
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
      });

      const s3 = new AWS.S3();

      // Convert Blob to base64
      const base64Image = await this.blobToBase64(this.imageURL);
      // Convert the base64 image data to a binary format
      const binaryImageData = Uint8Array.from(atob(base64Image), (c) =>
        c.charCodeAt(0)
      );

      console.log(binaryImageData);

      // Define S3 parameters
      const params = {
        Bucket: bucketName,
        Key: `images/${Date.now()}_${this.productName}.jpg`, // Unique object key
        Body: binaryImageData, // Use the URL of the uploaded image
        ContentType: "image/jpeg", // Set the correct content type
      };

      try {
        uploadURL = await s3.upload(params).promise();
        console.log("Image uploaded successfully:", uploadURL.Location);
        // Now you can use data.Location as the URL of the uploaded image.
      } catch (error) {
        console.error("Error uploading image to S3:", error);
      }

      const url = `/inventory/${this.itemId}/user/${userid}`;
      console.log(url);
      console.log("Hello" + uploadURL.Location);
      const dataToUpdate = {
        item_name: this.productName,
        item_description: this.productDescription,
        price: this.price,
        quantity: this.qty,
        image_url: uploadURL.Location,
      };

      try {
        const response = await inventoryCartInstance.put(url, dataToUpdate);
        window.alert("Product edit is successful!");
        console.log(response);
      } catch (error) {
        console.log(error);
      }

      //Next, we have to update the product array to ensure that the relevant chances are rendered.

      // get the index in product array using the product's item id
      const updatedProductIndex = this.products.findIndex(
        (product) => product.item_id === this.itemId
      );

      if (updatedProductIndex !== -1) {
        this.products[updatedProductIndex].item_name = this.productName;
        this.products[updatedProductIndex].item_description =
          this.productDescription;
        this.products[updatedProductIndex].price = this.price;
        this.products[updatedProductIndex].quantity = this.qty;
        this.products[updatedProductIndex].image_url = uploadURL.Location;
      }
    },

    async blobToBase64(blobUrl) {
      const response = await fetch(blobUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    },

    async deleteListing() {
      const url = `/inventory/${this.itemId}`;
      try {
        const response = await inventoryCartInstance.delete(url);
        window.alert("Product delete is successful!");
        // If the deletion was successful, remove the product from the products array
        const deletedProductIndex = this.products.findIndex(
          (product) => product.item_id === this.itemId
        );
        if (deletedProductIndex !== -1) {
          this.products.splice(deletedProductIndex, 1);
        }
        document.getElementById("closeModalBtn").click();
        console.log(response);
      } catch (error) {
        console.error("Error deleting listing:", error);
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

.businessProductListing {
  overflow-y: auto;
  max-height: 85vh;
}

.custom-text-container {
  font-size: 24px; /* Adjust the font size as needed */
  width: 100%; /* Set the container's width to 100% */
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflowing text if it's too long for the container */
  text-overflow: ellipsis; /* Add an ellipsis (...) to indicate text truncation */
}
</style>
