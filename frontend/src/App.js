import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import { DocInfo } from "./pages/DocInfo";
import Home from "./pages/Home";
import { Invoice } from "./pages/Invoice";
import { AddItems } from "./pages/Invoice/AddItems";
import Login from "./pages/Login";
import { New } from "./pages/New";
import { Quote } from "./pages/Quote";
import Register from "./pages/Register";
import ToInvoice from "./pages/ToInvoice";

function App() {
  return (
    <>
      <Router>
        <div className="container">
          {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create-invoice" element={<Invoice />} />
            <Route path="/create-quote" element={<Quote />} />
            {/* <Route path="/invoice_to" element={<ToInvoice />} /> */}
            <Route path="/create_invoice_next" element={<New />} />
            <Route path="/create_invoice_info" element={<DocInfo />} />
            <Route path="/create_invoice/add_items" element={<AddItems />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
