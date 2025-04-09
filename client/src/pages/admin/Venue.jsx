import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

export default function Venue() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user? user.name : "",
    Venuename: "",
    location:"",
    capacity:"",
    numberrooms:"",
    images: [],
    description:"",
    cost:""
   
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
    
    setFormData((prevState) => ({ ...prevState, image: file }));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    console.log(formData);
    
    e.preventDefault();
    axios
      .post("/AddVenue", formData,{headers: {
        
        'Content-Type': 'multipart/form-data',
    }})
      .then((response) => {
        console.log("Venue Added successfully:", response.data);
        
      })
      .catch((error) => {
        console.error("Error Adding venue:", error);
      });
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Add Venue</h1></div>
      
      <form onSubmit={handleSubmit} className='flex flex-co'>
      <div className='flex flex-col gap-5'>
        <label className='flex flex-col'>
          Venue Name:
          <input
            type="text"
            name="venuename"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventType}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Location:
          <input
            type="text"
            name="location"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.decorationtheme}
            onChange={handleChange}
          />
        </label >
        <label className='flex flex-col'>
          Capacity:
           <input
            type="number"
            name="capacity"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
            value={formData.stage}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Available Rooms:
          <input
            type="number"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="numberrooms"
            value={formData.fullstage}
            onChange={handleChange}
          />
        </label>
    
        <label className='flex flex-col'>
          Image:
          <input
            type="file"
            name="image"
            
            className=' rounded mt-2 pl-5 px-4 py-10 ring-sky-700 ring-2 h-8 border-none'
            onChange={handleImageUpload}
          />
        </label >
        <label className='flex flex-col'>
          Description:
          <input
            type="text"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="discription"
            value={formData.fullstage}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Cost:
          <input
            type="number"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="cost"
            value={formData.fullstage}
            onChange={handleChange}
          />
        </label>
        <button className='primary' type="submit">Submit</button>
        </div>
        
      </form>
    </div>
  );
}
