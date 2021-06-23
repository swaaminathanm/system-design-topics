const OrderSchema = require("./order_pb");

const order1 = new OrderSchema.Order();
order1.setOrderid(1);
order1.setCustomerid(123);
order1.setItemsList([987, 988]);
order1.setCouponcode("ALLFREE")
order1.setPaymentmode(1);

const address = new OrderSchema.Address();
address.setName("Alice");
address.setAddress("xyz street");
address.setPincode("111111");

order1.setShippingaddress(address);

const bytes = order1.serializeBinary();
const object = OrderSchema.Order.deserializeBinary(bytes).toString();
console.log("Binary : " + bytes)
console.log("Deserialize : " + object);