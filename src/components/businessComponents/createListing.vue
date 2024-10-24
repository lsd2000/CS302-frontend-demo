<template>
  <div class="scroll-container">
    <div class="pageTitle">
      <h1>Create New Listing</h1>
    </div>
    <div class="centered-container">
      <dropFile @image-uploaded="handleImageUploaded" />
      <button
        @click.prevent="submitForm"
        type="button"
        class="btn btn-dark"
        style="
          background-color: #1d951a;
          position: relative;
          bottom: 275px;
          left: 500px;
        "
      >
        Create Listing
      </button>
      <div class="form-container">
        <form>
          <div class="form-row">
            <div class="col-md-6 mb-3">
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
              <div v-if="productName" class="valid-feedback">Looks good!</div>
              <div v-else class="invalid-feedback">
                Please choose a product name.
              </div>
            </div>
            <div class="col-md-3 mb-3">
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
              <div v-if="price" class="valid-feedback">Looks good!</div>
              <div v-else class="invalid-feedback">Please choose a price.</div>
            </div>
            <div class="col-md-3 mb-3">
              <label for="QuantityValidation">Qty Available</label>
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
              <div v-if="qty" class="valid-feedback">Looks good!</div>
              <div v-else class="invalid-feedback">
                Please choose a quantity
              </div>
            </div>
          </div>

          <div class="form-group">
            <label for="productDescription">Product Description</label>
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
            <div v-if="qty" class="valid-feedback">Looks good!</div>
            <div v-else class="invalid-feedback">
              Please provide a description
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import dropFile from "../dropFile.vue";
import AWS from "aws-sdk";
import { inventoryCartInstance } from "../../views/axios";

export default {
  name: "createListing",
  components: {
    dropFile,
  },
  props: {
    user_data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      productName: "",
      price: "",
      qty: "",
      productDescription: "",
      uploadedImageUrl: null, // Initialize to null
    };
  },
  methods: {
    handleImageUploaded(imageUrl) {
      // This method is called when the image URL is emitted by the dropFile component.
      this.uploadedImageUrl = imageUrl; // Store the uploaded image URL in your data.
    },
    async submitForm() {
      let uploadURL = null;

      if (!this.uploadedImageUrl) {
        const defaultImageUrl =
          "https://unfairprice-products.s3.ap-southeast-1.amazonaws.com/images/NoImage.png";
        uploadURL = { Location: defaultImageUrl };
      } else {
        //Initialise AWS s3
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

        // Decode the Base64-encoded image data
        const decodedImage = atob(this.uploadedImageUrl.split(",")[1]);

        // Convert the decoded image data to a binary format
        const binaryImageData = Uint8Array.from(decodedImage, (c) =>
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
      }
      console.log("Product Name:", this.productName);
      console.log("Price:", this.price);
      console.log("Qty:", this.qty);
      console.log("Product Description:", this.productDescription);
      console.log("Uploaded Image URL:", this.uploadedImageUrl);
      console.log("Returned Image URL:", uploadURL.Location);

      const dataToPost = {
        item_name: this.productName,
        price: this.price,
        quantity: this.qty,
        item_description: this.productDescription,
        image_url: uploadURL ? uploadURL.Location : null,
      };

      console.log(dataToPost);
      console.log(this.user_data.id);
      const user_id = this.user_data.id;
      // Construct the URL with the user's ID
      const url = `/inventory/${user_id}`;
      try {
        const response = await inventoryCartInstance.post(url, dataToPost);
        window.alert("Product creation is successful!");
        this.$router.push("/businessHome");
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.pageTitle {
  margin: 5px;
}

.centered-container {
  display: flex;
  flex-direction: column;
  align-items: center; /* Center the contents horizontally */
  margin-top: 50px; /* Add some space between the heading and dropFile */
}
.scroll-container {
  overflow-y: auto;
  max-height: 100vh;
  flex-direction: column;
  justify-content: center; /* Center content vertically */
  align-items: center; /* Center content horizontally */
}

.form-container {
  border-top: 1px solid black;
  width: 80%;
  height: 80vh;
  display: flex;
  margin: 40px;
  padding: 30px;
  flex-direction: column;
}
</style>