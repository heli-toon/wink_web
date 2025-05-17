import { useEffect, useRef } from "react";

export default function Backtotop() {
  const toTop = useRef(null);

  const handleWindowScrolltotop = () => {
    if (window.scrollY > 25) {
      toTop.current.classList.add("active");
    } else {
      toTop.current.classList.remove("active");
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleWindowScrolltotop);
    return () => {
      window.removeEventListener("scroll", handleWindowScrolltotop);
    };
  }, []);
    return <a ref={toTop} href="#" className="btned back-to-top d-flex align-items-center justify-content-center" title="Back to Top"><i className="bi bi-arrow-up"></i></a>
}