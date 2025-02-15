import { createContext, useEffect, useState } from "react";


export let UserContext = createContext();

export default function UserContextprovider(props) {


    const [UserLogin, setUserLogin] = useState(null);

    useEffect(() => {
      if(localStorage.getItem("userToken")){
        setUserLogin(localStorage.getItem("userToken"))
      }
}
,[])
    


     
  return(  <UserContext.Provider value={{UserLogin,setUserLogin}}>
          {props.children}
    </UserContext.Provider>
    );
}
