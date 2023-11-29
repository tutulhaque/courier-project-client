import Chart from 'chart.js/auto';
import { useEffect, useState, useRef } from 'react';

const AdminStatistics = () => {
    const [bookingsData, setBookingsData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        fetch(`http://localhost:5000/parcels`)
            .then((response) => response.json())
            .then((data) => {
                setBookingsData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (bookingsData.length === 0) {
            return; // 
        }

        const sortedBookingsData = bookingsData
            .slice() // 
            .sort((a, b) => {
                const dateA = new Date(a.bookingDate);
                const dateB = new Date(b.bookingDate);
                return dateA - dateB;
            });

        const bookingsByDate = {};
        sortedBookingsData.forEach((booking) => {
            const date = booking.bookingDate;
            if (bookingsByDate[date]) {
                bookingsByDate[date]++;
            } else {
                bookingsByDate[date] = 1;
            }
        });

        const labels = Object.keys(bookingsByDate);
        const data = Object.values(bookingsByDate);

        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('bookingChart').getContext('2d');
        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Bookings by Date',
                        data: data,
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        precision: 0,
                    },
                },
            },
        });

        chartRef.current = newChart;
    }, [bookingsData]);

    return (
        <div>
            <h2>Statistics</h2>
            <div style={{ width: '600px', height: '400px' }}>
                <canvas id="bookingChart"></canvas>
            </div>
        </div>
    );
};

export default AdminStatistics;
