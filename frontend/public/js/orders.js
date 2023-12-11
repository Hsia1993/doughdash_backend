$().ready(() => {
  $("#exportPdf").click(() => {
    window.open("/api/orders/export");
  });
  $.get("/api/orders", function (response, status) {
    let ol = "";
    response.data.forEach((ps) => {
      ps.items.forEach((item) => {
        const { pizza, size, topping } = item;
        let price = (pizza.price + size.price + (topping?.price || 0)).toFixed(
          2
        );
        ol += `
                    <tr>
                        <td><img src="${
                          pizza.picUrl
                        }" class="img-thumbnail" alt="${
          pizza.description
        }" /></td>
                        <td class="align-middle">${pizza.name}</td>
                        <td class="align-middle">${size.name || ""}</td>
                        <td class="align-middle">${topping?.name || ""}</td>
                        <td class="align-middle">${price}</td>
                        <td class="align-middle">${item.address || ""}</td>
                    </tr>
                `;
      });
    });

    $("#tableBody").html(ol);
  });
});
