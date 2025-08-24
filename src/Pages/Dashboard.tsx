import { createContext, useEffect, useState } from "react"
import Hero from "../componets/DashboardUI/Hero";

//@ts-ignore
export const AuthorizedContext = createContext();

export default function Dashboard () {

    const [userAuthorzed , setUserAuthorised] = useState(false);
    const [loading ,setLoading] = useState(true)
    const [ authorizationToken , setAuthorizationToken ] = useState('')

    useEffect(() => {
        try {
            const token = localStorage.getItem("authorization")
            if(token) {
                setUserAuthorised(true);
                setLoading(false);
                setAuthorizationToken(token)
            }
        }catch(err){
            console.log("erroe while signing up" , err)
        }
    }, [])

    return <div>
        <AuthorizedContext.Provider value={{authorizationToken}} >
        { userAuthorzed ? 
        <div> {loading ? "loading" : <Hero /> } </div> : "please login"}
        </AuthorizedContext.Provider>
    </div>
}