import React,{useState,useEffect} from 'react'
import { ListGroup,Button } from 'react-bootstrap'
import { getAuth} from "firebase/auth";
import { getDatabase, ref, onValue,set} from "firebase/database";


import moment from 'moment'


const Right = (props) => {

  let [users,setUsers] = useState([])
  let [requsers,setRequsers] = useState([])

  const auth = getAuth();

  let userArr = []
      useEffect(()=>{
        const db = getDatabase();
        const userRef = ref(db, 'users/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach(item=>{
                if(props.id !== item.key){
                    userArr.push(item.val())
                }
                
            })
            setUsers(userArr)
        });
      },[props.id])

      let reqArr = []
      useEffect(()=>{
        const db = getDatabase();
        const userRef = ref(db, 'request/');
        onValue(userRef, (snapshot) => {
            snapshot.forEach(item=>{
                if(props.id !== item.key){
                  reqArr.push(item.val())
                }
            })
            setRequsers(reqArr)
        });
      },[])

      let handleSendReq = (id,name)=>{
        const db = getDatabase();
        set(ref(db, 'request/'+auth.currentUser.uid),{
          ReqReceiver:name,
          username: auth.currentUser.displayName,
          receiver: id,
          sender: auth.currentUser.uid,
        });
      }

      let handleAcceptReq = (id,name)=>{
        const db = getDatabase();
        set(ref(db, 'friends/'+auth.currentUser.uid),{
          reqSenderName: name,
          username: auth.currentUser.displayName,
          receiver: auth.currentUser.uid,
          sender: id,
        });
      }
  return (
    <>
    <div className='right'>
    <h3>account info</h3>
    <ListGroup>
      <ListGroup.Item>{moment(props.createtime).fromNow()}</ListGroup.Item>
    </ListGroup>
    <h3 className='heading'>Poeples</h3>
    {users.map(item=>(
            <ListGroup>
                <ListGroup.Item>{item.username} <Button onClick={()=>handleSendReq(item.id,item.username)}>Add Friend</Button></ListGroup.Item>
            </ListGroup>
        ))}
    <h3 className='heading'>Requests</h3> 
    {requsers.map(item=>(
            <ListGroup>
              {item.receiver == auth.currentUser.uid
              ?
              <ListGroup.Item>{item.username} <Button onClick={()=>handleAcceptReq(item.sender,item.username)}>accept</Button></ListGroup.Item>
              :
              ''
              }
                
            </ListGroup>
        ))}   
    </div>
    </>
  )
}

export default Right