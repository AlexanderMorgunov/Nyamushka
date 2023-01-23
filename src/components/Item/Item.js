import './item.css';
import cat from "../../resources/images/cat.png";
import { useState} from 'react';
import classNames from 'classnames';

const Item = ({title, servings, gift, additionDescription, weight, description, available}) => {

const [cardState, setCardState] = useState(available ? 'default' : 'disable');
const [selectAndLeave, setSelectAndLeave] = useState(false);

const itemWrapperStyle = classNames({
    'item-wrapper': true,
    'item-wrapper-default-hover':cardState === 'defaultHover',
    'item-wrapper-selected':cardState === 'selected',
    'item-wrapper-selected-hover':cardState === 'selectedHover',
});

const itemContentStyle = classNames({
    'item-content': true,
    'item-content-default-hover':cardState === 'defaultHover',
    'item-content-selected': cardState === 'selected',
    'item-content-selected-hover':cardState === 'selectedHover',
})

const itemWeightStyle = classNames({
    'item-weight':true,
    'item-weight-default-hover':cardState === 'defaultHover',
    'item-weight-selected': cardState === 'selected',
    'item-weight-selected-hover':cardState === 'selectedHover',
})

const handleSelectAndLeaveOn = () => {
    if(cardState === 'selectedHover') {
        setSelectAndLeave(true);
    }
}

const handleSelectAndLeaveOff = () => {
    if(cardState === 'selected') {
        setSelectAndLeave(false);
    }
}

const handleMouseOn = () => {
    if(cardState!=='disable'){
        switch(cardState){
            case 'default': 
                setCardState('defaultHover')
                break;
            case 'selected':
                setCardState('selectedHover')
                break;
            default:
                break;  
        }
    }
}

const handleMouseLeave = () => {
    if(cardState!=='disable'){
        switch(cardState){
            case 'defaultHover':
                setCardState('default')
                break;
            case 'selectedHover':
                setCardState('selected')
                break;
            default:
                break;
        }
    }
}

const handleSelect = (e) => {
    if(cardState!=='disable'){
        switch(cardState){
            case'selectedHover':
            case 'selected':
                setCardState('defaultHover')
                break;
            case 'default':
            case 'defaultHover':
                setCardState('selectedHover')
                break;
            default:
                break;
        }
    }
}

const descriptionContent = () => {
    if(!available) return  <div className='item-footer-not-available'>Печалька, {title} закончился</div>
    switch(cardState){
        case 'selected':
        case 'selectedHover':
            return <div className="item-footer">{description}</div>;
        case 'default':
        case 'defaultHover':
            return <div className="item-footer">Чего сидишь? Порадуй котэ, <a className='item-footer-buy' href="#">купи.</a></div>
        default:
            return;
    }
}

    return (
        <div className={itemWrapperStyle} onMouseEnter={handleMouseOn} onMouseLeave={handleMouseLeave} onClick={handleSelect}>
            <div className={available ? itemContentStyle: "item-content disabled"} onMouseLeave={handleSelectAndLeaveOn} onMouseEnter={handleSelectAndLeaveOff}>
                <div className="item-text">
                {selectAndLeave && cardState === 'selected' ? <p className="item-title-overview item-title-overview-leave">Котэ не одобряет?</p>: <p className="item-title-overview">Сказочное заморское явство</p>}
                    <h1>Нямушка</h1>
                    <div className="item-taste">{title}</div>
                        <p className="item-text-description">{servings} порций </p>
                        <p className="item-text-description">{gift}</p>
                        <p className="item-text-description">{additionDescription}</p>
                </div>
                <div className={itemWeightStyle}>{weight} <span>кг</span></div>
                <img src={cat} alt="cat" />
            </div>
            {descriptionContent()}
        </div>
    )
}

export default Item;