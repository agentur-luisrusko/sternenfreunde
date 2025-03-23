import { VisitContent } from "@/data/visit.js";
import Image from "next/image";
import phoneIcon from "@/icon/phone.svg";
import mailIcon from "@/icon/mail.svg";

interface ContainerProps {
    id: string;
}

const style: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
};

const convertToInternationalPhoneNumber = (phoneNumber: string): string => {
    const cleanedNumber = phoneNumber.replace(/\s+/g, '');

    const numberWithoutLeadingZero = cleanedNumber.startsWith('0') ? cleanedNumber.slice(1) : cleanedNumber;

    if (!numberWithoutLeadingZero.startsWith('+')) {
        return `+49${numberWithoutLeadingZero}`; //
    }

    return numberWithoutLeadingZero;
}

const groupOpeningHours = (openingHours: { [key: string]: string }): string[] => {
    const days = ["mo", "di", "mi", "do", "fr", "sa", "so"];
    const daysOfWeek: { [key: string]: string } = {
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
        const openingHours = Object.fromEntries(
            Object.entries(container.content).filter(([_, value]) => typeof value === 'string')
        ) as { [key: string]: string };
        const groupedHours = groupOpeningHours(openingHours);

        return (
            <div style={style} className="information-container">
                <h3>{container.title}</h3>
                <ul className="flex flex-col gap-[8px]">
                    {groupedHours.map((hours, index) => (
                        <li key={index}>{hours}</li>
                    ))}
                </ul>
            </div>
        );
    }

    if (container.id === 'contact') {
        const entries = container.content;
        const keyMapping = {
            tel: <Image src={phoneIcon} alt="Beschreibung" width={24} height={24} />,
            email: <Image src={mailIcon} alt="Beschreibung" width={24} height={24} />,
        };

        return (
            <div style={style} className="information-container">
                <h3>{container.title}</h3>
                <ul className="flex flex-col gap-[8px]">
                    {Object.entries(entries).map(([key, value], index) => (
                        <li key={index} className="flex gap-[8px]">
                            {key === 'tel' ? (
                                <a className="flex gap-[8px]" href={`tel:${convertToInternationalPhoneNumber(value)}`}>{keyMapping[key as keyof typeof keyMapping]} {value}</a>
                            ) : key === 'email' ? (
                                <a className="flex gap-[8px]" href={`mailto:${value}`}>{keyMapping[key as keyof typeof keyMapping]} {value}</a>
                            ) : (
                                <span>{value}</span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

    if (container.id === 'entries') {
        const entries = container.content;
        const keyMapping = {
            erw: "Erwachsener",
            erm: "Ermäßigt",
            kind: "Kind bis 18 Jahre",
        };

        return (
            <div style={style} className="information-container">
                <h3>{container.title}</h3>
                <ul className="flex flex-col gap-[8px]">
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
        <div style={style} className="information-container">
            <h3>{container.title}</h3>
            <ul className="flex flex-col gap-[8px]">
                {Object.entries(container.content).map(([key, value], index) => {
                    if (Array.isArray(value)) {
                        return (
                            <li key={`${key}-${index}`}>
                                <strong>{key}</strong>
                                <ul>
                                    {value.map((item, itemIndex) => (
                                        <li key={`${key}-${itemIndex}`}><p>{item}</p></li>
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
                                        <p key={`${key}-${subKey}-${subIndex}`} className="information-container">
                                            {subValue !== undefined && subValue !== null ? subValue.toString() : ""}
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