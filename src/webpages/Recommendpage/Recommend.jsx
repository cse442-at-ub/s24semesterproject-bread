import React, { useState } from 'react';
import Default from '../../images/defaultPic.png';
import './Recommend.css'
import NavBar from '../navBar/NavBar';

const RecommendedProfessorsPage = () => {
    const [selectedDepartment, setSelectedDepartment] = useState('');

    const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
    };

    const professorsData = [
        {
            name: "John Smith",
            department: "Computer Science",
            rating: 4.5,
            pfppath: "john_smith.jpg",
            fitrate:5,
        },
        {
            name: "Emily Johnson",
            department: "Mathematics",
            rating: 4.0,
            pfppath: "emily_johnson.jpg",
            fitrate:9,
        },
        {
            name: "Michael Williams",
            department: "Physics",
            rating: 3.8,
            pfppath: "michael_williams.jpg",
            fitrate:6.6,
        },
        {
            name: "Sarah Brown",
            department: "Chemistry",
            rating: 4.2,
            pfppath: "sarah_brown.jpg",
            fitrate:10,
        },
        {
            name: "David Davis",
            department: "Biology",
            rating: 3.9,
            pfppath: "david_davis.jpg",
            fitrate: 100,
        }
    ];

    const filteredProfessors = selectedDepartment
        ? professorsData.filter(professor => professor.department === selectedDepartment)
        : professorsData;

    return (
        <div>
            <NavBar/>
        <div className="recommended-professors-page-content">
            <h1 className="recommended-professors-page-title">Recommended Professors</h1>
            <div>
                <label htmlFor="departmentFilter">Filter by Department:</label>
                <select id="departmentFilter" value={selectedDepartment} onChange={handleDepartmentChange}>
                    <option value="">All Departments</option>
                    {[...new Set(professorsData.map(professor => professor.department))].map((department, index) => (
                        <option key={index} value={department}>{department}</option>
                    ))}
                </select>
            </div>
            <div className="recommended-professors-container">
                {filteredProfessors.map((professor, index) => (
                    <div key={index} className="recommended-professor-cards">
                        <div className="recommended-professor-infos-container">
                            <img src={professor.pfppath} alt="Professor" className="recommended-professor-img" onError={(e) => e.target.src = Default} />
                            <div className="recommended-professor-infos">
                                <h2 className="recommended-professor-name">{professor.name}</h2>
                                <p className="recommended-professor-department">{professor.department}</p>
                                <p className="recommended-professor-rating">Rating: {professor.rating+'/5' || '-/5'}</p>
                                <p className="recommended-professor-rating">Fitrate: {professor.fitrate +'%'|| '-%/100%'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </div>
    );
};

export default RecommendedProfessorsPage;
