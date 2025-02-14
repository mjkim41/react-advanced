import { createContext } from "react";

// 장바구니앱에서 사용할 공유 상태값들을 관리하는 저장소

// createContext함수에 전달되는 객체는
// 실제로 공유할 데이터가 아닌 데이터의 이름과 타입만 지정한 명세다.
const CartContext = createContext({
    cartIsShown: false, // 모달을 열고닫는 여부
    openModal: () => {}, // 모달 열어주는 함수
    closeModal: () => { }, // 모달 닫아주는 함수
    cartItems: [], // 모달에서 장바구니 목록을 렌더링할 배열
    addToCartItem: (newCartItem) => { }, // 위의 장바구니 목록에 데이터를 추가하는 함수
    removeToCartItem: (id) => { }, // 장바구니 목록에서 항목을 제거하는 함수
    totalPrice: 0, // 장바구니에 담긴 총액
});

export default CartContext;