import Card from "./program/card";

export default function Program() {
    return (
        <div className="col-start-1 col-end-6">
            <h2>Unser Programm</h2>
            <Card id={1}/>
            <Card id={2}/>
            <Card id={3}/>
        </div>
    );
}