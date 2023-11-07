
import Button from "./button";
// Header Component Passing Props
const Header=({title,onAdd ,showAdd})=>{


    return(
        <>
        <header className="header">
            <h1>{title}</h1>
            <Button onClick={onAdd} color={showAdd ?'red':'green'} btnName={showAdd?'Close':'Add'} />
        </header>
        </>
    );
}

// const heading ={
//     color:"red",
//     backgroundColor:'black',
// }

export default Header;