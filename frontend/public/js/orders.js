
$().ready(() => {
    console.log("orders ready");

    $.get("/api/orders", function (response, status) {
        console.log("response:" + JSON.stringify(response));

        let ol = "";
        response.data.forEach(item => {
            let topping = item.topping ? item.topping : "";
            ol += `
                <tr>
                    <td><img src="${item.picUrl}" alt="${item.description}" /></td>
                    <td>${item.name}</td>
                    <td>${item.size}</td>
                    <td>${topping}</td>
                    <td>${item.price}</td>
                    <td>${item.address? item.address: ""}</td>
                </tr>
        `
        });

        $("#tableBody").html(ol);
    });
})