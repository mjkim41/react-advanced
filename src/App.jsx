import Header from "./components/layout/Header.jsx";
import Meals from "./components/Meals/Meals.jsx";

const App = () => {

  return (
    <>
        <Header />
        <div id="main">
            <Meals />
        </div>
    </>
  )
}

export default App
