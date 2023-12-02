import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./layouts/Navbar"
import Footer from "./layouts/Footer"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import SignIn from "./pages/SignIn"
import SendNews from "./pages/SendNews"
import SignUp from "./pages/SignUp"
import Terms from "./pages/Terms"
import SearchTerms from "./pages/SearchTerms"
import { createContext, useReducer } from "react"
import UserReducer from "./reducers/UserReducer"
import cookies from 'react-cookies'
import DictionaryLayout from "./layouts/DictionaryLayout"
import DictionaryDetail from "./pages/DictionaryDetail"


export const UserContext = createContext();


const App = () => {
  const [currentUser, dispatch] = useReducer(UserReducer, cookies.load("user") || null);


  return (
    <>
      <div className="background">
        <BrowserRouter>
          <div className="md:container mx-auto min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bo-phap-dien" element={<DictionaryLayout />} >
                <Route path=":slugTopic" element={<DictionaryDetail />}></Route>
              </Route>
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
