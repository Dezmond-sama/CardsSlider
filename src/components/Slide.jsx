const Slide = ({ children, active }) => {
    return (
        <div className={"slide" + (active ? " active" : "")}>{children}</div>
    );
};

export default Slide;
