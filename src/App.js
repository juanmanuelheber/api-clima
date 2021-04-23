import { Provider } from "react-redux";
import Home from "./Components/Home"
import store from "./Redux/store"

function App() {
  return (
    <>
      <Provider store={store}>
        <Home />
      </Provider>
    </>
  );
}

export default App;
