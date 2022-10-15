import "./BoardCell.css";

const BoardCell = (cell) => {
    //console.log(cell)
    return (
        <div className={`BoardCell ${cell.cell.className}`}>
            <div className="Sparkle"></div>
        </div>
    )
}

export default BoardCell