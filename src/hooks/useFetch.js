import { useState, useEffect } from "react";

//custom hooks
export const useFetch = (url) => {
    const [data, setData] = useState(null)

    // refatorando post
    const [config, setConfig] = useState(null)
    const [method, setMethod] = useState(null)
    const [callFetch, setCallFetch] = useState(false)

    // loading
    const [loading, setLoading] = useState(false)

    // tratando erros
    const [error, setError] = useState(null)
  

    //deletando

    const [itemId, setItemId] = useState(null)

    const httpConfig = (data, method) => {
        if (method === 'POST') {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)

            })
            setMethod(method)
        } else if (method === 'DELETE') {
            setConfig({
                method,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            setMethod(method)
            setItemId(data)
        }
    }

    //GET
    useEffect(() => {
        const fetchData = async () => {

            //loading
            setLoading(true)

            // tratanto erro

            try {
                const res = await fetch(url)
                const json = await res.json()
                setData(json)
            } catch (error) {
                console.log(error.message)
                setError('Houve um erro ao carregar a página...')
            }

            setLoading(false)

        }
        fetchData()

    }, [url, callFetch])

    // refatorando post

    useEffect(() => {

        const httpRequest = async () => {
            let json 
            if (method === 'POST') {
                let fetchOptions = [url, config]
                const res = await fetch(...fetchOptions)
                const json = await res.json()
                setCallFetch(json)
            }else if (method === 'DELETE'){
                const deleteUrl = `${url}/${itemId}`
                const res = await fetch(deleteUrl, config)

                json = await res.json()            
            }
            setCallFetch(json)
        }
        httpRequest()
    }, [config, method, url])


    return { data, httpConfig, loading, error }
}