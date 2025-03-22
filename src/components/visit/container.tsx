import { VisitContent } from "@/data/visit.js";
import Image from "next/image";
import phoneIcon from "@/icon/phone.svg";
import mailIcon from "@/icon/mail.svg";

interface ContentItem {
    id: string;
    title: string;
    content: {
        [key: string]: string | number | { [key: string]: string | number } | string[];
    };
}

interface ContainerProps {
    id: string;
}

const groupOpeningHours = (openingHours: { [key: string]: string }): string[] => {
    const days = ["mo", "di", "mi", "do", "fr", "sa", "so"];
    const daysOfWeek = {
        mo: "Montag",
        di: "Dienstag",
        mi: "Mittwoch",
        do: "Donnerstag",
        fr: "Freitag",
        sa: "Samstag",
        so: "Sonntag",
    };
    const groupedHours: string[] = [];
    let startDay: string | null = null;
    let currentHours: string | null = null;

    for (let i = 0; i < days.length; i++) {
        const day = days[i];
        const hours = openingHours[day];

        if (hours === "geschlossen") {
            continue;
        }

        if (currentHours === null) {
            startDay = day;
            currentHours = hours;
        }
        else if (hours === currentHours) {
            continue;
        }
        else {
            const endDay = days[i - 1];
            if (startDay && endDay) {
                if (startDay === endDay) {
                    groupedHours.push(`${daysOfWeek[startDay]}: ${currentHours}`);
                } else {
                    groupedHours.push(`${daysOfWeek[startDay]} - ${daysOfWeek[endDay]}: ${currentHours}`);
                }
            }
            startDay = day;
            currentHours = hours;
        }
    }

    if (startDay !== null && currentHours !== null) {
        const endDay = days[days.length - 1];
        if (startDay === endDay) {
            groupedHours.push(`${daysOfWeek[startDay]}: ${currentHours}`);
        } else {
            groupedHours.push(`${daysOfWeek[startDay]} - ${daysOfWeek[endDay]}: ${currentHours}`);
        }
    }

    return groupedHours;
};

export default function Container({ id }: ContainerProps) {
    const container = VisitContent.find((b) => b.id === id);

    if (!container) {
        return <div>Container not found</div>;
    }

    if (container.id === 'opening') {
        const openingHours = container.content as { [key: string]: string };
        const groupedHours = groupOpeningHours(openingHours);

        return (
            <div>
                <h3>{container.title}</h3>
                <ul>
                    {groupedHours.map((hours, index) => (
                        <li key={index}>{hours}</li>
                    ))}
                </ul>
            </div>
        );
    }

    if (container.id === 'contact') {
        const entries = container.content as { [key: string]: string };
        const keyMapping = {
            tel: <Image src={phoneIcon} alt="Beschreibung" width={24} height={24} />,
            email: <Image src={mailIcon} alt="Beschreibung" width={24} height={24} />,
        };

        return (
            <div>
                <h3>{container.title}</h3>
                <ul>
                    {Object.entries(entries).map(([key, value], index) => (
                        <li key={index} className="flex gap-[8px]">
                            {keyMapping[key as keyof typeof keyMapping]} {value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (container.id === 'entries') {
        const entries = container.content as { [key: string]: string };
        const keyMapping = {
            erw: "Erwachsener",
            erm: "Ermäßigt",
            kind: "Kind bis 18 Jahre",
        };

        return (
            <div>
                <h3>{container.title}</h3>
                <ul>
                    {Object.entries(entries).map(([key, value], index) => (
                        <li key={index}>
                            {keyMapping[key as keyof typeof keyMapping]}: {value}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    return (
        <div>
            <h3>{container.title}</h3>
            <ul>
                {Object.entries(container.content).map(([key, value], index) => {
                    if (Array.isArray(value)) {
                        return (
                            <li key={`${key}-${index}`}>
                                <strong>{key}</strong>
                                <ul>
                                    {value.map((item, itemIndex) => (
                                        <li key={`${key}-${itemIndex}`}>{item}</li>
                                    ))}
                                </ul>
                            </li>
                        );
                    }
                    else if (typeof value === 'object' && value !== null) {
                        return (
                            <li key={`${key}-${index}`}>
                                <div className="flex gap-[8px]">
                                    {Object.entries(value).map(([subKey, subValue], subIndex) => (
                                        <p key={`${key}-${subKey}-${subIndex}`}>
                                            {subValue}
                                        </p>
                                    ))}
                                </div>
                            </li>
                        );
                    }
                    else {
                        return (
                            <li key={`${key}-${index}`}>
                                {value}
                            </li>
                        );
                    }
                })}
            </ul>
        </div>
    );
}