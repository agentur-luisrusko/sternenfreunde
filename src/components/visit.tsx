import Container from './visit/container';

export default function Visit() {
    return (
        <div className='col-start-1 col-end-6 px-[16px] bg-[var(--second-bg-color)]'>
            <div className="my-[80px]" id="visit">
                <h2 className='mb-[24px]'>Ihr Besuch</h2>
                {typeof window !== 'undefined' ? (
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.717769009682!2d6.774443315747116!3d51.21931957958218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8c8f6e3f9c8b7%3A0x8f7b9c7c1e6d4e2b!2sK%C3%B6nigstra%C3%9Fe%2010%2C%2045467%20M%C3%BClheim%20an%20der%20Ruhr!5e0!3m2!1sde!2sde!4v1631242703968!5m2!1sde!2sde"
                    width="600"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
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