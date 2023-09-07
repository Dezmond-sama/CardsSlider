import { useContext } from "react";
import { CardsContext } from "../context/CardsState";
const SliderContainer = ({ children }) => {
    const { getNext, getPrev } = useContext(CardsContext);
    return (
        <>
            <div className="button up" onClick={getPrev}>
                <img className="button-image" src="/arrow.svg" alt="prev" />
            </div>
            {children}
            <div className="button down" onClick={getNext}>
                <img className="button-image" src="/arrow.svg" alt="next" />
            </div>
        </>
    );
};

export default SliderContainer;
