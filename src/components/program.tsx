import Card from "./program/card";

export default function Program() {
    return (
        <div className="col-start-1 col-end-6 mx-[16px]" id="program">
            <h2 className="mb-[24px]">Unser Programm</h2>
            <div className="flex flex-col gap-[80px]">
                <Card id={1}/>
                <Card id={2}/>
                <Card id={3}/>
            </div>
        </div>
    );
}