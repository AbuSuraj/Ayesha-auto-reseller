import { useEffect } from "react"

const useTitle = title =>{
    useEffect(() =>{
        document.title = `${title} - AAR`;
    },[title])
}
export default useTitle;