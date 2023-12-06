## Backend for doughdash

1. `GET: /api/pizza`: Get pizza list

```javascript
[
  {
    name: "string",
    description: "string",
    picUrl: "string",
    price: 12.99,
    _id: "id",
  },
];
```

2. `GET: /api/topping`: Get topping list

```javascript
[
  {
    name: "string",
    price: 12.99,
    _id: "id",
  },
];
```

3. `GET: /api/size`: Get size list

```javascript
[
  {
    name: "string",
    price: 12.99,
    _id: "id",
  },
];
```

4. `POST: /api/order`:

```javascript
  {
    items: [
        {
            pizza: "pizzaId",
            size: "sizeId"
            toppings: ["toppingId"]
        }
    ]
  },
```
