import Card from "./program/card";

export default function Program() {
    return (
        <div className="col-start-1 col-end-6">
            <h1>Unser Programm</h1>
            <Card id={1}/>
            <Card id={2}/>
            <Card id={3}/>
        </div>
    );
}