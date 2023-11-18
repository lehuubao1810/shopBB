


import Header from "../components/Header"
import Footer from "../components/Footer"
import UpBtn from "../components/UpBtn"

import "../assets/css/ContactPage.css"

export default function Contact() {
    
    return (
        <div className="contactPage">
            <Header />
            <div className="contactPage__content">
                <h1>Contact</h1>
            <p>Phone: 0123456789</p>
            <p>Email:</p>
            <p>Address:</p>
            </div>
            
            <UpBtn />
            <Footer />
        </div>
    )
}