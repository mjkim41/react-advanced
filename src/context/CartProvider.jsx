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

    // 장바구니 목록에서 항목을 제거하거나 수량을 줄여주는 함수
    const handleRemoveToCartItem = (id) => {

        console.log(id);

        // 원본배열 복사
        const existingItems = [...cartItems];
        console.log(existingItems);

        // 사본배열에서 id를 통해 타겟 객체 탐색
        const targetItem = existingItems.find(item => item.id === id);

        console.log(targetItem);

        // 항목 하나의 가격
        const unitPrice = Math.floor(targetItem.price / targetItem.amount);

        // 수량이 1이면 배열에서 제거, 수량이 1보다 크면 수량 조절
        if(targetItem.amount === 1) {
            setCartItems(existingItems.filter(item => item.id !== id));
        } else {
            targetItem.amount--;
            targetItem.price -= unitPrice;
            setCartItems(existingItems);
        }

        // 총액 갱신
        setTotalPrice(prev => prev - unitPrice);

    }

    const initialValue = {
        cartIsShown: cartIsShown, // 모달을 열고닫는 여부
        openModal: openModal, // 모달 열어주는 함수
        closeModal: closeModal, // 모달 닫아주는 함수
        cartItems: cartItems, // 모달에 렌더링할 장바구니 배열
        addToCartItem: handleAddToCartItem, // 장바구니에 내용을 추가
        removeToCartItem: handleRemoveToCartItem, // 장바구니 목록에서 항목을 제거하거나 수량을 줄여주는 함수
        totalPrice : totalPrice, // 장바구니 총액
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
