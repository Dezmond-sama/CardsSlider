import { useCallback, useEffect, useState } from "react";
import Slide from "./Slide";
const Slider = () => {
    const getColor = () => {
        let c = "";
        while (c.length < 3) {
            c += Math.random().toString(16).at(-1);
        }
        return c;
    };
    const fetchCard = useCallback(() => {
        return setTimeout(() => {
            const card = {
                id: Math.random(),
                url: `https://dummyimage.com/300/${getColor()}/${getColor()}.png`,
            };
            setCards((prev) => [...prev, card]);
        }, Math.random() * 1000 + 100);
    }, []);

    const [cards, setCards] = useState([]);
    useEffect(() => {
        setCards([]);
        const timers = [];
        for (let i = 0; i < 5; i++) {
            timers.push(fetchCard());
        }
        timers.push(
            setTimeout(() => {
                setInterval(() => {
                    setCards((prev) => [...prev.slice(1)]);
                    fetchCard();
                }, 5000);
            }, 5000)
        );
        return () => timers.forEach((element) => clearTimeout(element));
    }, [fetchCard]);
    return (
        <div className="slider">
            {cards.map((card, index) => (
                <Slide key={card.id} active={index === 1}>
                    <img alt="slide" src={card.url} className="slide-image" />
                </Slide>
            ))}
        </div>
    );
};

export default Slider;
