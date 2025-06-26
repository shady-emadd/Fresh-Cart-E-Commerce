import amazonPayLogo from "../../assets/images/amazon-pay.png";
import americanExpressLogo from "../../assets/images/American-Express-Color.png";
import masterCardLogo from "../../assets/images/mastercard.webp";
import paypalLogo from "../../assets/images/paypal.png";
import appleStoreLogo from "../../assets/images/get-apple-store.png";
import googlePlayLogo from "../../assets/images/get-google-play.png";
export default function Footer() {
  return (
    <>
      <footer className="bg-slate-100 py-4 absolute left-0 right-0 bottom-0">
        <div className="container m-auto">
          <span className="text-2xl">Get The FreshCart App</span>
          <p className="text-xl py-2 text-slate-400">
            We will send you a link, open it on your phone to download the app.
          </p>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              className="form-control flex-grow-1"
              placeholder="Email ..."
            />
            <button className="btn-primary">Share App Link</button>
          </div>
          <div className="flex justify-between items-center  my-5">
            <div className="flex gap-5 items-center">
              <span>Payment Partners</span>
              <div className="flex gap-3">
                <img src={amazonPayLogo} alt="" className="w-13" />
                <img src={americanExpressLogo} alt="" className="w-14" />
                <img src={masterCardLogo} alt="" className="w-14" />
                <img src={paypalLogo} alt="" className="w-14" />
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <span>Get deliveries with freshcart</span>
              <img src={appleStoreLogo} alt="" className="w-16" />
              <img src={googlePlayLogo} alt="" className="w-16" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
