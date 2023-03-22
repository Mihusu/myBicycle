import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import PhoneInputWithCountrySelect from "react-phone-number-input";

import { Layout } from "../components/Layout/Layout";
import secureLocalStorage from "react-secure-storage";


const API_URL = import.meta.VITE_API_URL;

const BikeTransfer = () => {

  const token = secureLocalStorage.getItem('accesstoken');

  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  // TODO: Use useEffect to check if user
  // with given phonenumber exists on every type hit

  const onSendTransferRequest = async () => {

    try {

      const response = await fetch(API_URL + '/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: {
          'receiver_phone_number': value,
          'bike_id': id
        }
      })

      const body = await response.json();

      if (!(response).ok) {
        setError(body.detail);
        return
      }

      navigate('/mybikes');
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title="Anmod om overføring">
      <div className="flex flex-col space-y-4 p-4 bg-gray-800 rounded-md">

        <h2 className="text-xl text-white">Send anmodning til:</h2>

        <PhoneInputWithCountrySelect
          name='receiver'
          placeholder="Ex. +4512345678"
          value={value}
          onChange={setValue}
          defaultCountry="DK"
        />

        <button onClick={onSendTransferRequest} className="btn btn-info">
          Anmod
        </button>
      </div>
    </Layout>
  );
};

export default BikeTransfer;
