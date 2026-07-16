"use client";

import { useState, useEffect } from "react";

const Dashboard = () => {

    const [user, setUser] = useState([]);

    useEffect(() => {
        // Fetch user data from an API or local storage
        const fetchUserData = async () => {
            try {
                const response = await fetch('/api/users');
                const data = await response.json();
                console.log('User data:', data);
                setUser(data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <h2>Dashboard</h2>
        </>
    );
}

export default Dashboard;