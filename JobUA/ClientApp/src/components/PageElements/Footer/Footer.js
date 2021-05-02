import React from "react";
import Button from "reactstrap/lib/Button";
import "./Footer.css";

function Footer(){
    return(
        <footer className="footer">
            <div className="firstFooterLay">
                <a href ="/employer/login/" >
                <Button className="footerEmployeeLink">
                    Роботодавцю
                </Button>
                </a>
            </div>
            <div className="secondFooterLay">
                <div className="FooterText">
                    <p className="footerTextTitle">Contact:</p>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
                    <a href="https://www.facebook.com/" className="fa fa-facebook"/>
                    <a href="https://mail.google.com/" className="fa fa-google"/>    
                    <a href="https://twitter.com/?lang=en" className="fa fa-twitter"/>
                    <a href="https://www.linkedin.com/" className="fa fa-linkedin"/>
                </div>
            </div>
            <div className="thirdFooterLay">
                <p className="FooterText">
                    © {new Date().getFullYear()} JobUA. Сайт пошуку роботи в Україні.
                </p>
            </div>
        </footer>      
    );
}

export default Footer;