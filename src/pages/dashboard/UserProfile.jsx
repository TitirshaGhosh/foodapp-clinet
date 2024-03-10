import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthProvider'
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import { useForm } from "react-hook-form";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const UserProfile = () => {
    const {updateUserProfile} = useContext(AuthContext);
    const { user } = useAuth();
  
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      // const onSubmit = (data) => {
      //   const name = data.name;
      //   const photoURL = data.photoURL;

      //   updateUserProfile(name, photoURL).then(() => {
      //       // Profile updated!
      //       const UserItem = {
      //               name ,
      //         photoURL 
      //       }; 
      //       const postUserItem = axiosSecure.patch(`/User/${user.uid}`, UserItem);
            
      //       alert("Profile updated successfully")
      //     }).catch((error) => {
      //       // An error occurred
      //       // ...
      //     });
      // }
      const onSubmit = async (data) => {
        const name = data.name;
        // let photoURL = data.photoURL;
        let photoURL = "";
        // Check if photoURL is a File object
        
    
        updateUserProfile(name, photoURL)
            .then(() => {
                // Profile updated!
                const UserItem = {
                    name:data.name,
                    photoURL
                }; 
                   console.log(user);
                const postUserItem = axiosSecure.patch(`/user/${user._id}`, UserItem);
             
                // const postUserItem = axiosSecure.patch(`/user/${user._id}`, UserItem);
                alert("Profile updated successfully");
            })
            .catch((error) => {
                console.error("Error updating profile:", error);
                // Handle error
            });
    };
    
    
     
    
 
  return (

    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        {/* <Link to={`/update-profile/${user.uid}`}> */}
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" {...register("name")} placeholder="Your name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Upload Photo</span>
          </label>
          <input type="file" {...register("photoURL")}  className="file-input w-full mt-1" />
          {/* <input type="text" {...register("photoURL")} placeholder="photo url" className="input input-bordered" required /> */}
        </div>
        <div className="form-control mt-6">
          <input type='submit' value={"Update"} className="btn bg-green text-white"/>
        </div>
      </form>
      {/* </Link> */}
    </div>
    </div>
  )
}

export default UserProfile