import React, {useState} from 'react';
import CartContext from "./cart-context.js"

const CartProvider = ({ children }) => {

    const [cartIsShown, setCartIsShown] = useState(false);

    const initialValue = {
        cartIsShown: cartIsShown, // 모달을 열고닫는 여부
        openModal: () => {setCartIsShown(true)}, // 모달 열어주는 함수
        closeModal: () => {setCartIsShown(false)}, // 모달 닫아주는 함수
    }

    return (
        <CartContext.Provider
            value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;