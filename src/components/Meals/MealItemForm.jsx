import Input from '../UI/Input';
import styles from './MealItemForm.module.scss';

const MealItemForm = (props) => {
    return (
        <form className={styles.form}>
            <Input
                label='구매여부'
                inputAttr={{
                  id: 'amount_' + props.id,
                  type: 'number',
                  min: '1',
                  max: '5',
                  step: '1',
                  defaultValue: '1',
                }}
            />
            <button>담기</button>
        </form>
    );
};

export default MealItemForm;