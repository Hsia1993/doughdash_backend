function changePrice(customDetails, fromCustom = true) {
  let totalPrice = customDetails.price;

  if (fromCustom) {
    const sizeOption = $("#customSize").find(":selected");
    const sizeId = sizeOption.data("id");
    const sizePrice = sizeOption.data("price");
    const size = sizeOption.val();

    const toppingOption = $("#customTopping").find(":selected");
    const toppingId = toppingOption.data("id");
    const toppingPrice = toppingOption.data("price");
    const topping = toppingOption.val();

    if (sizeId) {
      customDetails.sizeId = sizeId;
      customDetails.size = size;
      totalPrice += sizePrice;
    }
    if (toppingId) {
      customDetails.toppingId = toppingId;
      customDetails.topping = topping;
      totalPrice += toppingPrice;
    }
  }

  customDetails.totalPrice = totalPrice;
  return customDetails;
}

function showOrderDialog(customDetails) {
  console.log("pri:" + customDetails.price);
  $(".dialog-pizza-image").attr("src", customDetails.img);

  if (customDetails.totalPrice) {
    $("#price").val(customDetails.totalPrice.toFixed(2));
  } else {
    $("#price").val(customDetails.price.toFixed(2));
  }

  $("#sizeLayout").attr("hidden", customDetails.topping == undefined);
  $("#toppingLayout").attr("hidden", customDetails.topping == undefined);
  $("#size").val(customDetails.size);
  $("#topping").val(customDetails.topping);

  $("#topping").val(customDetails.topping);
  $("#overlay-order").data("price", customDetails.totalPrice);
  $("#overlay-order").fadeIn();

  $("#formOrder").submit(function (evt) {
    evt.preventDefault();
    $.ajax("/api/order", {
      data: JSON.stringify({
        pizza: customDetails.id,
        size: customDetails.sizeId,
        topping: customDetails.toppingId ? [customDetails.toppingId] : [],
        name: $("#firstName").val() + " " + $("#lastName").val(),
        address:
          $("#address").val() +
          ", " +
          $("#city").val() +
          ", " +
          $("#state").val() +
          " " +
          $("#zip").val(),
      }),
      type: "post",
      success: function (response, status) {
        if (status == "success") {
          $("#overlay-order").fadeOut();

          const toastLiveExample = document.getElementById("liveToast");
          const toastBootstrap =
            bootstrap.Toast.getOrCreateInstance(toastLiveExample);
          $(".toast-body").html("Submit Success!");
          toastBootstrap.show();
        }
        console.log("resp:" + response);
      },
      contentType: "application/json",
    });
  });
}

$().ready(() => {
  console.log("doc ready.");

  $.get("http://localhost:4000/api/pizza", function (data, status) {
    let ul = "";
    for (let item of data.data) {
      ul += `<li class="pizza-item">
        <div>
          <img src="${item.picUrl}" alt="${item.description}" />
          <div class="pizza-name">
            <span>${item.name}</span>
            <span class="float-right">\$${item.price}</span>
          </div>
          <button type="button" class="order-button btn btn-primary" data-id="${item._id}" data-img="${item.picUrl}" data-price="${item.price}" >Order Now</button>
          <button type="button" class="custom-button btn btn-outline-secondary" data-id="${item._id}" data-img="${item.picUrl}" data-price="${item.price}" >Custom Pizza</button>
        </div>
      </li>`;
    }

    $("#list_ul").html(ul);

    let customDetails = {};

    $(".order-button").click(function (evt) {
      customDetails = {};
      if (!customDetails.totalPrice) {
        let id = $(this).data("id");
        let img = $(this).data("img");
        let price = $(this).data("price");
        customDetails.id = id;
        customDetails.img = img;
        customDetails.price = price;
        changePrice(customDetails, false);
      }
      showOrderDialog(customDetails);
    });

    $(".custom-button").click(function (evt) {
      customDetails = {};
      let id = $(this).data("id");
      let img = $(this).data("img");
      let price = $(this).data("price");
      customDetails.id = id;
      customDetails.img = img;
      customDetails.price = price;
      changePrice(customDetails);
      $("#customPrice").val("$" + customDetails.totalPrice.toFixed(2));

      $(".dialog-pizza-image").attr("src", img);

      $.get("http://localhost:4000/api/size", function (response, status) {
        console.log("response:" + response.data);

        $("#customSize").html("");
        response.data.map((item) => {
          console.log("i:" + item);
          $("#customSize").html(
            $("#customSize").html() +
              `<option value="${item.name}" data-id="${item._id}" data-price="${item.price}">${item.name}</option>`
          );
        });

        changePrice(customDetails);
        $("#customPrice").val("$" + customDetails.totalPrice.toFixed(2));
      });

      $.get("http://localhost:4000/api/topping", function (response, status) {
        console.log("response:" + response.data);

        $("#customTopping").html("");
        response.data.map((item) => {
          console.log("i:" + item);
          $("#customTopping").html(
            $("#customTopping").html() +
              `<option value="${item.name}" data-id="${item._id}" data-price="${item.price}">${item.name}</option>`
          );
        });

        changePrice(customDetails);
        $("#customPrice").val("$" + customDetails.totalPrice.toFixed(2));
      });

      $("#customSize").change(function () {
        changePrice(customDetails);
        $("#customPrice").val("$" + customDetails.totalPrice.toFixed(2));
      });

      $("#customTopping").change(function () {
        changePrice(customDetails);
        $("#customPrice").val("$" + customDetails.totalPrice.toFixed(2));
      });

      $("#overlay-custom").data("id", id);
      $("#overlay-custom").data("img", img);
      $("#overlay-custom").data("price", price);
      $("#overlay-custom").fadeIn();
    }); // end click custom

    $("#closeOrderDialog").click(function (evt) {
      $("#overlay-order").fadeOut();
    });

    $("#closeCustomDialog").click(function (evt) {
      $("#overlay-custom").fadeOut();
    });

    $("#formCustom").submit(function (evt) {
      evt.preventDefault();
      let id = $("#overlay-custom").data("id");
      let img = $("#overlay-custom").data("img");
      let price = $("#overlay-custom").data("price");
      customDetails.id = id;
      customDetails.img = img;
      customDetails.price = price;
      changePrice(customDetails);
      $("#overlay-custom").fadeOut();
      showOrderDialog(customDetails);
    });
  });
});
