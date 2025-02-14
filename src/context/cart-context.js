import {createContext} from "react";

// 1. React.createContext({defaultValue})장바구니 앱에서 사용할 공유 상태값들을 관리하는 저장소
// - 인자는 보통 data type 만 줌(인터페이스 처럼)
const CartContext = createContext({
    cartIsShown: false, // 모달을 열고닫는 여부
    openModal: () => {}, // 모달 열어주는 함수
    closeModal: () => {}, // 모달 닫아주는 함수

    cartItems: [], // 모달에서 장바구니 목록을 렌더링할 배열
    addToCartItem: (newCartItem) => {}, // 위 장바구니 목록에 데이터 추가하는 함수
    removeToCartItem: (id) => {}, // 장바구니에서 수량을 줄이거나 목록에서 제거하는 함수
    totalPrice: 0, // 장바구니에 담긴 총액
});

export default CartContext;