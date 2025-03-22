import { FooterContent } from '@/data/footer.js';
import Image from 'next/image';
import phoneIcon from '@/icon/phone.svg';
import mailIcon from '@/icon/mail.svg';

interface ContentItem {
    id: string;
    title: string;
    content: {
        [key: string]: string | number | { [key: string]: string | number } | string[];
    };
}

const style = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "16px",
};

interface ContainerProps {
    id: string;
}

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

export default function Footer() {
    return (
        <footer className='col-start-1 col-end-6 flex flex-col gap-[24px] my-[80px]'>
            {FooterContent.map((container: ContentItem) => {
                if (container.id === 'opening') {
                    const openingHours = container.content as { [key: string]: string };
                    const groupedHours = groupOpeningHours(openingHours);

                    return (
                        <div style={style} key={container.id} className='information-container'>
                            <h3>{container.title}</h3>
                            <ul className='flex flex-col gap-[8px]'>
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
                        tel: <Image src={phoneIcon} alt="Telefon" width={24} height={24} />,
                        email: <Image src={mailIcon} alt="E-Mail" width={24} height={24} />,
                    };

                    return (
                        <div style={style} key={container.id} className='information-container'>
                            <h3>{container.title}</h3>
                            <ul className='flex flex-col gap-[8px]'>
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

                if (container.id === 'links') {
                    const links = container.content as { title: string; link: string }[];

                    return (
                        <div key={container.id} className='flex px-[16px]'>
                            <ul className="flex gap-[16px]">
                                {links.map((link: LinkItem, index: number) => (
                                    <li key={index}>
                                        <a href="" className="">
                                            {link.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    );
                }

                return null;
            })}
        </footer>
    );
}