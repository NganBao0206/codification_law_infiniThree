import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./layouts/Navbar"
import Footer from "./layouts/Footer"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import Dictionary from "./pages/Dictionary"
import SignIn from "./pages/SignIn"
import SendNews from "./pages/SendNews"
import SignUp from "./pages/SignUp"
import Documents from "./pages/Documents"
import Terms from "./pages/Terms"
import ChatBot from "./components/ChatBot"
import SearchTerms from "./pages/SearchTerms"

function App() {

  return (
    <>
      <div className="background">
        <BrowserRouter>
          <div className="md:container mx-auto min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bo-phap-dien" element={<Dictionary />} />
              <Route path="/tra-cuu-thuat-ngu" element={<Terms />} />
              <Route path="/tim-trong-van-ban" element={<SearchTerms />} />
              <Route path="/dang-nhap" element={<SignIn />} />
              <Route path="/dang-ky" element={<SignUp />} />
              <Route path="/gui-bai" element={<SendNews />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter >
      </div>
    </>
  )
}

export default App
