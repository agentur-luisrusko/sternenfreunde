export default function Header() {
    return (
        <header className="grid grid-cols-5 gap-[16px] px-[16px] h-[100vh] max-h-[1025px] items-center justify-center text-center">
            <div className="col-start-1 col-end-6 flex flex-col gap-[24px]">
                <h1>Planetarium Fritzlar</h1>
                <p>Wir entführen Sie ins Weltall</p>
            </div>
        </header>
    );
}