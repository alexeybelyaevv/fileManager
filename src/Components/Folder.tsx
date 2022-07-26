import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';

const Folder = ({ name, files }: { name: string, files: Array<any> }) => {
    const [show, setShow] = useState<boolean>(false)
    const [sortType, setSortType] = useState<string>(localStorage.getItem("filterType") ?? "name")
    let filtered = [...files]


    if (sortType) {
        filtered = files.sort((a, b) => {
            if (sortType === "name") {
                return a.name.localeCompare(b.name)
            }
            if (a[sortType] < b[sortType]) {
                return -1;
            }
            if (a[sortType] > b[sortType]) {
                return 1;
            }
            return 0;
        });
    }


    return (
        <>
            <div onClick={() => setShow(true)} className="folder">{name}</div>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Body>
                    Сортировка по: <select
                        name="sort"
                        value={sortType}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            setSortType(e.currentTarget.value)
                            localStorage.setItem("filterType", e.currentTarget.value)
                        }}>
                        <option value="name">Названию</option>
                        <option value="atime">Дате создания</option>
                        <option value="mtime">Дате изменения</option>
                        <option value="size">Размеру</option>
                    </select>
                    <Table striped bordered hover className="table">
                        <thead>
                            <tr>
                                <th>Название</th>
                                <th>Дата изменения</th>
                                <th>Дата создания</th>
                                <th>Размер</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map((item: any, key: number) => {
                                return (
                                    <tr key={key}>
                                        <td>{item.name}</td>
                                        <td>{moment.unix(item.mtime).format("DD/MM/YYYY HH:mm")}</td>
                                        <td>{moment.unix(item.atime).format("DD/MM/YYYY HH:mm")}</td>
                                        <td>{item.size}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>

                </Modal.Body>
            </Modal>
        </>
    )
}

export { Folder }
