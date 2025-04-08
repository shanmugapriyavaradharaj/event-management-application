import  { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../../UserContext';
import { image } from 'qr-image';

export default function Tansportation() {
  const {user} = useContext(UserContext);
  const [formData, setFormData] = useState({
    owner: user? user.name : "",
    transporttype: "",
    distance:"",
    category:"",
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
      .post("/AddTransport", formData,{headers: {
        
        'Content-Type': 'multipart/form-data',
    }})
      .then((response) => {
        console.log("Transportation Added successfully:", response.data);
        
      })
      .catch((error) => {
        console.error("Error Adding Transport:", error);
      });
  };

  return (
    <div className='flex flex-col ml-20 mt-10'>
      <div><h1 className='font-bold text-[36px] mb-5'>Post an Event</h1></div>
      
      <form onSubmit={handleSubmit} className='flex flex-co'>
      <div className='flex flex-col gap-5'>
        <label className='flex flex-col'>
          Transport Type:
          <input
            type="text"
            name="transporttype"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.transporttype}
            onChange={handleChange}
          />
        </label>
        <label className='flex flex-col'>
          Distance:
          <input
            type="text"
            name="distance"
            className=' rounded mt-2 pl-5 px-4 ring-sky-700 ring-2 h-8 border-none'
            value={formData.distance}
            onChange={handleChange}
          />
        </label >
        <label className='flex flex-col'>
          Category:
           <input
            type="text"
            name="category"
            className=' rounded mt-2 pl-5 px-4 py-2 ring-sky-700 ring-2 h-8 border-none'
            value={formData.category}
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
