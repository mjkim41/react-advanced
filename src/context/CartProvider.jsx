import { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = ({ children }) => {

    // 장바구니를 렌더링할 목록
    const [cartItems, setCartItems] = useState([]);
    // 총액을 상태 관리
    const [totalPrice, setTotalPrice] = useState(0);

    const [cartIsShown, setCartIsShown] = useState(false);

    const openModal = () => setCartIsShown(true);
    const closeModal = () => setCartIsShown(false);

    const handleAddToCartItem = (newCartItem) => {

        // 이미 장바구니에 있는 항목인지 체크
        const existingItems = [...cartItems];
        const existingItem = cartItems.find(cartItem => cartItem.id === newCartItem.id);

        if (existingItem) {
            existingItem.amount += newCartItem.amount;
            existingItem.price += newCartItem.price;
            setCartItems(existingItems); // 원본에 복사배열로 갱신
        } else {
            setCartItems([...cartItems, newCartItem]);
        }

        setTotalPrice(prevTotalPrice => prevTotalPrice + newCartItem.price); // 총액 갱신
    };

    const initialValue = {
        cartIsShown: cartIsShown, // 모달을 열고닫는 여부
        openModal: openModal, // 모달 열어주는 함수
        closeModal: closeModal, // 모달 닫아주는 함수
        cartItems: cartItems, // 모달에 렌더링할 장바구니 배열
        addToCartItem: handleAddToCartItem, // 장바구니에 내용을 추가
        totalPrice : totalPrice, // 장바구니 총액
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
