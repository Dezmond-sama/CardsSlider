import { createContext, useEffect, useState } from "react";

export const CardsContext = createContext({
    cards: [],
    getNext: () => {},
    getPrev: () => {},
});
const CardsState = ({ count = 5, cache = 3, children, fetchCard }) => {
    const [cards, setCards] = useState([]);
    const [prevCards, setPrevCards] = useState([]);
    const [nextCards, setNextCards] = useState([]);

    useEffect(() => {
        setCards([]);
        for (let i = 0; i < count; i++)
            fetchCard().then((card) => {
                setCards((prev) => [...prev, card]);
            });
    }, [count, fetchCard]);
    useEffect(() => {
        if (prevCards.length < cache) {
            fetchCard().then((card) => {
                setPrevCards((prev) => [...prev, card]);
            });
        } else if (prevCards.length > cache) {
            setPrevCards((prev) => [...prev.slice(0, cache)]);
        }
    }, [prevCards.length, fetchCard, cache]);
    useEffect(() => {
        if (nextCards.length < cache) {
            fetchCard().then((card) => {
                setNextCards((prev) => [card, ...prev]);
            });
        } else if (nextCards.length > cache) {
            setNextCards((prev) => [...prev.slice(1)]);
        }
    }, [nextCards.length, fetchCard, cache]);
    const getNext = () => {
        if ((nextCards?.length ?? 0) > 0) {
            setCards((prev) => [
                ...prev.slice(1),
                nextCards[nextCards.length - 1],
            ]);
            setPrevCards((prev) => [cards[0], ...prev]);
            setNextCards((prev) => [...prev.slice(0, -1)]);
        }
    };
    const getPrev = () => {
        if ((prevCards?.length ?? 0) > 0) {
            setCards((prev) => [prevCards[0], ...prev.slice(0, -1)]);
            setNextCards((prev) => [...prev, cards[cards.length - 1]]);
            setPrevCards((prev) => [...prev.slice(1)]);
        }
    };
    return (
        <CardsContext.Provider
            value={{
                cards,
                getNext,
                getPrev,
            }}
        >
            {children}
        </CardsContext.Provider>
    );
};

export default CardsState;
