import Program from "@/data/program.js";

interface CardProps {
    id: number;
}

export default function Card({id}:  CardProps) {
    const card = Program.find((c) => c.id === id);
    if (!card) {
        return <div>Card not found</div>;
    }

    return (
        <div>
            <img src={card.img} alt={card.title} />
            <h1>{card.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: card.content }} />
        </div>
    );
}