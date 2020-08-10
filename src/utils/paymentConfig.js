// // import { KhaltiCheckout } from "khalti-checkout-web";

// const khaltiConfig = {
//   // replace this key with yours
//   publicKey: "test_public_key_67b8a7c4cea34f6991e07c84d1f6a743",
//   productIdentity: [],
//   productName: [],
//   productUrl: "http://gameofthrones.com/buy/Dragons",
//   eventHandler: {
//     onSuccess(payload) {
//       // hit merchant api for initiating verfication
//       console.log(payload);
//     },
//     // onError handler is optional
//     onError(error) {
//       // handle errors
//       console.log(error);
//     },
//     onClose() {
//       console.log("widget is closing");
//     },
//   },
//   paymentPreference: [
//     "KHALTI",
//     "EBANKING",
//     "MOBILE_BANKING",
//     "CONNECT_IPS",
//     "SCT",
//   ],
// };

// // var khaltiConfig = {
// //   // replace the publicKey with yours
// //   publicKey: "test_public_key_dc74e0fd57cb46cd93832aee0a390234",
// //   productIdentity: "1234567890",
// //   productName: "Dragon",
// //   productUrl: "http://gameofthrones.wikia.com/wiki/Dragons",
// //   paymentPreference: [
// //     "MOBILE_BANKING",
// //     "KHALTI",
// //     "EBANKING",
// //     "CONNECT_IPS",
// //     "SCT",
// //   ],
// //   eventHandler: {
// //     onSuccess(payload) {
// //       // hit merchant api for initiating verfication
// //       console.log(payload);
// //     },
// //     onError(error) {
// //       console.log(error);
// //     },
// //     onClose() {
// //       console.log("widget is closing");
// //     },
// //   },
// // };
// export default khaltiConfig;
// // let checkout = new KhaltiCheckout(config);
// // let btn = document.getElementById("payment-button");
// // btn.onclick = function () {
// //   // minimum transaction amount must be 10, i.e 1000 in paisa.
// //   checkout.show({ amount: 1000 });
// // };
