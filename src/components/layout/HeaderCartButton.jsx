import React, {useContext, useEffect, useState} from 'react';
import CartIcon from './CartIcon';
import styles from './HeaderCartButton.module.scss';
import CartContext from "../../context/cart-context.js";

const HeaderCartButton = () => {
    const { button, icon, badge, bump } = styles;

    // useContext 훅 : 컨텍스트가 관리하는 데이터를 한 번에 가져오는 함수
    const { openModal, cartItems } = useContext(CartContext);

    // bum[ 애니메이션 수행할 상태변수
    const [isBump, setIsBump] = useState(false);

    useEffect(()=> {
        // 처음 진입할 때는 하지 마라
        if (cartItems.length === 0) return;

        setIsBump(true);

        // 애니메이션이 끝나면 클래스를 제거
        const timer = setTimeout(() => {
            setIsBump(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [cartItems]);

    // 배열에 있는 수량 전부 더하기
    let numberOfCart = cartItems.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <button className={`${button} ${isBump && bump}`} onClick={openModal}>
          <span className={icon}>
            <CartIcon />
          </span>
             <span>My Cart</span>
            <span className={badge}>{numberOfCart}</span>
        </button>
    );
};

export default HeaderCartButton;
