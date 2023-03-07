import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import AuthNavigationContainer from "./AuthNavigation";
import StudentList from "./StudentList";
import UnAuthNavContainer from "./UnAuthNavigation";

const NavigationIndex = () => {
    const { userInfo } = useContext(AuthContext);
    return userInfo.refreshToken ? <StudentList route={undefined} navigation={undefined} /> : <UnAuthNavContainer />
}

export default NavigationIndex;