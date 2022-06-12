const reducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    return { ...state, cart: [] };
  }
  if (action.type === "REMOVE") {
    return {
      ...state,
      cart: state.cart.filter((cartItem) => cartItem.id !== action.payload),
    };
  }
  if (action.type === "INCREASE") {
    const increment = state.cart.map((cartList) => {
      if (cartList.id === action.payload) {
        return { ...cartList, amount: cartList.amount + 1 };
      }
      return cartList;
    });
    return { ...state, cart: increment };
  }
  if (action.type === "DECREASE") {
    const decrement = state.cart
      .map((cartList) => {
        if (cartList.id === action.payload) {
          return { ...cartList, amount: cartList.amount - 1 };
        }
        return cartList;
      })
      .filter((cartItem) => cartItem.amount !== 0);
    return { ...state, cart: decrement };
  }
  if (action.type === "GET_TOTAL") {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        cartTotal.amount += amount;
        const itemTotal = price * amount;
        cartTotal.total += itemTotal;
        return cartTotal;
      },
      { total: 0, amount: 0 }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }
  if (action.type === "LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "DISPLAY_ITEMS") {
    return { ...state, cart: action.payload, loading: false };
  }
  return state;
};
export default reducer;
