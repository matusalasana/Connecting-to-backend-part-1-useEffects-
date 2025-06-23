
import { useEffect, useState } from 'react'
import './App.css'
import axios, { CanceledError } from 'axios'
import apiClient from './Services/api-client'

interface User{
  id:number;
  name:string;
}

function App() {

  const [error,setError]=useState('')

  const [users,setUsers]=useState<User[]>([])

  const [isLoading,setIsLoading]=useState(false);
    
  useEffect(()=>{
    apiClient
      .get<User[]>('/users')
      .then(response=>(
        setUsers(response.data),
        setIsLoading(false)))
      .catch(error=>{
        setError(error.message),
        setIsLoading(false)})
    document.title='my-react-app.com'},[])

  const deleteUser=(user:User)=>{
    const originalUsers=[...users]
    setUsers(users.filter(u=>u.id!== user.id))
    apiClient
      .delete('/users/'+user.id)
      .catch(err=>{
        setError(err.message)
        setUsers(originalUsers)})
  }

  return (
    <>
    {isLoading&& 
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
    {error&& <p>{error}</p>}

        {users.map(user=>
            <ul className='list-group'>
                <li className='list-group-item d-flex justify-content-between' key={user.id}>
                    {user.name}
                    <button onClick={()=>deleteUser(user)} type='button' className='btn btn-outline-danger'>Delete</button>
                </li>
            </ul>
        )}
     
    </>
  )
}

export default App
