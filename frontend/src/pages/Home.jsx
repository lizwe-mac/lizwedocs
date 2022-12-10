import image from "../assets/landing_image.png"
import { Link } from "react-router-dom"

function Home() {
  return (
    <>
       <div className="home">
        <h1 className="title">LizweDocs</h1>
        <h3 className="title2">Create Quick Documents</h3>
        <h3 className="title3">QUOTES. INVOICES. CONTRACTS.</h3>
        <div className="image-container">
          <img src={image} alt="" />
        </div>
        <Link to="/login"><button className="home-btn">GET STARTED</button></Link>
       </div>
    </>
  )
}

export default Home