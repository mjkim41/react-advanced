import React, { useContext, useEffect, useState } from 'react';
import CartIcon from './CartIcon';
import styles from './HeaderCartButton.module.scss';
import CartContext from '../../context/cart-context';

const HeaderCartButton = () => {
    const { button, icon, badge, bump } = styles;

    // useContext훅은 컨텍스트가 관리하는 데이터를 한번에 가져오는 함수
    const { openModal, cartItems } = useContext(CartContext);

    // bump애니메이션을 수행할 상태변수
    const [isBump, setIsBump] = useState(false);

    // 첫번째 파라미터 함수를 실행, 두번째 파라미터 배열의 값에 따라 실행 횟수를 결정
    useEffect(() => {

        if (cartItems.length === 0) return;

        setIsBump(true);

        // 애니메이션이 끝나면 클래스를 제거
        const timer = setTimeout(() => {
            setIsBump(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        };

    }, [cartItems]);

    // 배열에 있는 수량을 전부 더하기
    const numberOfCart = cartItems.reduce((acc, curr) => acc + curr.amount, 0);

    return (
        <button className={`${button} ${isBump ? bump : ''}`} onClick={openModal}>
      <span className={icon}>
        <CartIcon />
      </span>
            <span>My Cart</span>
            <span className={badge}>{ numberOfCart }</span>
        </button>
    );
};

export default HeaderCartButton;