import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

import PhoneInputWithCountrySelect from "react-phone-number-input";
import { LayoutWithBack } from "../components/Layout/LayoutWithBack";

const API_URL = import.meta.env.VITE_API_URL;

const BikeTransfer = () => {
  const token = secureLocalStorage.getItem("accesstoken");

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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiver_phone_number: phoneNumber,
          bike_id: id,
        }),
      });

      const body = await response.json();

      if (!response.ok) {
        setError(body.detail);
        return;
      }

      navigate("/mybikes");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LayoutWithBack title="Anmod om overføring">
      <div className="mx-auto flex max-w-[385px] flex-col space-y-4 rounded-md bg-gray-800 px-8 py-4">
        {/* Errors */}
        {error && (
          <div className="rounded-lg bg-error p-4 text-white">{error}</div>
        )}

        <p className="mr-1  text-white">
          Indtast telefonnummeret på den person du ønsker at overfører
          ejerskabet til
        </p>
        <p className="mr-1  text-white">
          Personen kan efterfølgende afkræfte/bekræfte din anmodning
        </p>
        <h2 className="text-xl text-white">Send anmodning til:</h2>

        <PhoneInputWithCountrySelect
          name="receiver"
          placeholder="Ex. +45 12 34 56 78"
          value={phoneNumber}
          onChange={setPhoneNumber}
          defaultCountry="DK"
        />

        <button
          onClick={onSendTransferRequest}
          className={`btn-info btn ${isLoading && "loading"}`}
        >
          {!isLoading && <>Send anmodning</>}
        </button>
      </div>
    </LayoutWithBack>
  );
};

export default BikeTransfer;
