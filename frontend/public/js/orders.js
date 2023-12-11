$().ready(() => {
  console.log("orders ready");

  $.get("/api/orders", function (response, status) {
    console.log("response:" + JSON.stringify(response));

    let ol = "";
    response.data.forEach((ps) => {
      ps.items.forEach((item) => {
        let pizza = item.pizza;
        let size = item.size;
        let topping = item.topping?.name;

        let price = pizza.price;
        if (size) {
          price += size.price;
          size = size.name;
        } else {
          size = "";
        }

        ol += `
                    <tr>
                        <td><img src="${
                          pizza.picUrl
                        }" class="img-thumbnail" alt="${
          pizza.description
        }" /></td>
                        <td>${pizza.name}</td>
                        <td>${size}</td>
                        <td>${topping || ''}</td>
                        <td>${price}</td>
                        <td>${item.address ? item.address : ""}</td>
                    </tr>
                `;
      });
    });

    $("#tableBody").html(ol);
  });
});
