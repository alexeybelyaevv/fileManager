import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Folder } from './Folder'

const Table = () => {

    const [data, setData] = useState<any>()
    const [isLoading, setLoading] = useState<boolean>(false)
    const [folders, setFolders] = useState<Array<string>>([])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true)
            await axios.get("https://prof.world/api/test_json_files/?token=6a06cc0050374e32be51125978904bd8").then((response) => {
                setData(Object.values(response.data.data.files))
                setFolders(Object.keys(response.data.data.files))
                return setLoading(false)
            })
        }
        fetchData()
    }, [])

    if (isLoading) return <>Loading</>

    return (
        <div>
            {folders.map((item: string, key: number) => {
                return (
                    <div key={key}>
                        <Folder name={item} files={data[key]} />
                    </div>
                )
            })}
        </div>
    )
}

export { Table }
