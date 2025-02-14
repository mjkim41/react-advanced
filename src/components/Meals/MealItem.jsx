
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import {useContext} from "react";
import CartContext from "../../context/cart-context.js";

const MealItem = ({ id, price, description, name }) => {
    const { meal, description: desc, price: priceStyle } = styles;

    const formatPrice = new Intl.NumberFormat('ko-KR').format(price);

    // 컨텍스트에서 장바구니 배열에 데이터 추가하는 함수 불러오기
    const { addToCartItem } = useContext(CartContext);

    // 장바구니 배열에 데이터를 쌓기 위해 장바구니 배열로 객체를 전달해야 하는데,
    // 장바구니 객체를 만드는데 필요한 데이터 중 수량정보는 스스로 알 수 없음
    // 따라서 하위 컴포넌트에서 끌어올려야 함

    // MealItemForm에서 선택한 수량을 끌어올리는 함수
    const handleAddToCart = (amount) => {
        console.log("선택수량", amount);

        // 장바구니 배열에 보낼 개게 생성
        const cartItem = {
            id: id,
            name: name,
            amount: +amount,
            price: price * +amount,
        };

        // console.log('cartItem', cartItem);
        // 컨텍스트에서 제공하는 장바구니 추가 함수 통해 객체 전달
        addToCartItem(cartItem);
    }


    return (
        <li className={meal}>
            <div>
                <h3>{name}</h3>
                <div className={desc}>{description}</div>
                <div className={priceStyle}>{formatPrice}원</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={handleAddToCart}/>
            </div>
        </li>
    );
};

export default MealItem;
