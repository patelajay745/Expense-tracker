import { authFetch } from "@/utils/authFetch";
import { useAuth } from "@clerk/clerk-expo";
import { useCallback, useState } from "react"
import { Alert } from "react-native";

const api_Url = process.env.EXPO_PUBLIC_BACKEND_URL;

console.log("api_Url", api_Url)

export const useTransaction = (userId: string) => {
    const { getToken } = useAuth();

    const [transaction, setTransaction] = useState([])
    const [summary, setSummary] = useState({
        balance: 0,
        income: 0,
        expense: 0
    })

    const [isLoading, setIsLoading] = useState(true)

    const fetchTransactions = useCallback(async () => {
        try {
            const token = await getToken();

            const res = await authFetch(`${api_Url}/transaction/${userId}`, token!);

            const data = await res.json()

            console.log(data)
            setTransaction(data.data)
        } catch (error) {
            console.log(error)
        }
    }, [userId])

    const fetchSummary = useCallback(async () => {
        try {
            const token = await getToken();
            const res = await authFetch(`${api_Url}/transaction/summary/${userId}`, token!)
            const data = await res.json()
            console.log("Sumary data:", data.data)
            setSummary(data.data)
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
            const token = await getToken();
            const res = await authFetch(`${api_Url}/transaction/${id}`, token!)
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