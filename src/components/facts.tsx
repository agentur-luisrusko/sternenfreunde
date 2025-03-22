import Image from "next/image";
import sizeIcon from "@/icon/sizeIcon.svg";
import locationIcon from "@/icon/locationIcon.svg";
import viewingIcon from "@/icon/viewingIcon.svg";

export default function Facts() {
  return (
    <div className="col-start-1 col-end-6 mx-[16px] my-[80px]">
      <div className="grid grid-template-columns-2 grid-template-rows-2 gap-[16px]">
        <div className="col-start-1 col-end-2 row-start-1 row-end-2">
          <div className="mx-auto w-fit h-fit flex flex-col items-center gap-[16px]">
            <div className="fact-icon-card">
              <Image src={sizeIcon} alt="Kuppel" width={48} height={48} />
            </div>
            <span>6-Meter-Kuppel</span>
          </div>
        </div>
        <div className="col-start-3 col-end-4 row-start-1 row-end-2">
          <div className="mx-auto w-fit h-fit flex flex-col items-center gap-[16px]">
            <div className="fact-icon-card">
              <Image src={locationIcon} alt="Location" width={48} height={48} />
            </div>
            <span>Neue Location</span>
          </div>
        </div>
        <div className="col-start-1 col-end-4 row-start-3 row-end-4">
          <div className="mx-auto w-fit h-fit flex flex-col items-center gap-[16px]">
            <div className="fact-icon-card">
              <Image src={viewingIcon} alt="360 Grad" width={48} height={48} />
            </div>
            <span>360-Grad-Fulldome-Technik</span>
          </div>
        </div>
      </div>
    </div>
  );
}