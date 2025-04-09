import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';

export default function EventType() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user? user.name : "",
    eventType: "",
    decorationtheme:"",
    stage:"",
    fullhall:"",
    images: [],
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
      .post("/admin/EventType", formData,{headers: {
        
        'Content-Type': 'multipart/form-data',
    }})
      .then((response) => {
        console.log("Event Added successfully:", response.data);
        
      })
      .catch((error) => {
        console.error("Error Adding event:", error);
      });
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Add Event</h1></div>
      
      <form onSubmit={handleSubmit} className='flex flex-co'>
      <div className='flex flex-col gap-5'>
        <label className='flex flex-col'>
          Event Type:
          <input
            type="text"
            name="eventType"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.eventType}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Theme Name:
          <input
            type="text"
            name="decorationtheme"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.decorationtheme}
            onChange={handleChange}
          />
        </label >
        <label className='flex flex-col'>
          Stage cost:
           <input
            type="number"
            name="stage"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
            value={formData.stage}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Full Hall Cost:
          <input
            type="number"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            name="fullstage"
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
        <button className='primary' type="submit">Submit</button>
        </div>
        
      </form>
    </div>
  );
}
