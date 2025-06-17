import { useAuth } from "@clerk/clerk-expo";
import { useCallback, useState } from "react"
import { Alert } from "react-native";

const api_Url = process.env.EXPO_BACKEND_URL;

export const useTransaction = (userId: string) => {
    const { getToken } = useAuth();

    const [transaction, setTransaction] = useState([])
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expenses: 0
    })

    const [isLoading, setIsLoading] = useState(true)

    const fetchTransactions = useCallback(async () => {
        try {
            const token = await getToken();

            console.log(token)

            const res = await fetch(`${api_Url}/transaction/${userId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            const data = await res.json()
            console.log(data)
            setTransaction(data)
        } catch (error) {
            console.log(error)
        }
    }, [userId])

    const fetchSummary = useCallback(async () => {
        try {
            const res = await fetch(`${api_Url}/transaction/summary/${userId}`)
            const data = await res.json()
            console.log(data)
            setSummary(data)
        } catch (error) {
            console.log(error)
        }
    }, [userId])

    const loadData = useCallback(async () => {
        if (!userId) return
        setIsLoading(true)
        try {
            await Promise.all([fetchTransactions(), fetchSummary()])
        } catch (error) {
            console.log("Error loading data:", error);
        } finally {
            setIsLoading(false)
        }
    }, [fetchSummary, fetchTransactions, userId])

    const deleteTransactions = async (id: string) => {
        try {
            const res = await fetch(`${api_Url}/transaction/${id}`)
            if (!res.ok) throw new Error("failed to delete transaction")
            loadData()
            Alert.alert("Success", "transaction deleted successfully")
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert("Error", error.message)
            }
        }

    }

    return { transaction, summary, isLoading, loadData, deleteTransactions }
}