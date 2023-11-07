const Button =({onClick,color,btnName})=>{
    return (
        <>
        <button onClick={onClick} style={{backgroundColor:color}} className="btn">{btnName}</button>
        </>

    )

}

export default Button;