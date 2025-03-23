import Container from './visit/container';

export default function Visit() {
    return (
        <div className='col-start-1 col-end-6 px-[16px] bg-[var(--second-bg-color)]'>
            <div className="my-[80px]" id="visit">
                <h2 className='mb-[24px]'>Ihr Besuch</h2>
                {typeof window !== 'undefined' ? (
                    <iframe
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    loading="lazy"
                    ></iframe>
                ) : (
                    <img
                    src="/assets/img/map.png"
                    alt="Karte"
                    />
                )}
                <div className='flex flex-col gap-[24px] mt-[24px]'>
                    <Container id="address" />
                    <Container id="contact" />
                    <Container id="opening" />
                    <Container id="entries" />
                </div>
            </div>
        </div>
    );
}