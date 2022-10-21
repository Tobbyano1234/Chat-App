import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { mainAxios } from "./Axios";
import Table from './PostsStore'
import './Admin.css'

const AdminDashboard = () => {

    return <Table />
}

export default AdminDashboard