import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { getDatabase, ref, set,onValue } from "firebase/database";

const Middle = () => {

    let [msg,setMsg] = useState('')
    let [usermsg,setUsermsg] = useState('')

    let handleMSg = (e)=>{
        setMsg(e.target.value)
    }

    let handleSend = ()=>{
        const db = getDatabase();
        set(ref(db, 'message/'), {
            msg: msg
        });
    }

    useEffect (()=>{
        const db = getDatabase();
        const starCountRef = ref(db, 'message/');
        onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setUsermsg(data)
        });
    },[])


  return (
   <>
   <div className='middle'>
    <h1>bdfb</h1>
   </div>
   <Form.Control onChange={handleMSg} type="text" placeholder="massage" />
   <button onClick={handleSend} className='w-50 mt-2'>Send</button>
   <button className='w-50'>File</button>
   </>
  )
}

export default Middle