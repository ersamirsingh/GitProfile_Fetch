import { useEffect, useState } from "react"


export default function Body(){

      const [Profile, SetProfile] = useState([])
      const [numOfProfile, SetNumberOfProfile] = useState("")


      async function GenerateProfile(count){

            const randomProfile = Math.floor(Math.random() * 10000);
            
            const response = await fetch(`https://api.github.com/users?since=${randomProfile}&per_page=${count}`)
            const data = await response.json()

            SetProfile(data)
      }

      //for initially
      useEffect(()=>{
        GenerateProfile(10)
        console.log('initially rendering of function')
      },[])

      return (
            <>
            <input id="input" type="number" placeholder="Search here" value={numOfProfile} onChange={(e)=>SetNumberOfProfile(e.target.value)}></input>
            <button id="button" onClick={()=>GenerateProfile(Number(numOfProfile))}>Search</button>

            <div className="profiles">

                  {
                        Profile.map((value)=>{
                              return(
                                    <div key={value.id} className="cards">
                                          <img src={value.avatar_url}></img>
                                          <h2>{value.login}</h2>
                                          <a target="_blank" href={value.html_url}>Profile</a>
                                    </div>
                              )
                        })
                  }
            </div>
            </>
      )
}