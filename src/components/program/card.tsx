import Program from "@/data/program.js";
import Image from "next/image";
import calenderIcon from "@/icon/calendar.svg";

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
            <div className="my-[24px] mx-[8px]">
                <h3 className="mb-[16px]">{card.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: card.content }} className="mb-[24px]"/>
                <a className="flex gap-[16px] program-date">
                    <Image src={calenderIcon} alt="Telefon" width={24} height={24} />
                    {card.date}
                </a>
            </div>
            <a className="btn flex py-[24px] w-full h-fit justify-center rounded-[8px]">{card.button}</a>
        </div>
    );
}