import axios from 'axios';
import { useState, useEffect } from 'react';

function ManageCourse() {
  
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [id, setId] = useState('');
  const [token, setToken] = useState('');
  const [updateCourses, setUpdateCourses] = useState('');
  const [page, setPage] = useState(1);  // Current page
  const [totalPages, setTotalPages] = useState(1);  // Total number of pages

// Read Courses
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }

    const GetAllCourses = async (currentPage) => {
      try {
        const response = await axios.get(`https://manage-courses-project-cs50.onrender.com/api/courses/?page=${currentPage}&limit=4`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        
        if (response.data && response.data.data) {
          setCourses(response.data.data.courses);
          setTotalPages(response.data.data.totalPages); // Assuming the API sends total pages
        } else {
          console.error("Courses data is missing in the response.");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    if (token) {
      GetAllCourses(page);  // Fetch courses based on current page
    }
  }, [token, page,updateCourses]);

  // Handlers for pagination buttons
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

// Create Course
  const CreateCourse = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://manage-courses-project-cs50.onrender.com/api/courses/", 
        { title, price }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.data && response.data.data) {
        setUpdateCourses('CreateCourse');
      }
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

// Update Title
  const UpdateTitle = async () => {
    try {
      const response = await axios.patch(`https://manage-courses-project-cs50.onrender.com/api/courses/${id}`, 
        { title }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.data) {
        setUpdateCourses('UpdateTitle');
      }
    } catch (error) {
      console.error("Error updating title:", error);
    }
  };

// Update Price
  const UpdatePrice = async () => {
    try {
      const response = await axios.patch(`https://manage-courses-project-cs50.onrender.com/api/courses/${id}`, 
        { price }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data && response.data.data) {
        setUpdateCourses('UpdatePrice');
      }
    } catch (error) {
      console.error("Error updating price:", error);
    }
  };

 // Delete Course
  const DeleteCourse = async () => {
    try {
      const response = await axios.delete(`https://manage-courses-project-cs50.onrender.com/api/courses/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data && response.data.data) {
        setUpdateCourses('DeleteCourse');
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="app-container">
      <div className="Manage-Course">
          <h1>Manage Course</h1>
          
          {/* Add the form here */}
          <form onSubmit={CreateCourse} className="course-form">
            <div className="input-field">
              <label>Title</label>
              <input type='text' placeholder='Set Title'  onChange={(event) => setTitle(event.target.value)}/>
            </div>
            
            <div className="input-field">
              <label>Price</label>
              <input type='number' placeholder='Set Price' onChange={(event) => setPrice(event.target.value)}/>
            </div>
            
            <button type='submit' className="btn-submit">Add Course</button>
          </form>

          <div className="input-field">
            <label>Course ID</label>
            <input type='text' placeholder='Set Course Id' onChange={(event) => setId(event.target.value)} />
          </div>
          <button onClick={() => UpdateTitle()} className="btn-update">Update Title</button>
          <button onClick={() => UpdatePrice()} className="btn-update">Update Price</button>
          <button onClick={() => DeleteCourse()} className="btn-delete">Delete Course</button>
      </div>
      <div className="View-All-Courses">
          <h1>View All Courses</h1>
          <div className="course-list">
            {courses.map(course => (
                <ul key={course._id} className="course-item">
                  <li><span>ID:</span> {course._id}</li>
                  <li><span>Title:</span> {course.title}</li>
                  <li><span>Price:</span> {course.price}</li>
                </ul>
              ))}
          </div>
          <div className="pagination-buttons">
            <button onClick={handlePreviousPage} disabled={page === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>
          </div>
      </div>
    </div>
  );
}

export default ManageCourse;
