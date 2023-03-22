import useSWR from "swr"
import secureLocalStorage from "react-secure-storage";

const API_URL = import.meta.env.VITE_API_URL

const token = secureLocalStorage.getItem('accesstoken')

const get_one_bike = async (url, token) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
  return await response.json();
}

export const StolenBike = ({ id }) => {

  const { data, mutate, error } = useSWR(
    [API_URL + `/bikes/${id}`, token],
    ([url, token]) => get_one_bike(url, token)
    )
    
    async function reportStolen () {
      const stolen_url = (API_URL + `/bikes/${id}/reportstolen`)

      const response = await fetch(stolen_url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
        },
      })

      const res = await response.json()
      mutate(data)
      
    }

  return (
    <div >
      {error}
      {data ?
      (data.reported_stolen ?
        <button className="btn btn-info" onClick={() => reportStolen()}>Report Found</button> :
        <button className="btn btn-warning" onClick={() => reportStolen()}>Report Stolen</button>
      )
      : 
      <button className="btn bg-red-500">{"no data here"}</button>
      }

    </div>
  )
}
