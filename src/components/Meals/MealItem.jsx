import { useContext } from 'react';
import styles from './MealItem.module.scss';
import MealItemForm from './MealItemForm';
import CartContext from '../../context/cart-context';

const MealItem = ({ id, price, description, name }) => {
    const { meal, description: desc, price: priceStyle } = styles;

    const formatPrice = new Intl.NumberFormat('ko-KR').format(price);

    // 컨텍스트에서 장바구니배열에 데이터를 추가하는 함수를 불러옴
    const { addToCartItem } = useContext(CartContext);

    // 장바구니 배열에 데이터를 쌓기 위해 장바구니 배열로 객체를 전달
    // 장바구니 객체를 만드는데 필요한 데이터 중 수량정보를 스스로 알 수가 없음
    // 수량정보는 하위컴포넌트가 알고있으므로 수량정보를 끌어올려야 함.

    // MealItemForm에서 선택한 수량을 끌어올릴 함수
    const handleAddToCart = (amount) => {
        // console.log('선택한 수량: ', amount);

        // 장바구니 배열에 보낼 객체 생성
        const cartItem = {
            id: id,
            name: name,
            amount: +amount,
            price: price * +amount,
        };

        // console.log('cartItem: ', cartItem);
        // 컨텍스트에서 제공하는 장바구니 추가함수를 통해 객체를 전달
        addToCartItem(cartItem);
    };


    return (
        <li className={meal}>
            <div>
                <h3>{name}</h3>
                <div className={desc}>{description}</div>
                <div className={priceStyle}>{formatPrice}원</div>
            </div>
            <div>
                <MealItemForm id={id} onAddToCart={handleAddToCart} />
            </div>
        </li>
    );
};

export default MealItem;