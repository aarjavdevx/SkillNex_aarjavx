import useAuthStore from "../store/useAuthStore"
import { useEffect, useState } from "react"
import EventCard from "../components/eventCard"
import {Link} from 'react-router-dom'

const MyEvents = () => {
const {token} =useAuthStore();
const[loading,setLoading]= useState(false) 
const[myEvents,setMyEvents]=useState([])
 useEffect(()=>{
        const fetchMyEvents = async()=>{
           try {
              setLoading(true)
             const response = await fetch('http://localhost:5001/api/event/myevents',{
              headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
              }
             })
             const result = await response.json()
             if (!response.ok) {
              throw new Error(result.message);
             }
             setMyEvents(result.myEvents)
           } catch (err) {
            console.log("Error while fetching your events", err);
           } finally {
            setLoading(false)
           }
        }
       fetchMyEvents()
    },[])

  return (
  <>
    {loading ? "Loading...." : 
    <div>
              <div className="flex justify-start mt-5 ml-5">
          <button className="btn bg-emerald-400 text-white font-semibold text-lg rounded-lg">
            <Link to="/project-feed">🢀 Back</Link></button>      
          </div>
              {myEvents?.length === 0 ? (
                <div className="text-center mt-20">
                  <h2 className="text-2xl font-semibold">No Events Yet!</h2>
                  <p className="text-gray-500 mt-2">
                    Start organising your first event.
                  </p>
                  <Link to="/create-event" className="btn bg-blue-400 text-white font-semibold text-lg mt-5">
                    Create Event
                  </Link>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  {myEvents?.map((event)=>(
        <EventCard event = {event}/>))}
                </div>
              )}
            </div>
    }
</>
  )
}

export default MyEvents