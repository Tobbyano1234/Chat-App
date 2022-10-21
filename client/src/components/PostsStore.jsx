import { mainAxios } from "./Axios"
import React from "react"
import { useEffect, useState } from "react"
import './PostStore.css'
import moment from 'moment'
import DataTable from 'react-data-table-component'


const Table = () => {

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await mainAxios.post(`notes/delete`, {
                id: e.target.getAttribute("data-id")
            });

            if (res.data.deleted > 0) {
                fetchPosts()
                setPosts([...posts])
            }

        } catch (err) {
            console.error(err);
        }
    };

    const columns = [
        {
            name: 'Author',
            selector: row => row.author_name,
        },
        {
            name: 'Title',
            selector: row => row.content,
        },

        {
            name: 'Content',
            selector: row => row.content,
        },
        {
            name: 'Date',
            selector: row => moment(row.createdAt).calendar(),
        },
        {
            name: 'Action',
            Button: true,
            selector: row => row.id,
            cell: (row) => (
                <button onClick={handleDelete} data-id={row.id} class="btn btn-danger">Delete</button>
            )
        },
    ];



    const [posts, setPosts] = useState([])

    const fetchPosts = async () => {
        const res = await mainAxios.post("http://www.localhost:3000/notes/reported")

        if (res) {
            localStorage.setItem("noteId", res.data.notes.id);
            const posts = res.data.notes

            const notes = res.data.notes;
            const ids = notes.forEach(note => {
                return note.id
            })
            setPosts(posts)
        }
    }



    useEffect(() => {
        fetchPosts()
    }, [])


    const conditionalRowStyles = [
        {
            when: row => row.flagged === "flagged",
            style: {
                backgroundColor: '#841818',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.flagged === "reported",
            style: {
                backgroundColor: '99999',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        }
    ];
    return (

        <DataTable
            columns={columns}
            data={posts}
            conditionalRowStyles={conditionalRowStyles}
        />

    );
};

export default Table