import { useContext } from "react";
import Slide from "./Slide";
import { CardsContext } from "../context/CardsState";
const Slider = () => {
    const { cards } = useContext(CardsContext);
    return (
        <div className="slider">
            {cards.map((card) => (
                <Slide key={card.id}>
                    <img alt="slide" src={card.url} className="slide-image" />
                </Slide>
            ))}
        </div>
    );
};

export default Slider;
