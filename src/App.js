import "./App.css";
import Slider from "./components/Slider";
import SliderContainer from "./components/SliderContainer";
import CardsState from "./context/CardsState";

const App = () => {
    const getColor = () => {
        let c = "";
        while (c.length < 3) {
            c += Math.random().toString(16).at(-1);
        }
        return c;
    };
    function timeout(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
    const fetchCard = async () => {
        // Emulation of loading with some delay
        await timeout(Math.random() * 1000 + 100);
        return {
            id: Math.random(),
            url: `https://dummyimage.com/300/${getColor()}/${getColor()}.png`,
        };
    };
    return (
        <div className="app">
            <div className="container">
                <CardsState fetchCard={fetchCard}>
                    <SliderContainer>
                        <Slider />
                    </SliderContainer>
                </CardsState>
            </div>
        </div>
    );
};

export default App;
