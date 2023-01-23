import { useEffect, useState } from "react";
import Item from "../Item/Item";
import './ItemsList.css'

const ItemList = () => {

    const [Items, SetItems] = useState([]);

    useEffect(() => {
        requestData();
    },[]) 
    
        const requestData = async () => {
            await import('../../resources/db')
            .then(obj => obj.cards.forEach(Items => SetItems(items => [...items, Items])));
        }

    const content = Items.map(el => (
        <Item title={el.title} 
              key={el.id} 
              servings={el.servings} 
              gift={el.gift}
              weight={el.weight}
              description={el.description}
              additionDescription={el.additionDescription}
              available={el.available}
              />
    ))

    return (
        <div className="Items-list_wrapper">
            <div className="Items-list_header">Ты сегодня покормил кота?</div>
            <div className="items-content_wrapper">
            {content}
            </div>
        </div>
        
    )
}
export default ItemList;
