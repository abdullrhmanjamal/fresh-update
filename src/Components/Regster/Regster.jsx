import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import * as Yup from 'yup'



export default function Regster() {

    let [isLoading, setIsLoading]= useState(false)
    let [errorMessage, setErrorMessage] = useState('')
    let navigate= useNavigate()
     async function register(values){
        console.log(values);
        setIsLoading(true)
        setErrorMessage('') // دي عشان لما يجي يعمل ريجستر تاني تختفي وتظهر لو هو مسجل بنفس الحاجة
        let {data}=  await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values).catch((err)=>{
        // console.log()
        setErrorMessage(err.response.data.message)
        setIsLoading(false)

        })
        console.log(data)
        setIsLoading(false)
        navigate('/login')

        }

        // function valdate(values){
        // let errors={};

        // if(values.name ==''){
        //    errors.name='Name is Requied';
        // }else if(values.name.lenght < 3){
        //     errors.name= ' Min Lenght grater than 3';
        // }else if(values.name.lenght>20){
        //     errors.name='Max lenght is 20';
        // }


        // if(values.email ==''){
        //    errors.email='Email is Requied';
        // }else if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        //     errors.email= 'Invalid email address';
        // }

        // if(values.password ==''){
        //     errors.password='password is Requied';
        //  }else if(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(values.password)){
        //      errors.password= ' Minimum eight characters, at least one letter, one number and one special character';
        //  }


        // if(values.rePassword ==''){
        //     errors.rePassword='rePassword is Requied';
        //  }else if(values.password != values.rePassword){
        //      errors.rePassword= 'rePassword dosnt Match';
        //  }
         
        // if(values.phone ==''){
        //     errors.phone='phone is Requied';
        //  }else if(/^01[0125][0-9]{8}$/i.test(values.phone)){
        //      errors.phone= 'Enter Egyption Number';
        //  }



        // return errors
        // }

        let validationSchema = Yup.object({
            name:Yup.string().min(3, 'Min Lenght grater than 3').max(20, 'Max Lenght less than 20').required('Name is Requied'),
            email:Yup.string().required('Email is Requied').matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, 'Enter Vaild Email'),
            password:Yup.string().required('Password is Requied').matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i, 'Minimum eight characters, at least one letter, one number and one special character'),
            rePassword:Yup.string().required('rePassword is Requied').oneOf([Yup.ref('password')], 'Dosent Match'),
            phone:Yup.string().required('phone is Requied').matches(/^01[0125][0-9]{8}$/, 'Enter Vaild Egyption Number')

        })

    let formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            password:'',
            rePassword:'',
            phone:''
        },
        validationSchema,
        // valdate,
        onSubmit: register,
        
    })
    // console.log(formik)
  return (
    <>
    <div className='continer w-50 m-auto'>
        <h3>Register Now :</h3>
        <form onSubmit={formik.handleSubmit} className=''>
            <label htmlFor='name'>Name :</label>
            <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="text" id='name' name='name' />
            {formik.errors.name && formik.touched.name? <div className='alert alert-danger'>
                <p className='text-dark'>{formik.errors.name}</p>
            </div>: null }
            

            <label htmlFor="email">Email :</label>
            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="email" id='email' name='email' />
            {formik.errors.email && formik.touched.email? <div className='alert alert-danger'>
                <p className='text-dark'>{formik.errors.email}</p>
            </div>: null }

            <label htmlFor="password">Password :</label>
            <input value={formik.values.password}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="password" id='password' name='password' />
            {formik.errors.password && formik.touched.password? <div className='alert alert-danger'>
                <p className='text-dark '>{formik.errors.password}</p>
            </div>: null }

            <label htmlFor="rePassword">Re-Password :</label>
            <input value={formik.values.rePassword}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="password" id='rePassword' name='rePassword' />
            {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger'>
                <p className='text-dark '>{formik.errors.rePassword}</p>
            </div>: null }


            <label htmlFor="phone">Phone :</label>
            <input value={formik.values.phone}  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control w-80 mt-2 mb-2' type="tel" id='phone' name='phone' />
            {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger'>
                <p className='text-dark '>{formik.errors.phone}</p>
            </div>: null }

            {errorMessage?<div className='alert alert-danger'><p>{errorMessage}</p></div>:null }
            {isLoading?
            <button disabled  type='btn' className='btn bg-main d-block ms-auto text-white mt-2'><i class="fa-solid fa-spinner fa-spin-pulse"></i></button>
            :
            <button disabled={isLoading} type='submit' className='btn bg-main d-block ms-auto text-white mt-2'>Register</button>
        }
            
        </form>
    </div>
    </>
)
}
