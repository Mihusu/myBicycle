import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import PhoneInputWithCountrySelect from "react-phone-number-input";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";


const API_URL = import.meta.env.VITE_API_URL;


const BikeTransfer = () => {

  const token = secureLocalStorage.getItem('accesstoken');

  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Use useEffect to check if user
  // with given phonenumber exists on every type hit

  const onSendTransferRequest = async () => {

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/transfers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          'receiver_phone_number': phoneNumber,
          'bike_id': id
        })
      })

      const body = await response.json();

      if (!(response).ok) {
        setError(body.detail);
        return
      }

      navigate('/mybikes');

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <LayoutWithBack title="Anmod om overføring">
      <div className="flex flex-col mx-auto space-y-4 p-4 bg-gray-800 rounded-md  max-w-[425px]">

        {/* Errors */}
        {error && <div className="p-4 rounded-lg bg-error text-white">{error}</div>}

        <p>Indtast telefonnummeret på den person du ønsker at overfører ejerskabet til</p>
        <p>Personen kan efterfølgende afkræfte/bekræfte din anmodning</p>
        <h2 className="text-xl text-white">Send anmodning til:</h2>

        <PhoneInputWithCountrySelect
          name='receiver'
          placeholder="Ex. +45 12 34 56 78"
          value={phoneNumber}
          onChange={setPhoneNumber}
          defaultCountry="DK"
        />

        <button onClick={onSendTransferRequest} className={`btn btn-info ${isLoading && 'loading'}`}>
          Send anmodning
        </button>
      </div>
    </LayoutWithBack>
  );
};

export default BikeTransfer;
