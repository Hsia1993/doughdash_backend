
$().ready(()=> {
    console.log("orders ready");

  $.get("http://localhost:4000/api/orders", function (response, status) {
    console.log("response:" + JSON.stringify(response));
  });
})