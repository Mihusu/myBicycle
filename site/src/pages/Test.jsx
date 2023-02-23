import {useState} from "react"

const Login = () => {

    const [model, setModel] = useState("Model")
    console.log(model);

    return (
        <div>
            <p>This is a test page</p>
            <div className="flex relative">
                <span className="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b  border-neutral text-content shadow-sm text-sm">
                    http://
                </span>
                <input type="text" id="with-email" className=" rounded-r-lg appearance-none border border-gray-300 w-auto py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="url" placeholder="www.google.com"/>
            </div>

            <div className="btn-group divide-x-8">
                <input onClick={
                        () => {
                            setModel("Herre")
                        }
                    }
                    type="radio"
                    name="options"
                    data-title="Herre"
                    className="btn "/>
                <input onClick={
                        () => {
                            setModel("Dame")
                        }
                    }
                    type="radio"
                    name="options"
                    data-title="Dame"
                    className="btn"/>
                <input onClick={
                        () => {
                            setModel("Unisex")
                        }
                    }
                    type="radio"
                    name="options"
                    data-title="Uni-Sex"
                    data-color="red-500"
                    className="btn"/>
                <div className="flex w-full justify-self-end place-self-end self-end">
                    <button className="btn justify-self-end place-self-end self-end w-auto">
                        {model}</button>

                </div>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer flex justify-between border rounded-full">
                    <span className="flex label-text">Red pill</span>
                    <input type="radio" name="radio-10" className="radio flex checked:bg-red-500" checked/>
                </label>
            </div>
            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Blue pill</span>
                    <input type="radio" name="radio-10" className="radio checked:bg-blue-500" checked/>
                </label>
            </div>


        </div>
    )
}

export default Login
