import { useState } from 'react';
import CartContext from './cart-context';

const CartProvider = ({ children }) => {

    // 장바구니를 렌더링할 목록
    const [cartItems, setCartItems] = useState([]);
    // 총액을 상태관리
    const [totalPrice, setTotalPrice] = useState(0);

    const [cartIsShown, setCartIsShown] = useState(false);

    const openModal = () => setCartIsShown(true);
    const closeModal = () => setCartIsShown(false);

    // 장바구니 배열에 데이터를 추가하는 함수
    const handleAddToCartItem = (newCartItem) => {

        // 원본 배열을 복사
        const existingItems = [...cartItems];
        // 이미 장바구니에 있는 항목인지를 체크
        const existingItem = existingItems.find(cartItem => cartItem.id === newCartItem.id);

        if (existingItem) { // 수량과 가격을 갱신
            existingItem.amount += newCartItem.amount;
            existingItem.price += newCartItem.price;
            setCartItems(existingItems); // 원본에 복사배열 갱신
        } else { // 배열에 첫 추가
            setCartItems([...cartItems, newCartItem]);
        }
        // 총액 갱신
        setTotalPrice(prev => prev + newCartItem.price);
    };

    // 장바구니에서 항목의 수량을 1내리거나 수량이 1일경우 삭제하는 함수
    const handleRemoveToCartItem = (id) => {
        // 원본배열 복사
        const existingItems = [...cartItems];

        // 사본배열에서 id를 통해 타겟객체를 탐색
        const existingItem = existingItems.find(item => item.id === id);
        // 항목 1개의 가격을 구하기
        const eachPrice = Math.floor(existingItem.price / existingItem.amount);

        // 수량이 1인경우 - 배열에서 제거
        if (existingItem.amount === 1) {
            setCartItems(existingItems.filter(item => item.id !== id));
        } else {
            // 수량이 1보다 큰경우 - 기존 수량에서 1을 내려서 수정

            existingItem.amount--;
            existingItem.price -= eachPrice;

            setCartItems(existingItems);
        }

        // 총액 갱신
        setTotalPrice(prev => prev - eachPrice);

    };

    const initialValue = {
        cartIsShown: cartIsShown, // 모달을 열고닫는 여부
        openModal: openModal, // 모달 열어주는 함수
        closeModal: closeModal, // 모달 닫아주는 함수
        cartItems: cartItems, // 모달에 렌더링할 장바구니 배열
        addToCartItem: handleAddToCartItem, // 장바구니에 내용을 추가
        removeToCartItem: handleRemoveToCartItem, // 장바구니 목록에서 항목을 제거하는 함수
        totalPrice: totalPrice, // 장바구니 총액
    };

    return (
        <CartContext.Provider value={initialValue}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;