import React, {useState} from 'react'

const ChoosePassword = () => {

    const [password, setPassword] = useState("")
    const [verify, setVerify] = useState("")

    // checks whether password matches verification
    function matchPassword(password, verify) {

        if (password.length == 0 || verify.length == 0) {
            return false
        }

        if (password == verify) {
            return true
        } else 
            return false
            
    }

    return (
        <div className="flex flex-col items-center py-2 h-full ">
            <h1>Vælg adgangskode</h1>
            {/* password */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Vælg kode</span>
                </label>
                <input type="text" pattern='\d*'
                    onChange={
                        (e) => setPassword(e.target.value)
                    }
                    required
                    maxLength={32}
                    placeholder="max 32 tegn"
                    className="input input-bordered w-full max-w-xs"/>

            </div>
            {/* verify */}
            <div className="form-control w-full max-w-xs">
                <label className="label">
                    <span className="label-text">Indtast kode igen</span>
                </label>
                <input type="text"
                    onChange={
                        (e) => setVerify(e.target.value)
                    }
                    required
                    maxLength={32}
                    placeholder="max 32 tegn"
                    className="input input-bordered w-full max-w-xs"/>

            </div>
            {/* submit */}
            <button type="submit"
                disabled={
                    ! matchPassword(password, verify)
                }
                className={`btn text-green-300 my-2 w-full max-w-xs bg-green-500`}>
                Next
            </button>
        </div>
    )
}

export default ChoosePassword