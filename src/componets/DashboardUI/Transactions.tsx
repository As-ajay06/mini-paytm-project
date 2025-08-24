import { useContext, useEffect, useState } from "react";
import { AuthorizedContext } from "../../Pages/Dashboard";
import axios from "axios";


export default function Transaction ({ toogelTransaction  , setToogleTransaction } : { toogelTransaction: boolean | any , setToogleTransaction: boolean | any}) {
    //@ts-ignore
    const { authorizationToken } = useContext(AuthorizedContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function transaction() {

            try {
                const transactionData = await axios.get("http://localhost:3000/api/v1/account/transaction", {
                    headers: {
                        "Authorization": `${authorizationToken}`
                    }
                }
                )

                if (transactionData) {
                    setData(transactionData.data.transactionData)

                    setLoading(false)
                    console.log(data)
                } else {
                    console.log("err something went wrong while fecthing data")
                }
            } catch (err) {
                console.log(" there is erroe while fectching data ", err)
            }
        }
        console.log(toogelTransaction)

        transaction();
    }, [toogelTransaction])



    return (
        <div className="bg-blue-600 px-6 py-3 shadow-lg rounded-lg text-white w-full absolute top-0 left-0 mt-20">
            <button
                className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md font-medium shadow-md transition-colors duration-200"
                onClick={() => setToogleTransaction((prev: { prev: boolean }) => !prev)}
            >
                Transaction
            </button>

            {toogelTransaction && (
                <div className="mt-4 bg-white rounded-lg shadow-md p-4 text-gray-800">
                    <span className="text-lg font-semibold border-b pb-2 block mb-3">
                        Transaction History
                    </span>

                    {loading ? (
                        <div className="text-center text-gray-500 py-4">Loading...</div>
                    ) : (
                        <div className="space-y-3">
                            {data.map((value: Record<string, string>) => (
                                <div
                                    key={value.sendersName}
                                    className="flex flex-col md:flex-row md:items-center justify-between bg-gray-50 border border-gray-200 rounded-md px-4 py-3 shadow-sm hover:bg-gray-100 transition"
                                >
                                    <div className="w-full md:w-1/3 font-medium">
                                        <span className="text-gray-600">Sent: </span>
                                        {value.sendersName}
                                    </div>
                                    <div className="w-full md:w-1/3 font-medium">
                                        <span className="text-gray-600">Received: </span>
                                        {value.receviersName}
                                    </div>
                                    <div className="w-full md:w-1/3 font-medium">
                                        <span className="text-gray-600">Amount: </span>
                                        {value.ammout}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>

    )
}