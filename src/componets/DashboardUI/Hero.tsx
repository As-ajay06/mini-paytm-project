import { useContext, useEffect, useMemo, useState } from "react";
import Container from "../Container";
import Navbar from "./Navbar";
import axios from "axios";
import { AuthorizedContext } from "../../Pages/Dashboard";
import { useNavigate } from "react-router";
import Transactions from "./Transactions";


type Form = {
    reciepient: string,
    ammount: string
}

export default function Hero() {

    const navigate = useNavigate()
    const [search, setSearch] = useState<string | null>();
    const [form, setForm] = useState<Form>({ reciepient: "", ammount: "" })
    const [currentBalace, setCurrentbalance] = useState('');
    const [users, setUsers] = useState<any[]>([])

    const [sending, setSending] = useState<boolean | any>(true)
    const [toogelTransaction, setToogleTransaction] = useState<boolean | null >(false);
    //@ts-ignore
    const { authorizationToken } = useContext(AuthorizedContext)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form)
        if (form.reciepient.length == 0 || Number(form.ammount) == 0) {
            console.log("unable to send the ammount")
            return 0;
        } else {
            setSending(false)
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                balance: Number(form.ammount),
                to: form.reciepient
            }, {
                headers: {
                    "Authorization": `${authorizationToken}`
                }
            }
            )

            console.log(res.data.message)
            if(res.data.message)
                setSending(true)
        }
    }

    // @ts-ignore
    function onchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setForm(values => ({ ...values, [name]: value }))
    }

    useMemo(() => {
        async function getUser() {
            const data = await axios.get(`http://localhost:3000/api/v1/user/search`, {
                params: {
                    user: search
                }
            })

            console.log(data.data.response)
            setUsers(data.data.response)
        }
        const resultDiv = document.getElementById("searchResult");
        if (resultDiv) {
            resultDiv.style.display = 'block'
        }
        getUser();
    }, [search])


    useEffect(() => {
        const getBalance = async () => {

            try {
                if (!authorizationToken) {
                    alert("please login first")
                    navigate("/")
                }
                const data = await axios.get("http://localhost:3000/api/v1/account/balance", {
                    headers: {
                        "Authorization": `${authorizationToken}`
                    }
                })

                if (data) {
                    setCurrentbalance(data.data.balance)
                } else {
                    console.log("Something went wrong while feching your data")
                }
            } catch (err) {
                console.log("erroe while fetching data", err)
            }
        }

        getBalance();

    }, [sending])

    const setRecepient = () => {
        const resultDiv = document.getElementById("searchResult");
        if (resultDiv) {
            const searchItem = document.getElementById("searchItem");
            if (searchItem) {
                const value = searchItem.innerHTML;
                setForm((values) => ({ ...values, ["reciepient"]: value }));
                console.log(form)
                console.log(value)
            }
            resultDiv.style.display = 'none'
        }
        console.log(" successgul")
    }


    return (
        <Container>

            <div id="main" className="w-full relative min-h-screen bg-gray-50">
                <Navbar />

                {/* Heading */}
                <div className="flex pl-4 mt-40">
                    <p className="text-4xl font-semibold bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md">
                        Send Money
                    </p>
                </div>

                <div className="mt-10 px-4">
                    {/* Search Section */}
                    <div className="relative">
                        <label className="text-xl font-bold text-gray-800">Search</label>
                        <input
                            id="search"
                            className="w-full border-2 border-gray-300 rounded-lg mt-4 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            // @ts-ignore
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Enter Recipient"
                        />
                        <div
                            id="searchResult"
                            className="absolute z-10 bg-white w-full mt-1 rounded-lg shadow-lg "
                        >
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className="hover:bg-gray-100 rounded-lg transition-colors duration-200"
                                >
                                    <div
                                        id="searchItem"
                                        className="text-sm font-medium text-gray-800 h-10 px-4 flex items-center rounded-lg cursor-pointer hover:bg-blue-50 active:bg-blue-100"
                                        onClick={setRecepient}
                                    >
                                        {user.username}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="mt-10 flex justify-center ">
                        <form
                            onSubmit={handleSubmit}
                            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-md border border-gray-200"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="reciepient"
                                        className="text-lg font-semibold text-gray-800 mb-1"
                                    >
                                        To
                                    </label>
                                    <input
                                        id="reciepient"
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="text"
                                        name="reciepient"
                                        placeholder="Enter Recipient"
                                        onChange={onchange}
                                        value={form.reciepient}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label
                                        htmlFor="ammount"
                                        className="text-lg font-semibold text-gray-800 mb-1"
                                    >
                                        Amount
                                    </label>
                                    <input
                                        id="ammount"
                                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                        type="number"
                                        name="ammount"
                                        placeholder="Enter Amount"
                                        onChange={onchange}
                                        value={form.ammount}
                                    />
                                </div>
                            </div>
                            <div className="relative mt-8">
                                <button
                                    type="submit"
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg px-6 py-2 transition-colors duration-200"
                                >
                                    {sending ? "send" : "Loading..."}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Balance + Transactions */}
                    <div className="mt-10 w-full bg-gray-100 rounded-lg shadow-inner p-4">
                        <span className="inline-block bg-blue-500 text-white font-medium rounded-lg px-6 py-2 mb-4">
                            Available Balance: {currentBalace}
                        </span>
                        <Transactions
                            toogelTransaction={toogelTransaction}
                            setToogleTransaction={setToogleTransaction}
                        />
                    </div>
                </div>
            </div>

        </Container>
    )
}