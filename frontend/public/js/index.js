
let orderPizza = {};

function changePrice() {
  var sizeOption = $("#customSize").find(":selected");
  var sizePrice = sizeOption.data("price");
  orderPizza.size = sizeOption.val();

  var toppingOption = $("#customTopping").find(":selected");
  var toppingPrice = toppingOption.data("price");
  orderPizza.topping = toppingOption.val();

  let totalPrice = (sizePrice + toppingPrice + orderPizza.price).toFixed(2);
  $("#customPrice").val("$" + totalPrice);
}

function showOrderDialog() {
  let op = orderPizza;
  console.log("pri:" + op.price);
  $(".dialog-pizza-image").attr("src", orderPizza.img);
  $("#overlay-order").fadeIn();
}

$().ready(() => {
  console.log("doc ready.");

  $.get("http://localhost:4000/api/pizza", function (data, status) {

    let ul = "";
    for (let item of data.data) {

      ul += `<li>
        <div>
          <img src="${item.picUrl}" alt="${item.description}" />
          <div>
            <span>${item.name}</span>
            <span class="float-right">\$${item.price}</span>
          </div>
          <button type="button" class="order-button btn btn-primary" data-id="${item._id}" data-img="${item.picUrl}" data-price="${item.price}" >Order Now</button>
          <button type="button" class="custom-button btn btn-outline-secondary" data-id="${item._id}" data-img="${item.picUrl}" data-price="${item.price}" >Custom Pizza</button>
        </div>
      </li>`
    }

    $("#list_ul").html(ul);

    $('.order-button').click(function (evt) {
      let id = $(this).data('id');
      let img = $(this).data('img');
      let price = $(this).data('price');
      orderPizza = { id, img, price }

      showOrderDialog();
    });

    $('.custom-button').click(function (evt) {
      let id = $(this).data('id');
      let img = $(this).data('img');
      let price = $(this).data('price');
      orderPizza = { id, img, price }

      $(".dialog-pizza-image").attr("src", img);

      $.get("http://localhost:4000/api/size", function (response, status) {
        console.log("response:" + response.data);

        response.data.map(item => {
          console.log('i:' + item);
          $("#customSize").html($("#customSize").html() + `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`)
        })

        changePrice();
      });

      $.get("http://localhost:4000/api/topping", function (response, status) {
        console.log("response:" + response.data);

        response.data.map(item => {
          console.log('i:' + item);
          $("#customTopping").html($("#customTopping").html() + `<option value="${item.name}" data-price="${item.price}">${item.name}</option>`)
        })

        changePrice();
      });

      $("#customSize").change(function () {
        changePrice();
      })

      $("#customTopping").change(function () {
        // let price = $(this)["data-price"]
        changePrice();
      })

      console.log("order:" + evt.target.getAttribute("data-img"));
      $("#overlay-custom").fadeIn();
    });

    $("#closeOrderDialog").click(function (evt) {
      $("#overlay-order").fadeOut();
    })

    $("#closeCustomDialog").click(function (evt) {
      $("#overlay-custom").fadeOut();
    })

    $("#formCustom").submit(function (evt) {
      evt.preventDefault();
      $("#overlay-custom").fadeOut();
      showOrderDialog();
    });
  });
})